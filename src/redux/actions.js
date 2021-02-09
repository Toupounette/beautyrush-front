import {
    LOG_OUT,
    USER_ACCOUNT
}
from "./actionTypes";

export const log_out = content => ({
    type: LOG_OUT,
    payload: {
        content
    }
});

export const userAccount = content => ({
    type: USER_ACCOUNT,
    payload: {
        content
    }
});