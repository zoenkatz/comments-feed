import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from './actions/index.js'
import * as api from './utils/api';
import './App.css';
import {Route, withRouter} from 'react-router-dom'
import Feed from './components/Feed'
import Form from './components/Form'
import {Link} from 'react-router-dom'

class App extends Component {
    state = {
        comments: [],
        addCommentForm: {
            timestamp: new Date(),
            email: "",
            message: ""
        }
    };

    handleInputChange = (e, field) => {
        let newState = {...this.state};
        switch(field){
            case 'email':
                newState.addCommentForm.email = e.target.value;
                break;

            case 'message':
                newState.addCommentForm.message = e.target.value;
                break;

        }
        this.setState(newState);
    };

    handleFormSubmit = (e) => {
        e.preventDefault();

        let newState = {...this.state};
        newState.addCommentForm.timestamp = new Date();

        this.props.addComment(newState.addCommentForm).then(() => {
            this.setState({comments: this.props.comments});
        });
    };

    handleFilter = (e) => {
        let filteredComments = this.props.comments && this.props.comments.filter((comment) => comment.email.indexOf(e.target.value) > -1);
        this.setState({comments: filteredComments});
    };

    componentDidMount(){
        this.props.getComments().then(() => {
            this.setState({comments: this.props.comments});
        });

    }

    render() {
        const {history} = this.props;

        return (

            <div className='main-app'>
                <div className="title-section">
                    <h2>Comments Feed</h2>
                </div>
                <div className="form-feed-section">
                    <Form handleFormSubmit={this.handleFormSubmit} handleInputChange={this.handleInputChange}/>
                    <Feed comments={this.state.comments} filteredComments={this.props.filteredComments} handleFilter={this.handleFilter}/>
                </div>
            </div>
        )
    }
}

App.propTypes = {
    comments: PropTypes.array.isRequired
};

function mapStateToProps (state, props) {
    return {
        comments: state.comments
    }
}

function mapDispatchToProps (dispatch) {
    return {
         addComment: (data) => dispatch(actions.addComment(data)),
        // editComment: (data) => dispatch(actions.editComment(data)),
        // deleteComment: (data) => dispatch(actions.deleteComment(data)),
         getComments: (data) => dispatch(actions.loadComments(data))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))