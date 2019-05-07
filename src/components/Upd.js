import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePost } from '../actions/postActions';
import store from './../store';

class Update extends Component {

  constructor() {
    super();
    this.state = {
      id: '',
      email: '',
      name: '',
      tasktext: '',
      maked: false
    };
  }
  componentDidMount() {
    var loc = window.location.pathname;
    var revloc = loc.split("").reverse().join("");
    var ind = revloc.substring(0,revloc.indexOf('/'));
    ind = ind.split("").reverse().join("");

    axios.get(`/api/post/${ind}`)
    .then(res => {
      this.setState({ 
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
  }


  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  setMaked = (event) => {
    if (event.target.value === 'true') {
      this.setState({
        maked: true
      })
    }
    if (event.target.value === 'false') {
      this.setState({
        maked: false
      })
    }
    console.log('new maked',this.state.maked,event.target.value );
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { id,email, name, tasktext, maked } = this.state;
    let post = { email, name, tasktext, maked  }
    this.props.updatePost(id,post);
    store.subscribe(()=>{
      console.log('subscribenewPOST',store.getState());
    })
    this.props.history.push("/") 
  }

  render() {
    const { tasktext, maked } = this.state;
    console.log('state', maked)
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
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="maked">maked:</label>
                <div onChange={this.setMaked}>
                  { maked ? 
                    <div>
                      <span><input type="radio" value="true" name="maked" checked/>maked  </span>
                      <span><input type="radio" value="false" name="maked"/> not maked</span>
                    </div>:
                    <div>
                      <span><input type="radio" value="true" name="maked"/> maked</span>
                      <span><input type="radio" value="false" name="maked" checked/> not maked</span>
                    </div>
                  }
                </div>
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

Update.propTypes = {
  updatePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.postss,
});

export default connect(mapStateToProps, { updatePost })(Update);