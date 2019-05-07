import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { fetchPosts, deletePost } from './actions/postActions.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      todosPerPage: 3,
      posts:[]
    }
  }
  
  componentDidMount() {
    if (localStorage.getItem('jwtToken') === null ) {
      this.props.history.push("/login")
    }
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    this.props.fetchPosts(); 
  }

  compareBy = (key) => {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }
 
  sortBy = (key,array) => {
    let postsCopy = [...array];
    postsCopy.sort(this.compareBy(key));
    this.setState({posts: postsCopy});
  }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  onDelete(index){
    this.props.deletePost(this.props.posts[index]._id); 
  }
  
  render() {
    const { currentPage, todosPerPage } = this.state;
    let {posts} = this.state; 
    const todos = this.props.posts;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
    if ( posts.length<1 ){ 
      posts = currentTodos
    }
    const renderTodos = posts.map((post, index) => {
      return <div class="article">
              <div class ="article_date">
                <div>Email: </div>
                <div>{post.email}</div>
              </div>
              <div class ="article_date">
                <div>Name: </div>
                <div>{post.name}</div>
              </div>
              <div class ="article_date">
                <div>Maked: </div>
                <div>{post.maked ? 'maked already': 'not maked yet'}</div>
              </div>
              <div>{post.tasktext}</div>
              {
                ((localStorage.getItem('login')==='admin@admin')&&(localStorage.getItem('password')==='123')) ?                   
                  <div class ="article_buttons">
                    <div>
                      <button class="btn btn-warning"><Link to={`/update/${this.props.posts[index]._id}`}>Update<i class="glyphicon glyphicon-edit"></i></Link></button>
                    </div>
                    <div>
                      <button class="btn btn-danger" onClick={this.onDelete.bind(this,index)}>Delete<i class="fa fa-trash-o" aria-hidden="true"></i></button>
                    </div>
                  </div>: <div/>
              }  
              </div>
      });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Task List &nbsp;
              {localStorage.getItem('jwtToken') &&
                <button class="btn btn-primary" onClick={this.logout}>Logout</button>
              }
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Add Task</Link></h4>
            <button 
              class="btn btn-default"
              onClick={() => this.sortBy('name',currentTodos)} >Sort by name</button>
            <button 
              class="btn btn-default"
              onClick={() => this.sortBy('makes',currentTodos)}>Sort by status</button>
            <button 
              class="btn btn-default"
              onClick={() => this.sortBy('email',currentTodos)}>Sort by email</button>
            <div>
              {renderTodos}
            </div>
            <ul>
              {renderPageNumbers}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  posts: state.posts.postss
});

export default connect(mapStateToProps, { fetchPosts, deletePost })(App);
