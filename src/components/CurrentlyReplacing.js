import React from 'react';


class CurrentlyReplacing extends React.Component {
    constructor(props) {
        super(props);      

        this.state = {
            replacements: []
        }

        setInterval(()=>{
            var replacements = JSON.parse(localStorage.getItem("replaceSrcs"));
            replacements = Array.isArray(replacements) ? replacements : [];

            
            this.setState({
                replacements: replacements
            });
        }, 500);
        
    }


    

    render () {

        
        return (
          <div style={{"height": "100%"}}>
            <div className="currently-replacing">
                <div className="item">
                    <div>Type</div>
                    <div>Removing</div>
                    <div>Replacement</div>
                </div>
                {
                    this.state.replacements.map((item)=>{
                        var type = item.replacementType=="script" ? "script-replacement" : "style-replacement";
                        var oldSrc = item.oldSrc.split('#').shift().split('?').shift().split('/').pop();
                        return (
                            <div className={type + " item"} key={item.oldSrc}>
                                <div className="snsr-type">{item.replacementType=="script" ? "Script" : "Style"}</div>
                                <div className="replaced-item" title={item.oldSrc}>
                                    {oldSrc}
                                </div>
                                <div className="replacer-item" title={item.newSrc}>
                                    {item.newSrc || "Removing"}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
          </div>
        );
    }
}

export default CurrentlyReplacing;