import React, {Component} from "react";
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { connect } from 'react-redux'

class ForumManagementLink extends Component {
    render() {
        return (
            <LinkContainer to="/forumManagement" id="OpenForumManagementButton">
                <Nav.Link>ForumManagement</Nav.Link>
            </LinkContainer>
        )
    }
}

export default connect()(ForumManagementLink)