import { createStore } from "redux";
import rootReducer from "./reducers";

// fonction qui permert d'ecrire dans le localstorage 
function saveToLocalStorage(state) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("persistantState", serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

// fonction qiu permet de lire
function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("persistantState");
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// lecture du localstarage lors de l'initialisation du store redux
const store = createStore(rootReducer, loadFromLocalStorage(), composeEnhancers);
// sauvagarde des donnée du redux dans le localstorage a chaque modifications
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;