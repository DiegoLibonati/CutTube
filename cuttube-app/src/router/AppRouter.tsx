import { Routes, Route, Navigate } from "react-router-dom";

import { CutPage } from "@src/pages/CutPage/CutPage";

import { CutTubeRoute } from "@src/router/CutTubeRoute";

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<CutTubeRoute />}>
        <Route path="/" element={<CutPage></CutPage>}></Route>
      </Route>

      <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
    </Routes>
  );
};
