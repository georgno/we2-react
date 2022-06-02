import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import TopMenu from './TopMenu.js';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import '../index.css';
import { connect } from 'react-redux'

import AddForumModal from "./AddForumModal";
import EditForumModal from "./EditForumModal";

import * as forumManagementActions from "../actions/ForumManagementActions";

import {bindActionCreators} from "redux";

const mapStateToProps = (state) => ({
    accessToken: state.authentication.accessToken,
    forums: state.forum.forums
});

class ForumManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        const { getForumsAction } = this.props;
        getForumsAction();       
    }

    handleForumDelete(event, accessToken, forumID) {
        event.preventDefault();
        if(!window.confirm("Wollen Sie das Forum wirklich löschen?")) return;
        const { deleteForumAction } = this.props;
        deleteForumAction(accessToken,forumID);
    }

    render() {
        if(this.props.forums === undefined) {
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
                    <AddForumModal/>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>OwnerID</th>
                                <th>ForumID</th>
                                <th>ForumName</th>
                                <th>Beschreibung</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.forums.map((forum) => (
                                <tr id={"ForumItem"} key={forum._id}>
                                    <td>{forum.ownerID}</td>
                                    <td>{forum._id}</td>
                                    <td>{forum.forumName}</td>
                                    <td>{forum.forumDescription}</td>
                                    <td><EditForumModal specificforum={forum} /></td>
                                    <td><Button variant="secondary" id={"DeleteButton" + forum._id}
                                            onClick= { (event) => this.handleForumDelete(event ,
                                            this.props.accessToken, forum._id )} >Delete</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>   
                </Container> 
            </> 
        );
    }
}



const mapDispatchToProps = (dispatch) => bindActionCreators({
    deleteForumAction: forumManagementActions.deleteForum,
    getForumsAction: forumManagementActions.getForums,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForumManagement)