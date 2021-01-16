import * as actionTypes from './actionTypes';

const initialState = {
    toggleDrawer: false,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    summary: null
}

export default (state=initialState, action) => {
    switch (action.type){
        case actionTypes.TOGGLE_DRAWER:
            const prevDrawerToggle = state.toggleDrawer;
            return {
                ...state,
                toggleDrawer: !prevDrawerToggle
            }
        case actionTypes.USER_LOADING_START:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.USER_LOADED:
            localStorage.setItem('token', action.payload.token);
            console.log(action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false
            }
        case actionTypes.TEXT_PREDICTION_SUCCESS:
            return {
                ...state,
                summary: action.payload.summary
            }
        default:
            return state;
    }
}