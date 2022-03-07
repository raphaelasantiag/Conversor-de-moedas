const de = document.getElementById('de')
const para = document.getElementById('para');
const moedainput = document.getElementById('moedainput');
const res = document.getElementById('res');

let Moeda1;
let Moeda2;

function getMoeda() {


    let selec = document.getElementById('selec');
    if (Moeda1 == 'select' || Moeda2 == 'select') {
        selec.innerHTML = `Você precisa selecionar as moedas`
        selec.style.visibility = 'Visible';
        hideselec();
        return
    }

    if (Moeda1 == Moeda2) {
        selec.innerHTML = `Você selecionou duas moedas iguais`
        selec.style.visibility = 'Visible';
        hideselec();
        return
    }

    function hideselec() {
        setTimeout(function () {
            //tira a menssagem depois de 2 segundos
            selec.style.visibility = "hidden";
        }, 2000);
    }
var cotacaourl = 'https://economia.awesomeapi.com.br/json/last/'
    //USD-BRL,EUR-BRL,BTC-BRL
    var request = new XMLHttpRequest();
    request.open("GET", `${cotacaourl}${Moeda1}-${Moeda2}`);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        var result = request.response;
        Converter(result)
    }

}

function Converter(result) {

    let valorDaMoeda = Number(result[`${Moeda1}${Moeda2}`]?.ask);

    let multi = parseFloat(moedainput.value) * valorDaMoeda;

    let convert = new Intl.NumberFormat('pt-BR',{
        style:'currency',
        currency: Moeda2
    });
res.innerHTML = `
    <div>
    ${convert.format(multi)}
    </div>`

    res.style.visibility = 'Visible'

}

function changeMoeda() {
    Moeda1 = de.value;
    Moeda2 = para.value;
}
changeMoeda();