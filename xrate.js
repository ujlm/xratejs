
/*
V1.1 of xratejs
*/
function getExchangeRate (requestURL, callback){
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var response = request.response;
        callback(response);
    }
}

function totalTo(to, valArr, xrate){
    var total = 0;
    valArr.forEach((item) => {
        var from = Object.keys(item)[0];
        var rate = xrate[from];
        if(rate != 0){
            total += item[from]/rate; // TO: USD <--> FROM: BTC = 0.000018, so 4 BTC = (4 BTC / 0.000018)USD
        }
    });
    total = total*xrate[to]; // Eg base is EUR (baseTo) but we want to convert to USD (to)
    return total.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function setExchangeRate(xrate){
    // This part can probably be optimized
    var io = document.getElementsByClassName("xratejs");
    for(var i = 0; i < io.length; i++) {
        (function(index) {
        valArr = JSON.parse(io[i].getAttribute('from'));
        to = io[i].getAttribute('to');
        io[i].innerHTML = totalTo(to, valArr, xrate);
        })(i);
    }
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  

function constructUrl(){
    var to = [];
    var from = [];
    var io = document.getElementsByClassName("xratejs");
    for(var i = 0; i < io.length; i++) {
        (function(index) {
        valArr = JSON.parse(io[i].getAttribute('from'));
        valArr.forEach((item) => {
            from.push(Object.keys(item)[0]);
        });
        // Add to to from as well
        if(!from.includes(io[i].getAttribute('to'))){
            from.push(io[i].getAttribute('to'));
        }
        if(!to.includes(io[i].getAttribute('to'))){
            if(to.length < 1){
                to.push(io[i].getAttribute('to'));
            }
        }
        })(i);
    }
    var url = `https://min-api.cryptocompare.com/data/price?fsym=${to[0]}&tsyms=${from.toString()}`;
    return url;
}

document.addEventListener("DOMContentLoaded", function() {
    getExchangeRate(constructUrl(), (xrate) => {
        setExchangeRate(xrate);
    });
});