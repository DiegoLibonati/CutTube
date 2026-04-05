import { HashRouter } from "react-router-dom";

import { CutTubeRouter } from "@/router/CutTubeRouter";

function App() {
  return (
    <HashRouter>
      <CutTubeRouter></CutTubeRouter>
    </HashRouter>
  );
}

export default App;
