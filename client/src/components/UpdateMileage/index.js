import { Button, FormControlLabel, Paper, Switch, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import useStyles from "./styles";
import { updateRide } from "../../api/Rides.js";

import { useMainContext } from "../../context";
import { useHistory } from "react-router";

const UpdateMileage = observer(() => {
  const classes = useStyles();
  const history = useHistory();

  const { rides } = useMainContext();

  const ride = rides.current;
  const [rideData, setRideData] = useState({ ...ride, trip: "", lastRefill: "", initialMileage: ride?.mileage });
  const [isTrip, setIsTrip] = React.useState(false);
  const [isRefill, setIsRefill] = React.useState(true);

  useEffect(() => {
    if (ride) setRideData({ ...ride, trip: "", lastRefill: "", initialMileage: ride.mileage });
  }, [ride]);

  if (!rideData) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please, choose some ride to update
        </Typography>
      </Paper>
    );
  }

  const clear = () => {
    rides.setCurrent(null);
    history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rides.current?._id) {
      if (isRefill && Number(rideData.trip) > 0) {
        console.log(true);
        rideData.consumption = (Number(rideData.lastRefill) / Number(rideData.trip)) * 100;
      }
      console.log(`initial mileage: ${rideData.initialMileage}`);
      console.log(`trip: ${rideData.trip}`);
      console.log(`total mileage: ${rideData.mileage}`);
      console.log(`last refill: ${rideData.lastRefill}`);
      console.log(`consumption: ${rideData.consumption}`);
      updateRide(rides.current?._id, { ...rideData }, rides)
        .then((updatedRide) => {
          rides.list.map((ride) => (ride._id === updatedRide._id ? ride : updatedRide));
          history.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const setMileage = (value) => {
    isTrip
      ? setRideData({ ...rideData, trip: value, mileage: Number(rideData.initialMileage) + Number(value) })
      : setRideData({ ...rideData, mileage: value, trip: Number(value) - Number(rideData.initialMileage) });
  };

  const setConsumption = (value) => {
    isRefill ? setRideData({ ...rideData, lastRefill: value }) : setRideData({ ...rideData, consumption: value });
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">Updating Mileage Data</Typography>
        <Typography variant="h6">{rideData.name}</Typography>

        <FormControlLabel control={<Switch checked={isTrip} onChange={setIsTrip((prev) => !prev)} />} label="Trip" />

        <TextField
          name="mileage"
          variant="outlined"
          type="number"
          label={isTrip ? "Trip Mileage" : "Total Mileage"}
          fullWidth
          value={isTrip ? rideData.trip : rideData.mileage}
          onChange={(e) => setMileage(e.target.value)}
        />

        <FormControlLabel control={<Switch checked={isRefill} onChange={setIsRefill((prev) => !prev)} />} label="Fuel amount" />
        <TextField
          name="consumption"
          variant="outlined"
          label={isRefill ? "Fuel amount" : "Fuel consumption"}
          fullWidth
          value={isRefill ? rideData.lastRefill : rideData.consumption}
          onChange={(e) => setConsumption(e.target.value)}
        />

        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
          Submit
        </Button>

        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
});

export default UpdateMileage;
