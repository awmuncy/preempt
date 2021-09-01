// Get all scripts & styles
// Send the the extension
// Listen for extension message on replacements

{
  var scripts = document.querySelectorAll("script");
  var styles = document.querySelectorAll("link[rel='stylesheet']");

  
  scripts = Array.from(scripts).map(script => {
    return {
      original: script.getAttribute("src"),
      replacementType: "script"
    };
  });

  styles = Array.from(styles).map(style => {
    return {
      original: style.getAttribute("href"),
      replacementType: "style"
    };
  });

  styles = styles.filter(style => {
    return !!style.original;
  });

  scripts = scripts.filter(script => {
    return !!script.original;
  });
  
  chrome.runtime.sendMessage({type: "INITIALIZE_SCRIPTS_AND_STYLES", resources: scripts.concat(styles)});
}

chrome.runtime.onMessage.addListener(message => {
  console.log("Message from the background script:");
  console.log(message);
  localStorage.setItem("replaceSrcs", JSON.stringify(message.replacements));
  return Promise.resolve({response: "Hi from content script"});
});