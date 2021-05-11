import React from "react";
import { Grow, Grid, Container } from "@material-ui/core";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";

import Rides from "../Rides";
import EditRide from "../EditRide";
import { useMainContext } from "../../context";
import { fetchRides } from "../../api/Rides";
import makeStyles from "./styles";

const Home = observer(() => {
  const { rides } = useMainContext();

  const user = JSON.parse(localStorage.getItem("profile"));

  const classes = makeStyles();

  useEffect(async () => {
    rides.setUpdating(true);
    fetchRides()
      .then((answer) => {
        rides.setList(answer);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        rides.setUpdating(false);
      });
  }, [rides, user]);

  return (
    <div>
      <Grow in>
        <Container>
          <Grid container justify="space-between" align="items" spacing={3}>
            <Grid item xs={12}>
              <Rides />
            </Grid>
            {/* <Grid item xs={12} sm={4}>
            <Form />
          </Grid> */}
          </Grid>
        </Container>
      </Grow>
      <div className={classes.footer}>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">
          Good Ware
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
});

export default Home;
