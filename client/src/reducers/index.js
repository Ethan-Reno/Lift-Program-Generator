// Reducers produce the state of an application
// The only way to change the state is by sending a signal to the store
// This signal is "dispatching" an action
// Actions are objects with two properties: type and payload.
// Type drives how the state should change and it's always required by Redux
// Payload describes what should change and can be ommited if no data to save
// Best practice is to wrap every action within a function

const initialState = {
  articles: []
};

function rootReducer(state = initialState, action) {
  // initial state is passed as a default parameter
  return state;
};

export default rootReducer;