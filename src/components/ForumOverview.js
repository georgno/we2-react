import React, { Component } from "react";
import { connect } from 'react-redux';
import * as forumManagementActions from "../actions/ForumManagementActions";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner';
import {bindActionCreators} from "redux";
import { LinkContainer } from "react-router-bootstrap";
import AddForumModal from "./AddForumModal";
import TopMenu from "./TopMenu";


const mapStateToProps = state => {
    return state;
}

class ForumOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        const { getForumsAction } = this.props;
        getForumsAction();       
    }

    render() {
        const isAdministrator = this.props.authentication.isAdministrator;
        let addForumButton;
        (isAdministrator) ? addForumButton = <AddForumModal/> : addForumButton = null;
        if(this.props.forum.forums === null) {
            return (
                <>
                <Container className="text-center">
                    <Spinner animation="border" />
                </Container>
                </>
            );
        }
        return(
            <>
                <TopMenu/>
                <Container>
                    <div className="text-center">
                        { addForumButton }
                    </div>
                    {this.props.forum.forums.map((forum) => (
                        <LinkContainer to={`/forum/${forum._id}`} key={forum._id}>
                            <Card id={"ForumItem"} className="m-3 p-3">
                                <Card.Body>
                                    <Row><h3 className="p-0">{forum.forumName}</h3></Row>
                                    <Row className="text-muted">{forum.forumDescription}</Row>
                                    <Row className="mt-3"><h5 className="p-0 text-right" style={{ textAlign: "right" }}>{forum.ownerID}</h5></Row>
                                </Card.Body>
                            </Card>
                        </LinkContainer>
                    ))}
                </Container>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getForumsAction: forumManagementActions.getForums,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForumOverview)