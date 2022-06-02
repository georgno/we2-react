require('dotenv').config()

export const SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG';
export const HIDE_LOGIN_DIALOG = 'HIDE_LOGIN_DIALOG';

export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING';
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

export const LOGOUT_ACTION = 'LOGOUT_ACTION';

export function getShowLoginDialogAction() {
    return {type: SHOW_LOGIN_DIALOG}
}

export function getHideLoginDialogAction() {
    return {type: HIDE_LOGIN_DIALOG}
}

export function getAuthenticateUserPendingAction() {
    return {type: AUTHENTICATION_PENDING}
}

export function getAuthenticateUserSuccessAction(userSession) {
    return {
        type: AUTHENTICATION_SUCCESS,
        accessToken: userSession.accessToken,
        user: userSession.user,
        userID: userSession.userID,
        userName: userSession.userName,
        isAdministrator: userSession.isAdministrator,
        loggedIn: true
    }
}

export function getAuthenticateUserErrorAction(error) {
    return {type: AUTHENTICATION_ERROR, error: error}
}

export function logoutUser() {
    return {type: LOGOUT_ACTION}
}

export function authenticateUser(userID, password) {
    return dispatch => {
        dispatch(getAuthenticateUserPendingAction());
        login(userID, password).then(userSession => {
            const action = getAuthenticateUserSuccessAction(userSession);
            dispatch(action);
        }, error => {
            dispatch(getAuthenticateUserErrorAction(error));
        }).catch(error => {
            dispatch(getAuthenticateUserErrorAction(error));
        })
    }
}

function login(userID, password) {
    
    var userAuthDataString = userID + ":" + password;
    var userAuthData = Buffer.from(userAuthDataString).toString('base64');

    const requestOptions = {
        method: 'POST',
        headers: { 
            'Authorization': 'Basic ' + userAuthData
        },
    };
    return fetch(process.env.REACT_APP_URL + '/authenticate', requestOptions)
    .then(handleResponse)
    .then(token => {
        const isAdministrator = token.split('||')[1]
        const isAdmin = (isAdministrator === 'true');

        let userSession = { 
            userID: userID,
            accessToken: token.split('||')[0],
            isAdministrator: isAdmin
        }
        return userSession;
    })
}

function handleResponse(response) {

    const authorizationHeader = response.headers.get('Authorization');
    const isAdministrator = response.headers.get('isAdministrator');

    return response.text().then(text => {
            let tokenAndAdmin
            if (authorizationHeader) tokenAndAdmin = authorizationHeader.split(" ")[1];
            tokenAndAdmin += "||" + isAdministrator
            if (!response.ok) {
                if (response.status === 401) logoutUser();
                return Promise.reject(response.statusText);
            }
            return tokenAndAdmin;
        })
}