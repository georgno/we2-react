import * as CommentManagementActions from '../actions/CommentManagementActions'


const initialState = {
    comment: null,
    specificcomments: null,
    comments: null,
    commentID: null,
    showAddCommentDialog: false,
    commentDeletePending: false,
    commentGetPending: false,
    error: null,
};

export default function commentReducer(state = initialState, action) {

    switch(action.type) {
        case CommentManagementActions.SHOW_ADD_COMMENT_DIALOG:
            return {
                ...state,
                showAddCommentDialog: true,
                error: null
            }
        
        case CommentManagementActions.HIDE_ADD_COMMENT_DIALOG:
            return {
                ...state,
                showAddCommentDialog: false,
                error: null
            }
        
        case CommentManagementActions.ADD_COMMENT_SUCCESS:
            return {
                ...state,
                showAddCommentDialog: false,
                commentAddPending: false,
                specificcomments: [...state.specificcomments, action.comment]
            }
        
        case CommentManagementActions.ADD_COMMENT_ERROR:
            return {
                ...state,
                commentAddPending: false,
                error: 'Adding Comment failed'
            }
        
        case CommentManagementActions.ADD_COMMENT_PENDING:
            return  {
                ...state,
                commentAddPending: true,
                error: null
            }
        
        case CommentManagementActions.SHOW_EDIT_COMMENT_DIALOG:
            return {
                ...state,
                showEditCommentDialog: true,
                error: null
            }
        
        case CommentManagementActions.HIDE_EDIT_COMMENT_DIALOG:
            return {
                ...state,
                showEditCommentDialog: false,
                error: null
            }
        
        case CommentManagementActions.EDIT_COMMENT_SUCCESS:
            let newComments2 = null
            let newSpecificComments = null
            if(state.comments) {
                newComments2 = [...state.comments]
                let idx = newComments2.findIndex( element => element._id === action.commentID)
                if(idx !== -1) {
                    newComments2[idx] = action.comment
                }
            }
            if(state.specificcomments) {
                newSpecificComments = [...state.specificcomments]
                let idx = newSpecificComments.findIndex( element => element._id === action.commentID)
                if(idx !== -1) {
                    newSpecificComments[idx] = action.comment
                }
            }
        
            return {
                ...state,
                showEditCommentDialog: false,
                error: null,
                commentAddPending: false,
                comments: newComments2,
                specificcomments: newSpecificComments
            }
        
        case CommentManagementActions.EDIT_COMMENT_ERROR:
            return {
                ...state,
                commentEditPending: false,
                error: 'Adding Comment failed'
            }
        
        case CommentManagementActions.EDIT_COMMENT_PENDING:
            return  {
                ...state,
                commentEditPending: true,
                error: null
            }
        
        case CommentManagementActions.DELETE_COMMENT_SUCCESS:
        
            let newComments = null
            let newSpecificComments2 = null
            if(state.comments) {
                newComments = [...state.comments]
                let idx = newComments.findIndex(e => e._id === action.commentID)
                if(idx !== -1){
                    newComments.splice(idx,1)
                }
            }
            if(state.specificcomments) {
                newSpecificComments2 = [...state.specificcomments]
                let idy = newSpecificComments2.findIndex(e => e._id === action.commentID)
                if(idy !== -1){
                    newSpecificComments2.splice(idy,1)
                }
            }
            return {
                ...state,
                showEditCommentDialog: false,
                error: null,
                commentDeletePending: false,
                comments: newComments,
                specificcomments: newSpecificComments
            }
        
        case CommentManagementActions.DELETE_COMMENT_ERROR:
            return {
                ...state,
                commentDeletePending: false,
                error: 'Adding Comment failed'
            }
        
        case CommentManagementActions.DELETE_COMMENT_PENDING:
            return  {
                ...state,
                commentDeletePending: true,
                error: null
            }
        
        case CommentManagementActions.GET_COMMENTS_PENDING:
            return {
                ...state,
                commentsGetPending: true,
                error: null
            }
        
        case CommentManagementActions.GET_COMMENTS_SUCCESS:
            return {
                ...state,
                commentsGetPending: false,
                comments: action.comments,
                error: null
            }
        
        case CommentManagementActions.GET_COMMENTS_ERROR:
            return {
                ...state,
                commentsGetPending: false,
                error: 'Error whilst getting Comments'
            }

        case CommentManagementActions.GET_COMMENTS_FROM_FORUM_PENDING:
            return {
                ...state,
                commentsGetPending: true,
                error: null
            }
        
        case CommentManagementActions.GET_COMMENTS_FROM_FORUM_SUCCESS:
            return {
                ...state,
                commentsGetPending: false,
                specificcomments: action.specificcomments,
                error: null
            }
        
        case CommentManagementActions.GET_COMMENTS_FROM_FORUM_ERROR:
            return {
                ...state,
                commentsGetPending: false,
                error: 'Error whilst getting Comments'
            }

        default:
            return state;
        };
}