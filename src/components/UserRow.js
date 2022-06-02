import { connect } from 'react-redux';
import EditUserModal from "./EditUserModal"
import { Button } from 'react-bootstrap';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as userManagementActions from "../actions/UserManagementActions";

const mapStateToProps = state => {
    return {
        accessToken : state.accessToken,
        forums : state.forums,
        userID : state.userID,
        comments : state.comments,
        specificcomments: state.specificcomments
    };
}

class UserRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleUserDelete(event, accessToken, userID) {
        event.preventDefault();
        if(!window.confirm("Wollen Sie den User wirklich löschen?")) return;
        const { deleteUserAction } = this.props;
        deleteUserAction(accessToken,userID);
    }

    render() {
        let user = this.props.user
        return(
            <tr id={"UserItem" + user.userID} key={user.userID}>
                <td>{user.userID}</td>
                <td>{user.userName}</td>
                <td>{String(user.isAdministrator)}</td>
                <td><EditUserModal specificUser={user} /></td>
                <td><Button variant="secondary" id={"DeleteButton" + user.userID}
                        onClick= { (event) => this.handleUserDelete(event ,
                        this.props.accessToken, user.userID )} >Delete</Button></td>
            </tr>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    deleteUserAction: userManagementActions.deleteUser,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserRow)