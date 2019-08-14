import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePost } from '../actions/postActions';
import store from './../store';

const Update = props => {

  const [state, setValues] = useState({
    id: '',
    email: '',
    name: '',
    tasktext: '',
    maked: false
  });

  const updateField = e => {
    setValues({
      ...state,
      [e.target.name]: e.target.value
    });
  };


  useEffect(() => {
    var loc = window.location.pathname;
    var revloc = loc.split("").reverse().join("");
    var ind = revloc.substring(0,revloc.indexOf('/'));
    ind = ind.split("").reverse().join("");

    axios.get(`/api/post/${ind}`)
    .then(res => {
      setValues({ 
        id: res.data._id, 
        email: res.data.email,
        name: res.data.name,
        tasktext: res.data.tasktext,
        maked: res.data.maked,
      });
    })
    .catch((error) => {
      console.log('error',error);
    });
  },[]);

  const submit = (e) => {
    e.preventDefault();
    const { id,email, name, tasktext, maked } = state;
    let post = { email, name, tasktext, maked  }
    props.updatePost(id,post);
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
            Update Task
          </h3>
        </div>
        <div class="panel-body">
          <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span>Task list</Link></h4>
          <form onSubmit={submit}>
            <div class="form-group">
              <label for="tasktext">tasktext:</label>
              <textArea class="form-control" name="tasktext" onChange={updateField} placeholder="tasktext" cols="80" rows="3">{state.tasktext}</textArea>
            </div>
            <button type="submit" class="btn btn-default" onClick={submit}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

Update.propTypes = {
  updatePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.postss,
});

export default connect(mapStateToProps, { updatePost })(Update);