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
    }).catch(err => {
        dispatch({type: actionTypes.STOP_LOADING})
    })
};

export const predictText = (text) => (dispatch, getState) => {
    dispatch({ type: actionTypes.TEXT_PREDICTION_START })
    const body = JSON.stringify({ text: text});

    axios.post('/api/predicttext', body, tokenConfig(getState))
        .then(res => {
            dispatch({ type: actionTypes.TEXT_PREDICTION_SUCCESS, payload: res.data })
            console.log(res)
        }).catch(err => {
            dispatch({type: actionTypes.STOP_LOADING})
        })
};

export const trainAlgo = (id, text) => (dispatch, getState) => {
    dispatch({ type: actionTypes.TRAIN_ALGO_START })
    const body = JSON.stringify({ id: id, text: text });
    console.log(body);

    axios.post('/api/trainalgo', body, tokenConfig(getState))
    .then(res => {
        console.log(res)
        dispatch({ type: actionTypes.TRAIN_ALGO_SUCCESS})
        console.log(res)
    }).catch(err => {
        console.log(err.message)
        dispatch({type: actionTypes.STOP_LOADING})
    })
}

export const fetchUserHistory = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_HISTORY_START });

    axios.get('/api/userhistory', tokenConfig(getState))
    .then(res => {
        console.log(res)
        dispatch({
            type: actionTypes.FETCH_HISTORY_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        dispatch({type: actionTypes.STOP_LOADING})
    })
}

export const predictFile = (file) => (dispatch, getState) => {
    dispatch({ type: actionTypes.FILE_PREDICTION_START })
    const formData = new FormData();
    formData.append("file", file)
    console.log(file)
    axios.post('/api/predictfile', formData, mediaTokenConfig(getState))
    .then(res => {
        console.log(res.data)
        dispatch({ type: actionTypes.FILE_PREDICTION_SUCCESS, payload: res.data })
    }).catch(err => {
        dispatch({type: actionTypes.STOP_LOADING})
    })
}

export const fetchPlotSummary = () => (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_SUMMARY_START });
    console.log("fdfsfsd");
    axios.get('/api/plotsummary', tokenConfig(getState))
    .then(res => {
        console.log(res)
        dispatch({
            type: actionTypes.FETCH_SUMMARY_SUCCESS,
            payload: res.data
        });
    }).catch(err => {
        dispatch({type: actionTypes.STOP_LOADING})
    })
}

export const onUpdateSummary = (text) => (dispatch, getState) => {
    dispatch({ type: actionTypes.UPDATE_SUMMARY, payload: text })
}