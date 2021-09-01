import React from 'react';

class Controller extends React.Component {
    constructor(props) {
        super(props);

        this.fireNext = this.fireNext.bind(this);
        this.state = {
            fireOnNextReload: (localStorage.getItem("fireOnNextReload") == "true")
        }  
 
    }

    fireNext(e){
        if(this.state.fireOnNextReload) {
            this.setState({
                fireOnNextReload: false
            });
            localStorage.setItem("fireOnNextReload", false);
        } else {
            this.setState({
                fireOnNextReload: true
            });
            localStorage.setItem("fireOnNextReload", true);
        }
    }

    render() {
        return (
            <div className="sns_controller">
                <input
                    name="isGoing"
                    type="checkbox"
                    checked={this.state.fireOnNextReload}
                    onChange={this.fireNext} />
                <button onClick={()=>{localStorage.removeItem("replaceSrcs"); chrome.runtime.sendMessage({type: "REPLACEMENT_ANNOUCEMENT", replacements: []})}}>Clear scripts</button>
            </div>
        );
    }
}

export default Controller;