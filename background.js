chrome.runtime.onInstalled.addListener(function() {
  

    chrome.storage.sync.set({recording: false}, function() {
      console.log("Recording is set to false");
    });
    
    chrome.contextMenus.create({
      id: 'select',
      title: 'Make selection!',
      contexts: ['selection']
    });
     
});

//function callback for context menu
//TODO:: write implementation
chrome.contextMenus.onClicked.addListener(function(info) {
  alert("clicked!");
});

// function contentMenuClicked() {
//   alert("clicked!");
// }

    
    chrome.storage.sync.set({selectedText: []}, function() {
      console.log("Selected text init");
    });
    

  //   chrome.browserAction.onClicked.addEventListener('click', function(tab) {
  //     chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
  //         var url = tabs[0].url;
  //         alert(url);
      
  //         var http = new XMLHttpRequest();
  //         var server = 'http://localhost:8000/intellihistory/keywords';
  //         var data = new FormData();
  //         data.append('url', url);
  //         http.open('POST', server, true);
  //         //http.setRequestHeader('Content-type', 'multipart/form-data');
  //         http.onreadystatechange = function() {//Call a function when the state changes.
  //             if(http.readyState == 4 && http.status == 200) {
  //                 console.log('ready state change');
  //             }
  //         };
      
  //         http.onload = function () {
  //           // do something to response
  //           alert(this.responseText);
  //         };
      
  //         http.send(data);
          
      
  //     });
  // });

 


  