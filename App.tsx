import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./redux/reducers";
import MovieDB from "./app/Components/MovieDB";

export default function App() {
  // Lager samlet redux store
  const store = createStore(
    reducers,
    // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return (
    <Provider store={store}>
      <MovieDB />
    </Provider>
  );
}
