/*function debounce(fn, delay) {
    let timer = null;
    return function () {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  };

document.addEventListener('selectionchange', () => {

    function getSelectedText() {
        let selection = document.getSelection ? document.getSelection().toString() :  document.selection.createRange().toString() ;
        console.log(selection);
    }

    function displaySelectedText() {
        debounce(getSelectedText)
    }
    
    chrome.tabs.executeScript({
        code: '(' + displaySelectedText + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
        console.log('Popup script:')
        console.log(results[0]);
    });
}, 250);
*/



function appendSelection(text) {
    console.log("this works");

    
    chrome.storage.sync.get('selectedText', function(data) {
        console.log('SelectedText: ' + data);
        var updated = data.selectedText;
        updated.push(text);
        chrome.storage.sync.set({'selectedText': updated}, function() {
            console.log('updated: ');
        })
    });

    var selectedTextList = document.getElementById('user-selections');
    var listItem = document.createElement('div');
    listItem.classList.add('list-item');
    var listP = document.createElement('p');
    var listText = document.createTextNode(text);
    listP.appendChild(listText);
    listItem.appendChild(listP);
    selectedTextList.appendChild(listItem);
}

chrome.storage.sync.get('selectedText', function(data) {
    for(var i = 0; i < data.length; i++) {
        appendSelection(data[i]);
    }
});





document.getElementById('select-button').addEventListener('click', () => {

    function displaySelectedText() {
        let selection = document.getSelection ? document.getSelection().toString() :  document.selection.createRange().toString() ;
        //console.log(selection);
        return selection;
    }

    chrome.tabs.executeScript({
        code: '(' + displaySelectedText + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        //Here we have just the innerHTML and not DOM structure
        appendSelection(results[0]);
    });
});

document.getElementById('makePPT').addEventListener('click', () => {

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var url = tabs[0].url;
        alert(url);

        var http = new XMLHttpRequest();
        var server = 'http://localhost:8000/intellihistory/ppt';
        var data = new FormData();
        data.append('url', url);
        http.open('POST', server, true);
        //http.setRequestHeader('Content-type', 'multipart/form-data');
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                console.log('ready state change');
            }
        }

        http.send(data);
        alert(url);

    });

    console.log('something');
});

document.getElementById('makePDF').addEventListener('click', () => {

    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        var url = tabs[0].url;
        alert(url);

        var http = new XMLHttpRequest();
        var server = 'http://localhost:8000/intellihistory/pdf';
        var data = new FormData();
        data.append('url', url);
        http.open('POST', server, true);
        //http.setRequestHeader('Content-type', 'multipart/form-data');
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                console.log('ready state change');
            }
        }

        http.send(data);
        alert(url);

    });

    console.log('something');
});



/*
$(document).ready(function(){
    $('#paste').click(function(){pasteSelection();});
  });
  function pasteSelection() {
    chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
    function(tab) {
      chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
      function(response){
        var text = document.getElementById('text'); 
        text.innerHTML = response.data;
      });
    });
  }
  */
  
/*
document.addEventListener('onmouseup', () => {
    chrome.tabs.executeScript( {
        code: "window.getSelection().toString();"
      }, (results) => {
        console.log(results[0]);
      });
});
*/
 