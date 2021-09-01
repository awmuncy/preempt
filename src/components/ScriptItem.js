import React from 'react';
import known_list from '../config/known-scripts';
import getHostName from '../lib/getHostName';

class ScriptItems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 'doNotReplace',
            manualSrc: ''
        }

        this.swapResource = this.swapResource.bind(this);
        this.changeSelectedOption = this.changeSelectedOption.bind(this);
        this.updateManualSrc = this.updateManualSrc.bind(this);
    }


    swapResource() {  
        
        var selected = this.state.selected;
        var manualSrc = this.state.manualSrc;

        var newSrc = selected=="replaceManually" ? manualSrc : selected;

        var item = this.props.scriptItem;
        

        var oldSrc = item.src || item.href;
        oldSrc = !item.original ? oldSrc : item.original;

        var replacementType = item.replacementType;
        
        var replacements = JSON.parse(localStorage.getItem("replaceSrcs"));

        if(!Array.isArray(replacements)) replacements = [];
        
        var itemInArray = replacements.findIndex(item=>item.oldSrc == oldSrc);

        if(itemInArray!=-1) {
            replacements[itemInArray].oldSrc = oldSrc;
            replacements[itemInArray].newSrc = newSrc;
            replacements[itemInArray].replacementType = replacementType;
            if(newSrc=="doNotReplace") {
                replacements.splice(itemInArray, 1);
            }
        } else {
            replacements.push({
                oldSrc: oldSrc,
                newSrc: newSrc,
                replacementType: replacementType
            });
        }

        localStorage.setItem("replaceSrcs", JSON.stringify(replacements));
        chrome.runtime.sendMessage({type: "REPLACEMENT_ANNOUCEMENT", replacements});

    }

    changeSelectedOption(e) {
        this.setState({
            selected: e.target.value
        }, this.swapResource);

    }

    updateManualSrc(e) {
        this.setState({
            manualSrc: e.target.value
        }, this.swapResource);
    }



    render() {

        var item = this.props.scriptItem;

        var resource = item.src===undefined ? item.href : item.src;

        var resource = !item.original ? resource : item.original;

        var known = known_list.find(known => resource == known.src);
        
        var siblings = known ? known.siblings : [];
        var name = known ? known.name : resource.split('#').shift().split('?').shift().split('/').pop();
        name = name=="" ? getHostName(resource) : name;

        var replacements =  [];
        replacements = siblings.map((sibling) => {
            return (
                <option key={sibling.src} value={sibling.src}>{sibling.name}</option>
            );
        });

        var replace_with = (
            <select value={this.state.selected} onChange={this.changeSelectedOption}>
                <option value="doNotReplace"></option>
                <option value="replaceManually">Replace manually</option>
                <option value="">Remove</option>
                {replacements}
            </select>
        );

        var replace_manually = this.state.selected == "replaceManually" ? <input placeholder="New resource URL" className="manually_replacing_script" type="text" value={this.state.manualSrc} onChange={this.updateManualSrc} /> : null;
        

        return (
            <div className="script_item" key={resource}>
                <div className="script_name" title={resource}>{name}</div>
                {replace_with}
                {replace_manually}
            </div>
        );
    }
}

export default ScriptItems;