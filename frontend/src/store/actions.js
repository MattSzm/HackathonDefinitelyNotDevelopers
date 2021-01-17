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

export const mediaTokenConfig = (getState) => {
    const token = getState().reducer.token;
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
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
    dispatch({ type: actionTypes.TEXT_PREDICTION_START })
    const body = JSON.stringify({ text: text});

    axios.post('/api/predicttext', body, tokenConfig(getState))
        .then(res => {
            let summary = res.data
            dispatch({ type: actionTypes.TEXT_PREDICTION_SUCCESS, payload: summary })
            console.log(res)
        })
};

export const trainAlgo = (id, text) => (dispatch, getState) => {
    dispatch({ type: actionTypes.TRAIN_ALGO_START })
    const body = JSON.stringify({ id: id, text: text });
    console.log(body);

    axios.post('/api/trainalgo', body, tokenConfig(getState))
    .then(res => {
        console.log(res)
        // dispatch({ type: actionTypes.TRAIN_ALGO_SUCCESS, payload: summary })
        // console.log(res)
    })
}


export const predictFile = (file) => (dispatch, getState) => {
    dispatch({ type: actionTypes.FILE_PREDICTION_START })
    const formData = new FormData();
    formData.append("file", file.selectedImage)
    console.log(file.selectedImage)

    axios.post('/api/predictfile', formData, mediaTokenConfig(getState))
    .then(res => {
        let summary = res.data
        dispatch({ type: actionTypes.FILE_PREDICTION_SUCCESS, payload: summary })
        console.log(res)
    })
}

export const fetchPlotSummary = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_SUMMARY_START });

    axios.get('/api/plotsummary', tokenConfig(getState))
    .then(res => {
        console.log(res)
        dispatch({
            type: actionTypes.FETCH_SUMMARY_SUCCESS,
            payload: res.data
        });
    })
}