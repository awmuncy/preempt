import React from 'react';
import { Controller, ResourceList, CurrentlyReplacing} from './component-library';


class StylesAndScriptsApp extends React.Component {
    constructor(props) {
        super(props);      
        
    }


    render () {

        return (
        <div className="scripts_to_replace">
            <Controller />
            <ResourceList domStylesAndScripts={this.props.links} />
            <CurrentlyReplacing />
        </div>)
    }
}



export default StylesAndScriptsApp;