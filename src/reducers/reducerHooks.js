export const initialState = {
  posts: []
};
  
export const HooksReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_POSTS:
    return {
      ...state,
      posts: action.payload
    };
  case DELETE_POST:
    return {
      ...state,
      posts: action.payload
    };
  case 'NEW_POST':
    return {
      ...state,
      posts: state.posts.concat(action.payload)
    };
  case UPDATE_POST:
    return {
    ...state,
    posts: state.posts.map( (item, index) => {
    if(index !== action.payload._id) {
    return item;
    }
    return {
    ...item,
    ...action.payload
    };
  })
  };
  default:
    return state;
  }
}