import React, { useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { observer } from "mobx-react-lite";

// import rides from "../../store/Rides";
import Ride from "./Ride/Ride";
import makeStyles from "./styles";

import { useMainContext } from "../../context";

const Rides = observer(() => {
  const classes = makeStyles();

  const { rides } = useMainContext();

  return !rides.list.length ? (
    <CircularProgress />
  ) : (
    <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
      {rides.list.map((ride) => (
        <Grid key={ride._id} item xs={12} sm={6}>
          <Ride ride={ride} />
        </Grid>
      ))}
    </Grid>
  );
});

export default Rides;
