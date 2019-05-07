import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions';
import store from './../store';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      tasktext: '',
      maked: false
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { email, name, tasktext } = this.state;
    var post={};
    post.email = email;
    post.name = name;
    post.tasktext = tasktext;
    post.maked = false;
    this.props.createPost(post);
    store.subscribe(()=>{
      console.log('subscribenewPOST',store.getState());
    })
    this.props.history.push("/")
  }

  render() {
    const { email, name, tasktext } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD Task
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>Task List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="author">Name:</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="email">email:</label>
                <input type="text" class="form-control" name="email" value={email} onChange={this.onChange} placeholder="email" />
              </div>
              <div class="form-group">
                <label for="tasktext">tasktext:</label>
                <textArea class="form-control" name="tasktext" onChange={this.onChange} placeholder="tasktext" cols="80" rows="3">{tasktext}</textArea>
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Create.propTypes = {
  createPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.postss,
});

export default connect(mapStateToProps, { createPost })(Create);
