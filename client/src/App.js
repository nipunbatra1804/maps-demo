import React from "react";
import logo from "./logo.svg";
import HomepageLayout from "./components/NavBar/NavBar";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import MapGL from "./components/MapGL/MapGL";
import MapGLMarkers from "./components/MapGLMarkers/MapGLMarkers.jsx";
import MapGLPopUps from "./components/MapGLPopUps/MapGLPopUps.jsx";
import MapDeckGL from "./components/MapDeckGL/MapDeckGL.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <HomepageLayout />
        <Switch>
          <Route path="/home" component={MapGL} />
          <Route path="/markers" component={MapGLMarkers} />
          <Route path="/popups" component={MapGLPopUps} />
          <Route path="/deck" component={MapDeckGL} />
          <Redirect from="/" to="/home" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
