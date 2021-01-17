import {
    CREATE_PRPOVIDER_ACCOUNT,
    CREATE_CLIENT_ACCOUNT,
    CONNECT_TO_PRPOVIDER_ACCOUNT,
    CONNECT_TO_CLIENT_ACCOUNT,
    LOG_OUT
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