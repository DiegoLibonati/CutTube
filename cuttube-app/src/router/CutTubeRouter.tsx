import { Routes, Route, Navigate } from "react-router-dom";

import CutPage from "@/pages/CutPage/CutPage";

import { PublicRoute } from "@/router/PublicRoute";

export const CutTubeRouter = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<CutPage></CutPage>}></Route>
      </Route>

      <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
    </Routes>
  );
};
