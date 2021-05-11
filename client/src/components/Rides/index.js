import React, { useEffect } from "react";
import { Grid, CircularProgress, Button } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

// import rides from "../../store/Rides";
import Ride from "./Ride";
import makeStyles from "./styles";

import { useMainContext } from "../../context";

const Rides = observer(() => {
  const classes = makeStyles();

  const { rides } = useMainContext();

  const user = JSON.parse(localStorage.getItem("profile"));

  return rides.updating ? (
    <CircularProgress />
  ) : (
    <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
      {rides.list.map((ride) => (
        <Grid key={ride._id} item xs={12} sm={6}>
          <Ride ride={ride} />
        </Grid>
      ))}
      {user && (
        <Button component={Link} to="/edit" variant="contained" color="primary">
          Add Ride
        </Button>
      )}
    </Grid>
  );
});

export default Rides;
