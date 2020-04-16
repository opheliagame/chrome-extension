//changing recording button state
let recording = document.getElementById('record');
recording.addEventListener('change', function(element) {
    if(element.target.checked) {
        chrome.storage.sync.set({recording: true}, function() {
            console.log("Recording is set to true");
        });
        let form = document.getElementById('sessionForm');
        form.style.display = "block";
    }
    else {
        chrome.storage.sync.set({
            recording: false, 
            sEndTime: Date.now()}, function() {
            console.log("Recording is set to false");
            
        });

        //TODO:: check if session started
        // chrome.storage.sync.get(['sStartTime', 'sEndTime'],
        //     function(data) {
        //         getHistoryInTimePeriod(data.sStartTime, data.sEndTime);
        //     });
        chrome.tabs.create({url: "chart.html"});
        let form = document.getElementById('sessionForm');
        form.style.display = "none";
    }      
  });

//setting recording button state 
chrome.storage.sync.get('recording', function(data) {
    let recording = data.recording;
    document.getElementById('record').checked = recording;
});

//setting session start time
let button = document.getElementById("sFormButton");
button.addEventListener('click', function(event) {
    //init browsing history
    chrome.storage.sync.set({sHistory: {}}, function() {
        console.log("Init recording history");
    });


    let sstartTime = Date.now();
    chrome.storage.sync.set({sStartTime: sstartTime}, function() {
        console.log("Start time is " + sstartTime);
    });
    let name = document.getElementById("sName");
    chrome.storage.sync.set({sName: name.value}, function() {
        console.log("Session name is " + name.value);
    });
    document.getElementById('sessionForm').style.display = "none";
});

//getting history in a period of time
function getHistoryInTimePeriod(startTime, endTime) {
    chrome.history.search({
        text: '',
        startTime: startTime,
        endTime: endTime
    }, function(hist) {
        chrome.storage.sync.set({sHistory: hist}, function() {
            console.log("Session history is set.");
        });
        chrome.tabs.create({url: "chart.html"});
    })
}


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



// document.getElementById('select-button').addEventListener('click', () => {

//     function displaySelectedText() {
//         let selection = document.getSelection ? document.getSelection().toString() :  document.selection.createRange().toString() ;
//         //console.log(selection);
//         return selection;
//     }

//     chrome.tabs.executeScript({
//         code: '(' + displaySelectedText + ')();' //argument here is a string but function.toString() returns function's code
//     }, (results) => {
//         //Here we have just the innerHTML and not DOM structure
//         appendSelection(results[0]);
//     });
// });

// document.getElementById('makePPT').addEventListener('click', () => {

//     chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
//         var url = tabs[0].url;
//         alert(url);

//         var http = new XMLHttpRequest();
//         var server = 'http://localhost:8000/intellihistory/ppt';
//         var data = new FormData();
//         data.append('url', url);
//         http.open('POST', server, true);
//         //http.setRequestHeader('Content-type', 'multipart/form-data');
//         http.onreadystatechange = function() {//Call a function when the state changes.
//             if(http.readyState == 4 && http.status == 200) {
//                 console.log('ready state change');
//             }
//         }

//         http.send(data);
//         alert(url);

//     });

//     console.log('something');
// });

// document.getElementById('makePDF').addEventListener('click', () => {

//     chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
//         var url = tabs[0].url;
//         alert(url);

//         var http = new XMLHttpRequest();
//         var server = 'http://localhost:8000/intellihistory/pdf';
//         var data = new FormData();
//         data.append('url', url);
//         http.open('POST', server, true);
//         //http.setRequestHeader('Content-type', 'multipart/form-data');
//         http.onreadystatechange = function() {//Call a function when the state changes.
//             if(http.readyState == 4 && http.status == 200) {
//                 console.log('ready state change');
//             }
//         }

//         http.send(data);
//         alert(url);

//     });

//     console.log('something');
// });

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