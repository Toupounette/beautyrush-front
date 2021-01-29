//import { SEARCH_BY_NAME, SEARCH_BY_SERVICE } from "../actionTypes";
import { SEARCH } from "../actionTypes";

const initialState = {};

function search(content){
    let method = "GET";
    var xhttp = new XMLHttpRequest();

    let path ="";
    if(content.searchByName === true)
    {
        path = '/search?type=byname&value=' + content.searchText;
    }
    else
    {
        path = '/search?type=byservice&value='  + content.searchText;
    }

    let url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + path;
    xhttp.open(method, url, false);
    
    xhttp.send(); 
    // reponse de serveur vers le front en dessous, et requete du front vers le serveur au dessus
    if (xhttp.status === 200) {
        console.log("xhttp.responseText: ", xhttp.responseText);
        return JSON.parse(xhttp.responseText);
    } else {
        return initialState;
    }
}

export default function(state = initialState, action) {

    switch(action.type) {
        case SEARCH:
            {
                return search(action.payload.content);
            }
       
        default:
            return state;
    }
}