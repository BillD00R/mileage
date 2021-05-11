import React from "react";
import { observer } from "mobx-react-lite";
import { Card, CardContent, CardMedia, Typography, Button } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import makeStyles from "./styles";
import { useMainContext } from "../../../context";
import { useHistory } from "react-router";

const Ride = observer(({ ride }) => {
  const classes = makeStyles();

  const history = useHistory();

  const { rides } = useMainContext();

  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        onClick={() => {
          if (user?.result?.googleId === ride?.owner || user?.result?._id === ride?.owner) {
            rides.setCurrent(ride);
            history.push("/update");
          }
        }}
        image={ride.selectedFile}
        title={ride.name}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{ride.name}</Typography>
        <Typography variant="body2">{ride.mileage}</Typography>
      </div>
      {(user?.result?.googleId === ride?.owner || user?.result?._id === ride?.owner) && (
        <div className={classes.overlay2}>
          <Button
            onClick={() => {
              rides.setCurrent(ride);
              history.push("/edit");
            }}
            style={{ color: "white" }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      )}
      <Typography className={classes.title} variant="h5" gutterBottom>
        {ride.consumption}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {ride.description}
        </Typography>
      </CardContent>
    </Card>
  );
});

export default Ride;
