import * as UserManagementActions from '../actions/UserManagementActions'


const initialState = {
    showAddUserDialog: false,
    userAddPending: false,
    userDeletePending: false,
    usersGetPending: false,
    error: null
};

export default function userreducer(state = initialState, action) {

    switch(action.type) {
        case UserManagementActions.SHOW_ADD_USER_DIALOG:
            return {
                ...state,
                showAddUserDialog: true,
                error: null
            }

        case UserManagementActions.HIDE_ADD_USER_DIALOG:
            return {
                ...state,
                showAddUserDialog: false,
                error: null
            }
        
        case UserManagementActions.ADD_USER_SUCCESS:
            return {
                ...state,
                showAddUserDialog: false,
                error: null,
                userAddPending: false,
                users: [...state.users, action.users]
            }

        case UserManagementActions.ADD_USER_ERROR:
            return {
                ...state,
                userAddPending: false,
                error: 'Adding User failed'
            }

        case UserManagementActions.ADD_USER_PENDING:
            return  {
                ...state,
                userAddPending: true,
                error: null
            }

        case UserManagementActions.SHOW_EDIT_USER_DIALOG:
            return {
                ...state,
                showEditUserDialog: true,
                error: null
            }

        case UserManagementActions.HIDE_EDIT_USER_DIALOG:
            return {
                ...state,
                showEditUserDialog: false,
                error: null
            }
        
        case UserManagementActions.EDIT_USER_SUCCESS:
            let newUsers2 = null
            if(state.users) {
                newUsers2 = [...state.users]
                let idx = newUsers2.findIndex( element => element.userID === action.user.userID)
                if(idx !== -1) {
                    newUsers2[idx] = action.user
                }
            }

            return {
                ...state,
                showEditUserDialog: false,
                error: null,
                userAddPending: false,
                users: newUsers2
            }

        case UserManagementActions.EDIT_USER_ERROR:
            return {
                ...state,
                userEditPending: false,
                error: 'Adding User failed'
            }

        case UserManagementActions.EDIT_USER_PENDING:
            return  {
                ...state,
                userEditPending: true,
                error: null
            }

        case UserManagementActions.DELETE_USER_SUCCESS:

            let newUsers = null
            if(state.users) {
                newUsers = [...state.users]
                let idx = newUsers.findIndex(e => e.userID === action.userID)
                if(idx !== -1){
                    newUsers.splice(idx,1)
                }
            }
            return {
                ...state,
                showEditUserDialog: false,
                error: null,
                userDeletePending: false,
                users: newUsers
            }

        case UserManagementActions.DELETE_USER_ERROR:
            return {
                ...state,
                userDeletePending: false,
                error: 'Adding User failed'
            }

        case UserManagementActions.DELETE_USER_PENDING:
            return  {
                ...state,
                userDeletePending: true,
                error: null
            }

        case UserManagementActions.GET_USERS_PENDING:
            return {
                ...state,
                usersGetPending: true,
                error: null
            }

        case UserManagementActions.GET_USERS_SUCCESS:
            return {
                ...state,
                usersGetPending: false,
                users: action.users,
                error: null
            }

        case UserManagementActions.GET_USERS_ERROR:
            return {
                ...state,
                usersGetPending: false,
                error: 'Error whilst getting Users'
            }

        default:
            return state;
    }
}