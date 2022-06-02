import * as ForumManagementActions from '../actions/ForumManagementActions'


const initialState = {
    forums: null,
    forumID: null,
    showAddForumDialog: false,
    forumAddPending: false,
    forumDeletePending: false,
    forumsGetPending: false,
    error: null
};

export default function forumReducer(state = initialState, action) {

    switch(action.type) {
        case ForumManagementActions.SHOW_ADD_FORUM_DIALOG:
            return {
                ...state,
                showAddForumDialog: true,
                error: null
            }

        case ForumManagementActions.HIDE_ADD_FORUM_DIALOG:
            return {
                ...state,
                showAddForumDialog: false,
                error: null
            }

        case ForumManagementActions.ADD_FORUM_SUCCESS:
            return {
                ...state,
                showAddForumDialog: false,
                error: null,
                forumAddPending: false,
                forums: [...state.forums, action.forums]
            }

        case ForumManagementActions.ADD_FORUM_ERROR:
            return {
                ...state,
                forumAddPending: false,
                error: 'Adding Forum failed'
            }

        case ForumManagementActions.ADD_FORUM_PENDING:
            return  {
                ...state,
                forumAddPending: true,
                error: null
            }

        case ForumManagementActions.SHOW_EDIT_FORUM_DIALOG:
            return {
                ...state,
                showEditForumDialog: true,
                error: null
            }

        case ForumManagementActions.HIDE_EDIT_FORUM_DIALOG:
            return {
                ...state,
                showEditForumDialog: false,
                error: null
            }

        case ForumManagementActions.EDIT_FORUM_SUCCESS:
            let newForums2 = null
            if(state.forums) {
                newForums2 = [...state.forums]
                let idx = newForums2.findIndex( element => element.forumID === action.forum.forumID)
                if(idx !== -1) {
                    newForums2[idx] = action.forum
                }
            }

            return {
                ...state,
                showEditForumDialog: false,
                error: null,
                forumAddPending: false,
                forums: newForums2
            }

        case ForumManagementActions.EDIT_FORUM_ERROR:
            return {
                ...state,
                forumEditPending: false,
                error: 'Adding Forum failed'
            }

        case ForumManagementActions.EDIT_FORUM_PENDING:
            return  {
                ...state,
                forumEditPending: true,
                error: null
            }

        case ForumManagementActions.DELETE_FORUM_SUCCESS:

            let newForums = null
            if(state.forums) {
                newForums = [...state.forums]
                let idx = newForums.findIndex(e => e._id === action.forum._id)
                if(idx !== -1){
                    newForums.splice(idx,1)
                }
            }
            return {
                ...state,
                showEditForumDialog: false,
                error: null,
                forumDeletePending: false,
                forums: newForums
            }

        case ForumManagementActions.DELETE_FORUM_ERROR:
            return {
                ...state,
                forumDeletePending: false,
                error: 'Adding Forum failed'
            }

        case ForumManagementActions.DELETE_FORUM_PENDING:
            return  {
                ...state,
                forumDeletePending: true,
                error: null
            }

        case ForumManagementActions.GET_FORUMS_PENDING:
            return {
                ...state,
                forumsGetPending: true,
                error: null
            }

        case ForumManagementActions.GET_FORUMS_SUCCESS:
            return {
                ...state,
                forumsGetPending: false,
                forums: action.forums,
                error: null
            }

        case ForumManagementActions.GET_FORUMS_ERROR:
            return {
                ...state,
                forumsGetPending: false,
                error: 'Error whilst getting Forums'
            }

        default:
            return state;
        }

}