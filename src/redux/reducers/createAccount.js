import { CREATE_CLIENT_ACCOUNT, CREATE_PRPOVIDER_ACCOUNT } from "../actionTypes";

const initialState = {
    // ip: "192.168.1.13",
    // port: "8080",
    // schema: "http",
    // method: "POST",
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_CLIENT_ACCOUNT:
            {
                let path = "/clients";
                let method = "POST";

                // XMLHttpRequest = classe js qui permet de creer des requetes http
                // new = permet de creer un objet de la classe
                var xhttp = new XMLHttpRequest();

                let url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + path;
                console.log('url:', url);


                // false en à la fin pour rendre cette methode générale asynchrone synchrone
                xhttp.open(method, url, false);

                //Configuration du content-type de la requete.Les données de la requete sont en format JSON car c'est le format choisi dans mon API back (node.js)
                xhttp.setRequestHeader("Content-Type", "application/json");

                //Fonction appellée quand il y aura une réponse (ou pas) de l'API (back)
                xhttp.onreadystatechange = function() {
                    // condition permet de verifier que tout c'est bien passé (code 200)
                    if (this.readyState === 4 && this.status === 200) {
                        console.log('TODO: sauvegarder les données dans redux');
                    }
                };
                xhttp.send(JSON.stringify(action.payload.content));
                return {
                    ...state,
                }

            }
        case CREATE_PRPOVIDER_ACCOUNT:
            {
                let path = "/providers";
                let method = "POST";

                // XMLHttpRequest = classe js qui permet de creer des requetes http
                // new = permet de creer un objet de la classe
                var xhttp = new XMLHttpRequest();

                let url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + path;
                console.log('url:', url);


                // false en à la fin pour rendre cette methode générale asynchrone synchrone
                xhttp.open(method, url, false);

                //Configuration du content-type de la requete.Les données de la requete sont en format JSON car c'est le format choisi dans mon API back (node.js)
                xhttp.setRequestHeader("Content-Type", "application/json");

                //Fonction appellée quand il y aura une réponse (ou pas) de l'API (back)
                xhttp.onreadystatechange = function() {
                    // condition permet de verifier que tout c'est bien passé (code 200)
                    if (this.readyState === 4 && this.status === 200) {
                        console.log('TODO: sauvegarder les données dans redux');
                    }
                };
                xhttp.send(JSON.stringify(action.payload.content));
                return {
                    ...state,
                }
            }
        default:
            return state;
    }
}