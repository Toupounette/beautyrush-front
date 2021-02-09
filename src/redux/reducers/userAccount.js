import { USER_ACCOUNT, LOG_OUT } from "../actionTypes";

const initialState = {
    token: null,
    role: null,
    id: null
};

export default function(state = initialState, action) {

    switch (action.type) {
        case USER_ACCOUNT:
            {
                return action.payload.content;
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