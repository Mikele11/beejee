import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { fetchPosts, deletePost, fetchPostsPagin } from './actions/postActions.js';
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
    // this.props.fetchPosts(); 
    this.props.fetchPostsPagin(1,3); 
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
    this.props.fetchPostsPagin(Number(event.target.id),3); 
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  onDelete(index){
    this.props.deletePost(this.props.posts.list[index]._id); 
  }
  
  render() {
    let {posts} = this.state; 
    let renderTodos = [];
    let pageNumbers = [];
    let renderPageNumbers;
    const responceServer = this.props.posts;
    console.log('responceServer',this.props.posts)
    console.log('posts',posts)
    console.log('this.props',this.props)
      if ((posts.length<1)&&(responceServer.list)) {
        posts = responceServer.list
      }
      console.log('postspostsposts',posts)
      renderTodos = posts.map((post, index) => {
        console.log('post111',post)
        return <section class="article">
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
                        <button class="btn btn-warning"><Link to={`/update/${this.props.posts.list[index]._id}`}>Update<i class="glyphicon glyphicon-edit"></i></Link></button>
                      </div>
                      <div>
                        <button class="btn btn-danger" onClick={this.onDelete.bind(this,index)}>Delete<i class="fa fa-trash-o" aria-hidden="true"></i></button>
                      </div>
                    </div>: <div/>
                }  
               </section>
        });
  
      for (let i = 1; i <= responceServer.pages; i++) {
        pageNumbers.push(i);
      }
  
      renderPageNumbers = pageNumbers.map(number => {
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
              onClick={() => this.sortBy('name',posts)} >Sort by name</button>
            <button 
              class="btn btn-default"
              onClick={() => this.sortBy('makes',posts)}>Sort by status</button>
            <button 
              class="btn btn-default"
              onClick={() => this.sortBy('email',posts)}>Sort by email</button>
            <div>
              {this.props.posts.list? renderTodos: null}
            </div>
            <ul>
              {this.props.posts.list?renderPageNumbers: null}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  fetchPostsPagin: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  posts: state.posts.postss
});

export default connect(mapStateToProps, { fetchPosts, deletePost, fetchPostsPagin })(App);
