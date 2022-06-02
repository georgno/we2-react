import {Component} from "react";
import Nav from 'react-bootstrap/Nav';
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';

import {logoutUser} from '../actions/AuthenticationActions';
import UserManagementLink from './UserManagementLink.js';
import ForumManagementLink from './ForumManagementLink.js';


const mapStateToProps = state => {
    return state;
}

class LoggedInHeaderContent extends Component {

    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
    }

    logoutUser() {
        const dispatch = this.props.dispatch;
        dispatch(logoutUser())
    }

    render() {
        const isAdministrator = this.props.authentication.isAdministrator;
        let userManagementLink;
        (isAdministrator) ? userManagementLink = <UserManagementLink/> : userManagementLink = null;
        let forumManagementLink;
        (isAdministrator) ? forumManagementLink = <ForumManagementLink/> : forumManagementLink = null;
        return (
            <>
                <Nav.Item>
                    { userManagementLink }
                </Nav.Item>
                <Nav.Item>
                    { forumManagementLink }
                </Nav.Item>
                <Nav.Item>
                    <strong>
                        { this.props.authentication.userID}
                    </strong>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="/">
                        <Nav.Link id="LogoutButton" onClick={this.logoutUser}> Logout </Nav.Link>
                    </LinkContainer>
                </Nav.Item>
            </>
        )
    }
}

export default connect(mapStateToProps)(LoggedInHeaderContent)