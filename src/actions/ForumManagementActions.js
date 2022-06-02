export const SHOW_ADD_FORUM_DIALOG = 'SHOW_ADD_FORUM_DIALOG';
export const HIDE_ADD_FORUM_DIALOG = 'HIDE_ADD_FORUM_DIALOG';
export const ADD_FORUM_PENDING = 'ADD_FORUM_PENDING';
export const ADD_FORUM_SUCCESS = 'ADD_FORUM_SUCCESS';
export const ADD_FORUM_ERROR = 'ADD_FORUM_ERROR';

export const SHOW_EDIT_FORUM_DIALOG = 'SHOW_EDIT_FORUM_DIALOG';
export const HIDE_EDIT_FORUM_DIALOG = 'HIDE_EDIT_FORUM_DIALOG';
export const EDIT_FORUM_PENDING = 'EDIT_FORUM_PENDING';
export const EDIT_FORUM_SUCCESS = 'EDIT_FORUM_SUCCESS';
export const EDIT_FORUM_ERROR = 'EDIT_FORUM_ERROR';

export const DELETE_FORUM_PENDING = 'DELETE_FORUM_PENDING';
export const DELETE_FORUM_SUCCESS = 'DELETE_FORUM_SUCCESS';
export const DELETE_FORUM_ERROR = 'DELETE_FORUM_ERROR';

export const GET_FORUMS_PENDING = 'GET_FORUMS_PENDING';
export const GET_FORUMS_SUCCESS = 'GET_FORUMS_SUCCESS';
export const GET_FORUMS_ERROR = 'GET_FORUMS_ERROR';


export function getShowAddForumDialogAction() {
    return {type: SHOW_ADD_FORUM_DIALOG}
}

export function getHideAddForumDialogAction() {
    return {type: HIDE_ADD_FORUM_DIALOG}
}

export function getAddForumPendingAction() {
    return {type: ADD_FORUM_PENDING}
}

export function getAddForumSuccessAction(forums) {
    return {type: ADD_FORUM_SUCCESS, forums: forums}
}

export function getAddForumErrorAction(error) {
    return {type: ADD_FORUM_ERROR, error: error}
}

export function getShowEditForumDialogAction() {
    return {type: SHOW_EDIT_FORUM_DIALOG}
}

export function getHideEditForumDialogAction() {
    return {type: HIDE_EDIT_FORUM_DIALOG}
}

export function getEditForumPendingAction() {
    return {type: EDIT_FORUM_PENDING}
}

export function getEditForumSuccessAction(forums) {
    return {type: EDIT_FORUM_SUCCESS, forums: forums}
}

export function getEditForumErrorAction(error) {
    return {type: EDIT_FORUM_ERROR, error: error}
}

export function getDeleteForumSuccessAction(forum) {
    return {type: DELETE_FORUM_SUCCESS, forum: forum}
}

export function getDeleteForumErrorAction(error) {
    return {type: DELETE_FORUM_ERROR}
}

export function getDeleteForumPendingAction() {
    return {type: DELETE_FORUM_PENDING}
}

export function getGetForumsPendingAction() {
    return {type: GET_FORUMS_PENDING}
}

export function getGetForumsErrorAction() {
    return {type: GET_FORUMS_ERROR}
}

export function getGetForumsSuccessAction(forums) {
    return {type: GET_FORUMS_SUCCESS, forums: forums}
}

export function getForums() {
    return dispatch => {
        dispatch(getGetForumsPendingAction());
        fetch(process.env.REACT_APP_URL + '/forum', {
            "method": "GET",
            "headers": {
                'Content-Type':'application/json',
            }}).then(value => {
                    return value.text().then( text => {
                    let data = JSON.parse(text)
                    dispatch(getGetForumsSuccessAction(data))
                })
            }, error => {
                dispatch(getGetForumsErrorAction(error));
            }).catch(error => {
                dispatch(getGetForumsErrorAction(error));
            })
    }
}

export function addForum(accessToken, forumID, forumName, forumDescription, ownerID) { 
    return dispatch => {
        dispatch(getAddForumPendingAction())
        fetch(process.env.REACT_APP_URL + '/forum', {
            "method": "POST",
            "headers": {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            "body": JSON.stringify({
                'forumID': forumID, 
                'forumName': forumName,
                'forumDescription': forumDescription,
                'ownerID': ownerID
            })
        }).then(value => {
                return value.text().then( text => {
                let data = JSON.parse(text)
                const action = getAddForumSuccessAction(data);
                dispatch(action);})
            }, error => {
                dispatch(getAddForumErrorAction(error));
            }).catch(error => {
                dispatch(getAddForumErrorAction(error));
            })
    }
}

export function editForum(accessToken, forumID, forumName, forumDescription) {
    console.log(forumID) 
    return dispatch => {
        dispatch(getEditForumPendingAction())
        fetch(process.env.REACT_APP_URL + '/forum', {
            "method": "PUT",
            "headers": {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            "body": JSON.stringify({
                '_id': forumID,
                'forumName': forumName, 
                'forumDescription': forumDescription   
            })
        }).then(value => {
            return value.text().then( text => {
                let data = JSON.parse(text)
                dispatch(getEditForumSuccessAction(data))
            })
        }, error => {
            dispatch(getEditForumErrorAction(error));
        }).catch(error => {
            dispatch(getEditForumErrorAction(error));
        })
    }
}

export function deleteForum(accessToken, forumID) {
    return dispatch => {
        dispatch(getDeleteForumPendingAction());
        fetch(process.env.REACT_APP_URL + '/forum', {
            "method": "DELETE",
            "headers": {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            "body": JSON.stringify({'_id': forumID})
        }).then(value => {
            return value.text().then( text => {
                let data = JSON.parse(text)
                const action = getDeleteForumSuccessAction(data);
                dispatch(action);})
        }, error => {
            dispatch(getDeleteForumErrorAction(error));
        }).catch(error => {
            dispatch(getDeleteForumErrorAction(error));
        })
    }
}