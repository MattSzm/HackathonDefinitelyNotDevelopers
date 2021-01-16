import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import './Grid.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}));

export default function FullWidthGrid(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Grid container spacing={3} className="Grid">
            <Grid item xs={12} md={6}>
                {props.left}
            </Grid>
            <Grid item xs={12} md={6}>
                {props.right}
            </Grid>
      </Grid>
    </div>
  );
}