import React, { Component } from "react";
import { connect } from 'react-redux';
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import LoggedInHeaderContent from "./LoggedInHeaderContent";
import UserSessionWidget from "./UserSessionWidget";
import { LinkContainer } from "react-router-bootstrap";

const mapStateToProps = state => {
    return state;
}

class TopMenu extends Component {

    render() {

        var isLoggedIn = this.props.authentication.loggedIn;

        return(
            <div>
                <Navbar>
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>WEB2 Community Page</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            { isLoggedIn ? <LoggedInHeaderContent /> : <UserSessionWidget /> }
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default connect(mapStateToProps)(TopMenu);