import React from "react";
import { observer } from "mobx-react-lite";
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import { deleteRide } from "../../../api/Rides";

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
      <CardMedia className={classes.media} image={ride.selectedFile} title={ride.name} />
      <div className={classes.overlay}>
        <Typography variant="h6">{ride.mileage}</Typography>
      </div>
      {(user?.result?.googleId === ride?.creator || user?.result?._id === ride?.creator || true) && (
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
      {/* <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {ride.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div> */}
      <Typography className={classes.title} variant="h5" gutterBottom>
        {ride.name}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {ride.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {(user?.result?.googleId === ride?.creator || user?.result?._id === ride?.creator || true) && (
          <Button
            size="small"
            color="secondary"
            onClick={() =>
              deleteRide(ride._id)
                .then((answer) => {
                  rides.setList(rides.list.filter((ride) => ride._id !== answer));
                })
                .catch((e) => {
                  console.log(e);
                })
            }
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
});

export default Ride;
