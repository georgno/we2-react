import * as authenticationsActions from '../actions/AuthenticationActions'


const initialState = {
    userID: null,
    userName: null,
    accessToken: null,
    loginPending: false,
    showLoginDialog: false,
    error: null,
    isAdministrator: false,
    loggedIn: false
};

export default function authenticationReducer(state = initialState, action) {

    switch(action.type) {
        case authenticationsActions.SHOW_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: true,
                error: null
            }
        
        case authenticationsActions.HIDE_LOGIN_DIALOG:
            return {
                ...state,
                showLoginDialog: false,
                error: null
            }

        case authenticationsActions.AUTHENTICATION_PENDING:
            return {
                ...state,
                loginPending: true,
                error: null
            }

        case authenticationsActions.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                showLoginDialog: false,
                loginPending: false,
                userID: action.userID,
                userName: action.userName,
                accessToken: action.accessToken,
                isAdministrator: action.isAdministrator,
                loggedIn: true,
            }

        case authenticationsActions.AUTHENTICATION_ERROR:
            return {
                ...state,
                loginPending: false,
                error: 'Authentication failed'
            }

        case authenticationsActions.LOGOUT_ACTION:
            return {
                ...state,
                userID: null,
                error: null,
                loggedIn: false,
                isAdministrator: false
            }

        default:
            return state;
    };
}