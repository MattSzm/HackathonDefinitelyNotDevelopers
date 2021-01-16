import * as actionTypes from './actionTypes';

const initialState = {
    toggleDrawer: false
}

export default (state=initialState, action) => {
    switch (action.type){
        case actionTypes.TOGGLE_DRAWER:
            const prevDrawerToggle = state.toggleDrawer;
            return {toggleDrawer: !prevDrawerToggle}
        default:
            return state;
    }
}