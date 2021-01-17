import { CONNECT_TO_CLIENT_ACCOUNT, CONNECT_TO_PRPOVIDER_ACCOUNT } from "../actionTypes";

const initialState = { token: "", role: "", id: 0 };

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

    // //Fonction appellée quand il y aura une réponse (ou pas) de l'API (back)
    // xhttp.onreadystatechange = function() {
    //     // condition permet de verifier que tout c'est bien passé (code 200)
    //     if (this.readyState === 4 && this.status === 200) {
    //         console.log("this : ", this);
    //         console.log("this.response : ", this.response);
    //         return this.response;
    //     }
    // };
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
                console.log("client response: ", response);
                let new_state = {
                    token: response.token,
                    role: response.role,
                    id: response.id
                };
                return new_state;
            }
        case CONNECT_TO_PRPOVIDER_ACCOUNT:
            {
                let response = connectAccount('/providers/login', action.payload.content);
                console.log("providers response: ", response);
                let new_state = {
                    token: response.token,
                    role: response.role,
                    id: response.id
                };
                console.log("new_state: ", new_state);
                return new_state;
            }
        default:
            return state;
    }
}