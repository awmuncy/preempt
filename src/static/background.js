chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

  switch(message.type) {
    case "INITIALIZE_SCRIPTS_AND_STYLES": 
      
      chrome.storage.local.set({resources: message.resources}, function(result) {
        console.log('Value currently is ' + result);
      });

      break;
    case "REPLACEMENT_ANNOUCEMENT":
      chrome.tabs.query({
        currentWindow: true,
        active: true
      }).then(tabs => sendMessageToTabs(tabs, message));
      break;
  }

});

function onError(error) {
  console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs, message) {
  for (let tab of tabs) {
    chrome.tabs.sendMessage(
      tab.id,
      message
    ).then(response => {
      console.log("Message from the content script:");
      console.log(response.response);
    }).catch(onError);
  }
}
