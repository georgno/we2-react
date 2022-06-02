import { Component } from "react";
import TopMenu from './TopMenu.js';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import '../index.css';
import { connect } from 'react-redux'

import AddUserModal from "./AddUserModal";
import UserRow from "./UserRow.js";

import * as userManagementActions from "../actions/UserManagementActions";

import {bindActionCreators} from "redux";

const mapStateToProps = (state) => ({
    accessToken: state.authentication.accessToken,
    users: state.user.users
})

class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        const { getUsersAction } = this.props;
        getUsersAction(this.props.accessToken);
    }

    render() {
        if(this.props.users === undefined) {
            return (
                <>
                <TopMenu/>
                <Container className="text-center">
                    <Spinner animation="border" />
                </Container>
                </>
            );
        }
        return (
            <>
                <TopMenu/>
                <Container className="text-center">
                    <AddUserModal/>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>is Admin</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.users.map((user) => (
                                <UserRow key={user.userID} user={user}/>
                            ))}
                        </tbody>
                    </Table>   
                </Container> 
            </> 
        );
    }
}



const mapDispatchToProps = (dispatch) => bindActionCreators({
    deleteUserAction: userManagementActions.deleteUser,
    getUsersAction: userManagementActions.getUsers,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserManagement)