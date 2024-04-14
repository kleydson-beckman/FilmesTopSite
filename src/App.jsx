import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Screen from "./pages/Screen/Screen";
import Infos from "./pages/Informacoes/infos";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Outlet />}>
          {/* Renderizar a tela principal quando a rota for '/' */}
          <Route index element={<Screen />} />
          {/* Renderizar a página de informações quando a rota for '/infos/:id' */}
          <Route path="/infos/:id" element={<Infos />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
