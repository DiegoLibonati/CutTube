import { HashRouter } from "react-router-dom";

import { AppRouter } from "@src/router/AppRouter";

function App(): JSX.Element {
  return (
    <HashRouter>
      <AppRouter></AppRouter>
    </HashRouter>
  );
}

export default App;
