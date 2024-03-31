import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { CutPage } from "../pages/CutPage";

export const CutTubeRouter = (): JSX.Element => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<CutPage></CutPage>}></Route>
        <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
    </HashRouter>
  );
};
