import { useHistory } from 'react-router';
import * as actionTypes from './actionTypes';

const initialState = {
    toggleDrawer: false,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: false,
    isLoaded: false,
    summary: "",
    summaryID: "",
    selectedImage: null,
    imagePreviewUrl: null,

    plotSummary: {
        x: [],
        y1: [],
        y2: [],
        y3: []
    },
    userHistory: []
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
                summaryID: action.payload.id,
                isLoading: false
            }
        case actionTypes.TEXT_PREDICTION_START:
        case actionTypes.USER_LOADING_START:
        case actionTypes.FILE_PREDICTION_START:
        case actionTypes.FETCH_HISTORY_START:
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.FILE_PREDICTION_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                summary: action.payload.prediction,
                summaryID: action.payload.id,
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
        case actionTypes.FETCH_HISTORY_SUCCESS:
            return {
                ...state,
                userHistory: action.payload.data,
                savedTime: action.payload.saved_time,
                isLoading: false
            }
        case actionTypes.UPDATE_SUMMARY:
            return {
                ...state,
                summary: action.payload
            }
        default:
            return state;
    }
}