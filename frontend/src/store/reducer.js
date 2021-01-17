import * as actionTypes from './actionTypes';

const initialState = {
    toggleDrawer: false,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    isLoaded: false,
    summary: "",

    history: null,

    selectedImage: null,
    imagePreviewUrl: null,

    plotSummary: {
        x: [],
        y1: [],
        y2: [],
        y3: []
    }
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
                summary: action.payload.prediction,
                isLoading: false
            }
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
                summary: action.payload.summary,
                isLoading: false
            }
        case actionTypes.FETCH_SUMMARY_SUCCESS:
            return {
                ...state,
                plotSummary: action.payload,
                isLoading: false
            }
        case actionTypes.FETCH_SUMMARY_START:
            return {
                ...state,
                // plotSummary: action.payload,
                isLoading: true
            }
        default:
            return state;
    }
}