import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gravatar from '../utils/images/myAvatar.png'

class Feed extends Component {


    render() {
        const {comments, filteredComments, handleFilter} = this.props;

        return (
            <div className="comments-section">
                <div className="filter field">
                    <input type="text" placeholder="Filter" onKeyUp={(e) => handleFilter(e)}/>
                </div>
                <div className="comments-list">
                    <ol>
                        {comments && comments.length && comments.map((comment, index) => {
                            return(

                                <div key={index} className='event'>
                                    <div className='label'>
                                        <img className="gravatar" src={gravatar}/>
                                    </div>
                                    <div className="content">
                                        <div className='email'>
                                            <a>{comment.email}</a>
                                        </div>
                                        <div className='message'>
                                            <p>{comment.message}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}

Feed.propTypes = {
    comments: PropTypes.array.isRequired,
    handleFilter: PropTypes.func.isRequired
};

export default Feed;
