import { CREATE_PRPOVIDER_ACCOUNT, CREATE_CLIENT_ACCOUNT } from "./actionTypes";

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