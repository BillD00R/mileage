import React from "react";

import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import useStyles from './styles';
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Form from "./components/Form/Form";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/edit" exact component={Form} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
