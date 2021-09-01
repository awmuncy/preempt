import { connect } from 'react-redux';

import _StylesAndScriptsApp from './StylesAndScriptsApp';
import _Controller from './Controller';
import _CurrentlyReplacing from './CurrentlyReplacing';
import _ResourceList from './ResourceList';
import _ScriptItem from './ScriptItem';

const REMOVE_SCRIPTS = "REMOVE_SCRIPTS";


const defaultMapStateToProps = state => {
    return {
        links: state.links
    }
};

// Action creators 

function removeScripts() {
    return {
        type: REMOVE_SCRIPTS
    }
}

const defaultMapDispatchToProps = (dispatch) => {


    return {
        remove: () => dispatch(removeScripts())
    };
}

const connectDefault = component => connect(defaultMapStateToProps, defaultMapDispatchToProps)(component);


var StylesAndScriptsApp = connectDefault(_StylesAndScriptsApp);
var Controller = connectDefault(_Controller);
var CurrentlyReplacing = connectDefault(_CurrentlyReplacing);
var ResourceList = connectDefault(_ResourceList);
var ScriptItem = connectDefault(_ScriptItem);


export {
    StylesAndScriptsApp,
    Controller,
    CurrentlyReplacing,
    ResourceList,
    ScriptItem
};