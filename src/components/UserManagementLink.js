import React, {Component} from "react";
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { connect } from 'react-redux'

class UserManagementLink extends Component {
    render() {
        return (
            <LinkContainer to="/userManagement" id="OpenUserManagementButton">
                <Nav.Link>UserManagement</Nav.Link>
            </LinkContainer>
        )
    }
}

export default connect()(UserManagementLink)