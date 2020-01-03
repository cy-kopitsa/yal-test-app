import {useReducer, useCallback} from 'react';
import {axios} from '../services';

const fetchReducer = (state, action) => {
    switch (action.type) {
        case 'REQUEST':
            return {
                ...state,
                loading: true,
                data: [],
                error: null
            };

        case 'SUCCESS':
            return {
                ...state,
                loading: false,
                data: [...action.data]
            };

        case 'FAILURE':
            return {
                ...state,
                loading: false,
                error: {...action.error}
            };
            
        default:
            return state;
    }
};

const useFetch = () => {
    const [state, dispatch] = useReducer(fetchReducer, {
        loading: false,
        data: [],
        error: null
    });

    const sendRequest = useCallback(() => {
        dispatch({type: 'REQUEST'});
        axios(null).get('/users')
            .then((response) => {
                dispatch({type: 'SUCCESS', data: response.data});
            })
            .catch((error) => {
                dispatch({type: 'FAILURE', error})
            });
    }, []);

    return {
        ...state,
        sendRequest
    };
};

export default useFetch;