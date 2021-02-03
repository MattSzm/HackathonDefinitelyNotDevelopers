import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../Spinner/Spinner';
import { useSelector } from 'react-redux';

// /Aby użyć -> <Backdrop open={"true"}/>


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function SimpleBackdrop(props) {
  const classes = useStyles();
  const loading = useSelector(state => state.reducer.isLoading)

  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <Spinner/>
      </Backdrop>
    </div>
  );
}