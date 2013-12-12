function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText, true);
        }
    }
    xhr.onerror = function(){
        callback("", false);
    }
    xhr.send();
}

function checkStatus(){
    httpRequest('https://www.okcoin.com/api/depth.do?symbol=ltc_cny', function(result, status){
        result = JSON.parse(result);

        var asks = result.asks;
        var bids = result.bids;
        var table = '<table>';

        table += '<tr><th height="30">委卖</th></tr>';
        var al = asks.length;
        for(i = al - 10; i < al; i++){
            table += '<tr><td>' + asks[i][0] + ' ---- ' + asks[i][1] + '</td></tr>';
        }

        table += '<tr><th height="30">委买</th></tr>';
        var bl = bids.length;
        for(i = 0; i < bl; i++){
            table += '<tr><td>' + bids[i][0] + ' ---- ' + bids[i][1] + '</td></tr>';
            if (i == 9) break;
        }
        table += '</table>';
        
        document.getElementById('depth').innerHTML = table;
        setTimeout(checkStatus, 2000);
    });
}

checkStatus();