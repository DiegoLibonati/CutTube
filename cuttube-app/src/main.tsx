import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "@src/App";

import { store } from "@src/app/store";

import "@src/index.css";

ReactDOM.createRoot(document.getElementById("root")! as HTMLDivElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);
