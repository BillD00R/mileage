import React from "react";
import { Grow, Grid, Container } from "@material-ui/core";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import Rides from "../Rides/Rides";
import Form from "../Form/Form";
import { useMainContext } from "../../context";
import { fetchRides } from "../../api/Rides";

const Home = observer(() => {
  const { rides } = useMainContext();

  useEffect(async () => {
    fetchRides()
      .then((answer) => {
        rides.setList(answer);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [rides]);

  return (
    <Grow in>
      <Container>
        <Grid container justify="space-between" align="items" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Rides />
          </Grid>
          {/* <Grid item xs={12} sm={4}>
            <Form />
          </Grid> */}
        </Grid>
      </Container>
    </Grow>
  );
});

export default Home;
