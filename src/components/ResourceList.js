import React from 'react';
import { ScriptItem } from './component-library';

import known_list from '../config/known-scripts';


class ResourceList extends React.Component {
    constructor(props) {
        super(props);

    }

    sortScripts(a, b) {
        known_list = known_list ? known_list : [];
        if(a.src=="" || b.src=="") return 0;
        var first_script = known_list.find(known=>a.src == known.src);
        var second_script = known_list.find(known=>b.src == known.src);

        if(first_script && second_script===undefined) {
            return -1;
        }
        if(first_script===undefined && second_script) {
            return 1;
        }
        
        return 0;
    }

    render() {
        
      console.log(this.props);

        var stylesAndScripts = this.props.domStylesAndScripts.slice(0);

        stylesAndScripts.sort(this.sortScripts);

        stylesAndScripts = stylesAndScripts.map((item)=>{
            return <ScriptItem key={item.original} scriptItem={item} />;
        });

        return (
            <div className="list-scripts" onClick={this.props.remove}>
                {stylesAndScripts}
            </div>
        );
    }
}

export default ResourceList;