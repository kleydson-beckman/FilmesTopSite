import React from "react";
import Screen from "./pages/Screen/Screen";
import Infos from "./pages/Infos/infos";
import { Routes, Route, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Screen />} />
          <Route path="/infos/:id" element={<Infos />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
