import * as actionTypes from './actionTypes';

const initialState = {
    toggleDrawer: false,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    summary: null,

    history: null,

    selectedImage: null,
    imagePreviewUrl: null
}

export default (state=initialState, action) => {
    switch (action.type){
        case actionTypes.TOGGLE_DRAWER:
            const prevDrawerToggle = state.toggleDrawer;
            return {
                ...state,
                toggleDrawer: !prevDrawerToggle
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
        case actionTypes.FETCH_HISTORY_START:
        case actionTypes.TEXT_PREDICTION_START:
        case actionTypes.USER_LOADING_START:
        case actionTypes.FILE_PREDICTION_START:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.FILE_PREDICTION_SUCCESS:
            return {
                ...state,
                summary: action.payload.summary
            }
        case actionTypes.FETCH_HISTORY_SUCCESS:
            return {
                ...state,
                history: action.payload.history,
            }
        default:
            return state;
    }
}