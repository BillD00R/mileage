import React from "react";
import { Grid } from "@material-ui/core";
import { observer } from "mobx-react-lite";

import rides from "../../store/Rides";
import Ride from "./Ride/Ride";
import makeStyles from "./styles";

const Rides = observer(() => {
  const classes = makeStyles();

  return (
    <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
      {rides.list.map((ride) => (
        <Grid key={ride.id} item xs={12} sm={6}>
          <Ride ride={ride} />
        </Grid>
      ))}
    </Grid>
  );
});

export default Rides;
