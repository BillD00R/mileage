import React from "react";
import { observer } from "mobx-react-lite";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";

import makeStyles from "./styles";

const Ride = observer(({ ride }) => {
  const classes = makeStyles();
  return (
    <Card className={classes.card} key={ride.id}>
      <CardMedia
        className={classes.media}
        image={"https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=689&q=80"}
        title={ride.name}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{ride.name}</Typography>
        <Typography variant="body2">{ride.mileage}</Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {ride.consumption}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {ride.mileage}
        </Typography>
      </CardContent>
      {/* <CardActions className={classes.cardActions}>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions> */}
    </Card>
  );
});

export default Ride;
