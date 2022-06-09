import { configureStore } from '@reduxjs/toolkit';
import userReducer from './stateSlices/user.slice';

function saveToLocalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem('store', serializedStore);
    } catch(e) {
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem('store');
        if(serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch(e) {
        console.log(e);
        return undefined;
    }
}

const persistentState = loadFromLocalStorage();

export const store = configureStore({
    reducer: {
        user: userReducer
    },
    preloadedState: persistentState
});

store.subscribe(() => saveToLocalStorage(store.getState()));