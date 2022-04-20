import { useReducer } from 'react';
import { LOGIN } from './actions';

export const reducer = (state, action) => {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                user: [...action.loggedIn],
            }
            default:
                return state;
    }
};

export function useGlobalReducer(initialState) {
    return useReducer(reducer, initialState)
}