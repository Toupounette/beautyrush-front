import {
    CREATE_PRPOVIDER_ACCOUNT,
    CREATE_CLIENT_ACCOUNT,
    CONNECT_TO_PRPOVIDER_ACCOUNT,
    CONNECT_TO_CLIENT_ACCOUNT,
    LOG_OUT,
    SEARCH,
    //SEARCH_BY_SERVICE 
}
from "./actionTypes";

export const log_out = content => ({
    type: LOG_OUT,
    payload: {
        content
    }
});

export const createClientAccount = content => ({
    type: CREATE_CLIENT_ACCOUNT,
    payload: {
        content
    }
});

export const createProviderAccount = content => ({
    type: CREATE_PRPOVIDER_ACCOUNT,
    payload: {
        content
    }
});

export const connectToProviderAccount = content => ({
    type: CONNECT_TO_PRPOVIDER_ACCOUNT,
    payload: {
        content
    }
});

export const connectToClientAccount = content => ({
    type: CONNECT_TO_CLIENT_ACCOUNT,
    payload: {
        content
    }
});

export const search = content => ({
    type: SEARCH,
    payload: {
        content
    }
});

//export const searchByService = content => ({
//    type: SEARCH_BY_SERVICE,
//    payload: {
//        content
//    }
//});