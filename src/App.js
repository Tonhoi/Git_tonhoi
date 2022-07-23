import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoute } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  return (
    <Router>
      <Routes>
        {publicRoute.map((route, index) => {
          const Element = route.element;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <DefaultLayout>
                  <Element />
                </DefaultLayout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
