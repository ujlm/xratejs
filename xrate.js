
/*
V1 of the currentWalletWidget: only limited list of exchange rates available
*/
function getExchangeRate (to, callback){
    var requestURL = `https://api.exchangerate.host/latest?base=${to}`; // Or should we use https://min-api.cryptocompare.com/data/price?fsym=EUR&tsyms=GBP https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var response = request.response;
        callback(response);
    }
}

function totalTo(valArr, xrate){
    var total = 0;
    valArr.forEach((item) => {
        var from = Object.keys(item)[0];
        var rate = xrate.rates[from];
        if(rate != 0){
            total += item[from]/rate; // TO: USD <--> FROM: BTC = 0.000018, so 4 BTC = (4 BTC / 0.000018)USD
        }
    });
    return total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function setExchangeRate(xrate){
    var io = document.getElementsByClassName("xratejs");
    for(var i = 0; i < io.length; i++) {
        (function(index) {
        valArr = JSON.parse(io[i].getAttribute('from'));
        to = io[i].getAttribute('to');
        io[i].innerHTML = totalTo(valArr, xrate);
        })(i);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    getExchangeRate('EUR', (xrate) => {
        setExchangeRate(xrate);
    });
});