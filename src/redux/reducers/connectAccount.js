import { CONNECT_TO_CLIENT_ACCOUNT, CONNECT_TO_PRPOVIDER_ACCOUNT, LOG_OUT } from "../actionTypes";

const initialState = {
    token: null,
    role: null,
    id: null
};

function connectAccount(path, data) {
    let method = "POST";

    // XMLHttpRequest = classe js qui permet de creer des requetes http
    // new = permet de creer un objet de la classe
    var xhttp = new XMLHttpRequest();

    let url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + path;

    // false en à la fin pour rendre cette methode générale asynchrone synchrone
    xhttp.open(method, url, false);

    //Configuration du content-type de la requete.Les données de la requete sont en format JSON car c'est le format choisi dans mon API back (node.js)
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send(JSON.stringify(data));

    if (xhttp.status === 200) {
        console.log("xhttp.responseText: ", xhttp.responseText);
        return JSON.parse(xhttp.responseText);
    } else {
        return initialState;
    }
}

export default function(state = initialState, action) {

    switch (action.type) {
        case CONNECT_TO_CLIENT_ACCOUNT:
            {
                let response = connectAccount('/clients/login', action.payload.content);
                console.debug("client response: ", response);
                let new_state = {
                    token: response.token,
                    role: response.role,
                    id: response.id
                };
                console.debug("new_state: ", new_state);
                return new_state;
            }
        case CONNECT_TO_PRPOVIDER_ACCOUNT:
            {
                let response = connectAccount('/providers/login', action.payload.content);
                console.debug("providers response: ", response);
                let new_state = {
                    token: response.token,
                    role: response.role,
                    id: response.id
                };
                console.debug("new_state: ", new_state);
                return new_state;
            }
        case LOG_OUT:
            {
                localStorage.clear();
                return initialState;
            }
        default:
            return state;
    }
}