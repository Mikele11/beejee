import { FETCH_POSTS, NEW_POST, UPDATE_POST, DELETE_POST } from '../actions/types';

const initialState = {
  postss: []
};
export default function(state = initialState, action) {

  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        postss: action.payload
      };
    case DELETE_POST:
      return {
        ...state,
        postss: action.payload
      };  
    case NEW_POST:
      return {
        ...state,
        postss: state.postss.concat(action.payload)
      };  
    case UPDATE_POST:
      return {
        ...state,
        postss: state.postss.map( (item, index) => {
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
