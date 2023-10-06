import { FETCH_ALL, CREATE, UPDATE, DELETE, } from '../constants/actionTypes';

const postsReducer = (posts = [], action) => {
    switch (action.type) {
        case DELETE:
            console.log('DELETE action', action.payload);

            return posts.filter((post) => post._id !== action.payload);
        case UPDATE :
            console.log('UPDATE action', action.payload);

            return posts.map((post) => post._id === action.payload._id ? action.payload : post)
        case FETCH_ALL:
            console.log('FETCH_ALL action', action.payload);

            return action.payload;
        case CREATE:
            console.log('CREATE action', action.payload);
            return [...posts, action.payload];
        default:
            return posts;
    }
};

export default postsReducer;
