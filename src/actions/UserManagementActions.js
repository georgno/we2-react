export const SHOW_ADD_USER_DIALOG = 'SHOW_ADD_USER_DIALOG';
export const HIDE_ADD_USER_DIALOG = 'HIDE_ADD_USER_DIALOG';
export const ADD_USER_PENDING = 'ADD_USER_PENDING';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_ERROR = 'ADD_USER_ERROR';

export const SHOW_EDIT_USER_DIALOG = 'SHOW_EDIT_USER_DIALOG';
export const HIDE_EDIT_USER_DIALOG = 'HIDE_EDIT_USER_DIALOG';
export const EDIT_USER_PENDING = 'EDIT_USER_PENDING';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_ERROR = 'EDIT_USER_ERROR';

export const DELETE_USER_PENDING = 'DELETE_USER_PENDING';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_ERROR = 'DELETE_USER_ERROR';

export const GET_USERS_PENDING = 'GET_USERS_PENDING';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_ERROR = 'GET_USERS_ERROR';

export function getShowAddUserDialogAction() {
    return {type: SHOW_ADD_USER_DIALOG}
}

export function getHideAddUserDialogAction() {
    return {type: HIDE_ADD_USER_DIALOG}
}

export function getAddUserPendingAction() {
    return {type: ADD_USER_PENDING}
}

export function getAddUserSuccessAction(users) {
    return {type: ADD_USER_SUCCESS, users: users}
}

export function getAddUserErrorAction(error) {
    return {type: ADD_USER_ERROR, error: error}
}

export function getShowEditUserDialogAction() {
    return {type: SHOW_EDIT_USER_DIALOG}
}

export function getHideEditUserDialogAction() {
    return {type: HIDE_EDIT_USER_DIALOG}
}

export function getEditUserPendingAction() {
    return {type: EDIT_USER_PENDING}
}

export function getEditUserSuccessAction(user) {
    return {type: EDIT_USER_SUCCESS, user: user}
}

export function getEditUserErrorAction(error) {
    return {type: EDIT_USER_ERROR, error: error}
}

export function getDeleteUserSuccessAction(userID) {
    return {type: DELETE_USER_SUCCESS, userID: userID}
}

export function getDeleteUserErrorAction(error) {
    return {type: DELETE_USER_ERROR}
}

export function getDeleteUserPendingAction() {
    return {type: DELETE_USER_PENDING}
}

export function getGetUsersPendingAction() {
    return {type: GET_USERS_PENDING}
}

export function getGetUsersErrorAction() {
    return {type: GET_USERS_ERROR}
}

export function getGetUsersSuccessAction(users) {
    return {type: GET_USERS_SUCCESS, users: users
    }
}



export function getUsers(accessToken) {

    return dispatch => {
        dispatch(getGetUsersPendingAction());
        fetch(process.env.REACT_APP_URL + '/user', {
            "method": "GET",
            "headers": {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }}).then(value => {
                    return value.text().then( text => {
                    let data = JSON.parse(text)
                    dispatch(getGetUsersSuccessAction(data))
                })
            }, error => {
                dispatch(getGetUsersErrorAction(error));
            }).catch(error => {
                dispatch(getGetUsersErrorAction(error));
            })
    }
}

export function addUser(accessToken, userID, userName, password) { 
    return dispatch => {
        dispatch(getAddUserPendingAction())
        fetch(process.env.REACT_APP_URL + '/user', {
            "method": "POST",
            "headers": {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            "body": JSON.stringify({
                'userID': userID, 
                'userName': userName,
                'password': password   
            })
        }).then(value => {
                return value.text().then( text => {
                let data = JSON.parse(text)
                const action = getAddUserSuccessAction(data);
                dispatch(action);})
            }, error => {
                dispatch(getAddUserErrorAction(error));
            }).catch(error => {
                dispatch(getAddUserErrorAction(error));
            })
    }
}

export function editUser(accessToken, userID, userName, password) { 
    return dispatch => {
        dispatch(getEditUserPendingAction())
        fetch(process.env.REACT_APP_URL + '/user', {
            "method": "PUT",
            "headers": {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            "body": JSON.stringify({
                'userID': userID,
                'userName': userName, 
                'password': password   
            })
        }).then(value => {
            return value.text().then( text => {
                let data = JSON.parse(text)
                dispatch(getEditUserSuccessAction(data))
            })
        }, error => {
            dispatch(getEditUserErrorAction(error));
        }).catch(error => {
            dispatch(getEditUserErrorAction(error));
        })
}
}

export function deleteUser(accessToken, userID) {
    return dispatch => {
        dispatch(getDeleteUserPendingAction());
        fetch(process.env.REACT_APP_URL + '/user', {
            "method": "DELETE",
            "headers": {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            "body": JSON.stringify({'userID': userID})
        }).then(value => {
            const action = getDeleteUserSuccessAction(userID);
            dispatch(action)
        }, error => {
            dispatch(getDeleteUserErrorAction(error));
        }).catch(error => {
            dispatch(getDeleteUserErrorAction(error));
        })
    }
}