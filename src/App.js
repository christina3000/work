import React, { useReducer } from 'react';


const initialState = { count: 0 };


const actionTypes = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  RESET: 'reset',
};


const counterReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return { count: state.count + 1 };
    case actionTypes.DECREMENT:
      return { count: state.count - 1 };
    case actionTypes.RESET:
      return { count: 0 };
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <h1>Counter: {state.count}</h1>
      <button onClick={() => dispatch({ type: actionTypes.INCREMENT })}>Increment</button>
      <button onClick={() => dispatch({ type: actionTypes.DECREMENT })}>Decrement</button>
      <button onClick={() => dispatch({ type: actionTypes.RESET })}>Reset</button>
    </div>
  );
};

export default Counter;