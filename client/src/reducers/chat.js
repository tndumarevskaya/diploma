const initialState = {
    messages: [],
  };
  
  function chatReducer(state = initialState, action) {
    switch (action.type) {
      case 'ADD_MESSAGE':
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      default:
        return state;
    }
  }
  
  export default chatReducer;