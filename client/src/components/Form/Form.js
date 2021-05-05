import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { createRide, updateRide } from "../../api/Rides.js";

const Form = ({ currentId, setCurrentId }) => {
  const initialRideData = { title: "", message: "", tags: "", selectedFile: "" };
  const [rideData, setRideData] = useState(initialRideData);
  const ride = useSelector((state) => (currentId ? state.rides.find((p) => p._id === currentId) : null));
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (ride) setRideData(ride);
  }, [ride]);

  const clear = () => {
    setRideData(initialRideData);
    setCurrentId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId !== 0) {
      updateRide(currentId, { ...rideData, name: user?.result?.name });
    } else {
      createRide({ ...rideData, name: user?.result?.name });
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
        <Typography variant="h6">{currentId ? "Editing" : "Creating"} a Memory</Typography>

        <TextField name="title" variant="outlined" label="Title" fullWidth value={rideData.title} onChange={(e) => setRideData({ ...rideData, title: e.target.value })} />

        <TextField name="message" variant="outlined" multiline rows={4} label="Message" fullWidth value={rideData.message} onChange={(e) => setRideData({ ...rideData, message: e.target.value })} />

        <TextField name="tags" variant="outlined" label="Tags" fullWidth value={rideData.tags} onChange={(e) => setRideData({ ...rideData, tags: e.target.value.split(",") })} />

        <div className={classes.fileInput}>
          {" "}
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setRideData({ ...rideData, selectedFile: base64 })} />{" "}
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
};

export default Form;
