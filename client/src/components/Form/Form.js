import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { observer } from "mobx-react-lite";
import useStyles from "./styles";
import { createRide, updateRide } from "../../api/Rides.js";

import { useMainContext } from "../../context";
import { useHistory } from "react-router";

const Form = observer(() => {
  const initialRideData = { name: "", description: "", mileage: "", selectedFile: "" };
  const [rideData, setRideData] = useState(initialRideData);
  const classes = useStyles();
  const history = useHistory();
  // const ride = useSelector((state) => (currentId ? state.rides.find((p) => p._id === currentId) : null));
  const user = JSON.parse(localStorage.getItem("profile"));

  const { rides } = useMainContext();

  useEffect(() => {
    if (rides.current) setRideData(rides.current);
    console.log(rideData);
    console.log(rides.current);
  }, [rideData, rides.current]);

  const clear = () => {
    setRideData(initialRideData);
    rides.setCurrent(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rides.current._id !== 0) {
      updateRide(rides.current?._id, { ...rideData }, rides)
        .then((updatedRide) => {
          rides.list.map((ride) => (ride._id === updatedRide._id ? ride : updatedRide));
          history.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      createRide({ ...rideData }, rides)
        .then((newRide) => {
          rides.list.push(newRide);
          history.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    }
    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please, sign in to make things
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{rides.current?._id ? "Editing" : "Creating"} a Ride</Typography>

        <TextField name="name" variant="outlined" label="Ride Name" fullWidth value={rideData.title} onChange={(e) => setRideData({ ...rideData, name: e.target.value })} />

        <TextField
          name="description"
          variant="outlined"
          multiline
          rows={4}
          label="Description"
          fullWidth
          value={rideData.description}
          onChange={(e) => setRideData({ ...rideData, description: e.target.value })}
        />

        <TextField name="mileage" variant="outlined" label="Mileage" fullWidth value={rideData.mileage} onChange={(e) => setRideData({ ...rideData, mileage: e.target.value })} />

        <div className={classes.fileInput}>
          {" "}
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setRideData({ ...rideData, selectedFile: base64 })} />
          <img src={rideData.selectedFile} />{" "}
        </div>

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

export default Form;
