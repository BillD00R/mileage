import React from "react";

import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import useStyles from './styles';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Auth from "./components/Auth";
import EditRide from "./components/EditRide";
import UpdateMileage from "./components/UpdateMileage";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/edit" exact component={EditRide} />
          <Route path="/update" exact component={UpdateMileage} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
