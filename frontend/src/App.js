import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import Grid from './components/Grid/Grid';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { loadUser, predictText, fetchHistory } from './store/actions';
import store from './store/store';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const drawerWidth = 64;

// const useStyles = makeStyles((theme) => ({
//     content: {
//         backgroundColor: 'white',
//         flexGrow: 1,
//         padding: theme.spacing(2),
//         color: '#ffffff',
//         transition: theme.transitions.create('margin', {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//         }),
//         marginLeft: 64,
//         height: '100%'
//     },
//     plot: {
//         height: '100%',
//         width: '100%'
//     }
// }));

const classes = {
  content: {
    backgroundColor: 'white',
    flexGrow: 1,
    // padding: theme.spacing(2),
    color: '#ffffff',
    // transition: theme.transitions.create('margin', {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.leavingScreen,
    // }),
    marginLeft: 64,
    height: '100%'
  },
  plot: {
      height: '100%',
      width: '100%'
  }
}

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
    store.dispatch(predictText());
    store.dispatch(fetchHistory());
  }

  render() {
    return (
      <div className="App">
      <Layout>
      </Layout>
      <div className={classes.content}>   
        <Switch>
              <Route exact path="/" render={() => (
                <Redirect to="/temp" />
              )} />
              <Route exact path="/home" component={Grid}></Route>
        </Switch>
      </div>
    </div>
    );
  }
}

// export default function App() {
//   useEffect(() => dispatch(loadUser()));

//   const dispatch = useDispatch();
//   const classes = useStyles();

//   return (
//     <div className="App">
//       <Layout>
//       </Layout>
//       <div className={classes.content}>   
//         <Switch>
//               <Route exact path="/" render={() => (
//                 <Redirect to="/temp" />
//               )} />
//               <Route exact path="/home" component={Grid}></Route>
//         </Switch>
//       </div>
//     </div>
//   );
// }


const mapStateToProps = state => ({
  isAuth: state.reducer.isAuthenticated
});

export default connect(mapStateToProps)(App);