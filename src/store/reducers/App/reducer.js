export const DEFAULT_STATE = { version: '1.0' };

const App = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
};

export default App;
