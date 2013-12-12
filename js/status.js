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
    httpRequest('https://www.okcoin.com/api/ticker.do?symbol=ltc_cny', function(result, status){
        if (status) {
            result = JSON.parse(result);
            chrome.browserAction.setBadgeText({text: result.ticker.last});
            chrome.browserAction.setTitle({title: result.ticker.last});
        }
        setTimeout(checkStatus, 2000);
    });
}

checkStatus();