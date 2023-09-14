import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const good = (val) => {
    console.log("you clicked good");
    if (val === "GOOD") {
      store.dispatch({
        type: "GOOD",
      });
    }
    if(val === "OK"){
      store.dispatch({ type: "OK"});
    }
    if (val === "BAD") {
      store.dispatch({
        type:"BAD"
      })
    }
    if (val === "ZERO") {
      store.dispatch({
        type:"ZERO"
      })
    }
  };

  return (
    <div>
      <button onClick={()=>good('GOOD')}>good</button>
      <button onClick={() => good("OK")}>ok</button>
      <button onClick={() => good("BAD")}>bad</button>
      <button onClick={() => good("ZERO")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
