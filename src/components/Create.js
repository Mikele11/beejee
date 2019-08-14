import React, { useState } from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions';
import store from './../store';

const Create = props => {
  const [post, setValues] = useState({
    email: '',
    name: '',
    tasktext: '',
    maked: false
  });
  const updateField = e => {
    setValues({
      ...post,
      [e.target.name]: e.target.value
    });
  };

  const submit = (e) => {
    e.preventDefault();
    props.createPost(post);
    store.subscribe(()=>{
      console.log('subscribenewPOST',store.getState());
    })
    props.history.push("/")
  }
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
          <form onSubmit={submit}>
            <div class="form-group">
              <label for="author">Name:</label>
              <input type="text" class="form-control" name="name" value={post.name} onChange={updateField} placeholder="Name" />
            </div>
            <div class="form-group">
              <label for="email">email:</label>
              <input type="text" class="form-control" name="email" value={post.email} onChange={updateField} placeholder="email" />
            </div>
            <div class="form-group">
              <label for="tasktext">tasktext:</label>
              <textArea class="form-control" name="tasktext" onChange={updateField} placeholder="tasktext" cols="80" rows="3">{post.tasktext}</textArea>
            </div>
            <button type="submit" class="btn btn-default" onClick={submit}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

Create.propTypes = {
  createPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.postss,
});

export default connect(mapStateToProps, { createPost })(Create);