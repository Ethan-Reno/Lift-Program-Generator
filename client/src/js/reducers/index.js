// Reducers produce the state of an application
// The only way to change the state is by sending a signal to the store
// This signal is "dispatching" an action
// Actions are objects with two properties: type and payload.
// Type drives how the state should change and it's always required by Redux
// Payload describes what should change and can be ommited if no data to save
// Best practice is to wrap every action within a function

// When an action is dispatched, the store forwards a message (the action object) to the reducer
// The reducer produces the next state, eventually merging the action payload into the new state

import { ADD_ARTICLE } from "../constants/action-types";

const initialState = {
  articles: []
};


// avoiding mutations in Redux:
  // use concat, slice, or the spread operator for arrays
  // use Object.assign or object spread of objects
function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  return state;
};

export default rootReducer;