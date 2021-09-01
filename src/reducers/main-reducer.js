export default function(state = [], action) {
    switch(action.type) {
        case 'REMOVE_SCRIPTS':
            var links = state.links.slice(0);


            return {
                ...state,
                links: links
            };

        default: 
            return state;
    }
};