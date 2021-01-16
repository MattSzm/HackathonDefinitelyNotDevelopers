import * as actionTypes from './actionTypes';
import axios from 'axios';

export const toggleDrawer = () => ({ type: actionTypes.TOGGLE_DRAWER });

export const tokenConfig = (getState) => {
    const token = getState().reducer.token;
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    } else {
        config.headers['Authorization'] = '';
    }
    return config;
};

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.USER_LOADING_START });

    axios.get('/api/newuser', tokenConfig(getState))
    .then(res => {
        console.log(res)
        dispatch({
            type: actionTypes.USER_LOADED,
            payload: res.data
        });
    })
};

export const predictText = (text) => (dispatch, getState) => {
    const body = JSON.stringify({ text: "since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially " });
    console.log(body);

    axios.post('/api/predicttext', body, tokenConfig(getState))
        .then(res => {
            let summary = res.data
            dispatch({ type: actionTypes.TEXT_PREDICTION_SUCCESS, payload: summary })
        })
};

