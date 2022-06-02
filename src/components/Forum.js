import { connect } from 'react-redux';
import TopMenu from './TopMenu.js';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner';
import AddCommentButton from './AddCommentModal'
import ModifyCommentButton from './ModifyCommentButton'
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as commentsManagementActions from "../actions/CommentManagementActions";

const mapStateToProps = state => {
    return {
        authentication : state.authentication,
        forums : state.forum.forums,
        specificcomments: state.comment.specificcomments
    };
}

class Forum extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    componentDidMount() {
        const { getCommentsFromForumAction } = this.props;
        let params = window.location.pathname.split("/forum/")[1]
        getCommentsFromForumAction(params);
    }

    render() {
        let params = window.location.pathname.split("/forum/")[1]
    
        if(params === undefined) {
            return (
                <>
                <TopMenu/>
                <Container className="text-center">
                    <Spinner animation="border" />
                </Container>
                </>
            );
        };
        let forums = this.props.forums
        let specificForum = forums.find(o => o._id === params);
        let addCommentButton;
        this.props.authentication.userID ? addCommentButton = <AddCommentButton forumID={ specificForum._id }/> : addCommentButton = null;
        if(this.props.specificcomments === null) {
            return (
                <>
                <TopMenu/>
                <Container>
                    <Card id={"ForumItem"} className="m-3 p-3">
                        <Card.Body>
                            <Row><h3 className="p-0">{specificForum.forumName}</h3></Row>
                            <Row className="mt-3"><h5 className="p-0 text-right">Author: {specificForum.ownerID}</h5></Row>
                            <Row>{specificForum.forumDescription}</Row>
                        </Card.Body>
                    </Card>
                    <div>
                        <h2>Comments</h2>
                        { addCommentButton }
                    </div>
                </Container>
            </>
            );
        };
        return(
            <>
                <TopMenu/>
                <Container>
                    <Card id={"ForumItem"} className="m-3 p-3">
                        <Card.Body>
                            <Row><h3 className="p-0">{specificForum.forumName}</h3></Row>
                            <Row className="mt-3"><h5 className="p-0 text-right">Author: {specificForum.ownerID}</h5></Row>
                            <Row>{specificForum.forumDescription}</Row>
                        </Card.Body>
                    </Card>
                    <div className="d-flex">
                        <h2 className="px-3">Comments</h2>
                        { addCommentButton }
                    </div>
                    {this.props.specificcomments.map((comment) => (
                        <Card id={"CommentItem" + comment._id} key={ comment._id }className="m-3 p-3">
                                <Card.Body>
                                    <Row><h4 className="p-0">{comment.messageTitle}</h4></Row>
                                    <Row><strong className="p-0">{comment.authorID}</strong></Row>
                                    <Row>{comment.messageText}</Row>
                                    <Row className="text-muted"><small className="px-0">comment-id: {comment._id}</small></Row>
                                    <Row>
                                        <ModifyCommentButton givenComment={comment}/>
                                    </Row>
                                </Card.Body>
                            </Card>
                    ))}
                </Container>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    getCommentsFromForumAction: commentsManagementActions.getCommentsFromForum,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Forum)