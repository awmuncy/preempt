// The real money-maker: Replace the scripts and stylesheets before they even get started
var shouldReplace = !!localStorage.getItem("fireOnNextReload");


if(shouldReplace) {
    var replacements = JSON.parse(localStorage.getItem("replaceSrcs"));
    replacements = Array.isArray(replacements) ? replacements : [];
    

    const observer = new MutationObserver(mutations => {
        mutations.forEach(({ addedNodes }) => {
            addedNodes.forEach(node => {
                
                // For each added script tag
                if(node.nodeType === 1 && (node.tagName === 'SCRIPT' || node.tagName === 'LINK')) {                
                    
                    replacements.forEach((scriptReplacement)=>{
                        if(node.src==scriptReplacement.oldSrc) {                                
                            console.log(node.src + " replaced with " + scriptReplacement.newSrc + ".");
                            node.src = scriptReplacement.newSrc;          
                            node.setAttribute("original-source", scriptReplacement.oldSrc);                  
                        }
                        if(node.href==scriptReplacement.oldSrc) {                                
                            console.log(node.href + " replaced with " + scriptReplacement.newSrc + ".");
                            node.href = scriptReplacement.newSrc || "nostyle";          
                            node.setAttribute("original-source", scriptReplacement.oldSrc);                  
                        }
                        if(node.src==scriptReplacement.beforeSrc) {
                          // Copy element, insert after this one, can replace
                          
                          node.insertAdjacentHTML('afterend', `<script type="text/javascript" src=${node.src}></script>` )
                          node.src = scriptReplacement.beforeSrc;

                          console.log("Inserted " + scriptReplacement.beforeSrc + "before" + node.src);
                        }
                        
                    });
                    
                }
            })
        })
    });
    
    // Starts the monitoring
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
    
    document.addEventListener("DOMContentLoaded", () => {
      observer.disconnect();
    });
}
