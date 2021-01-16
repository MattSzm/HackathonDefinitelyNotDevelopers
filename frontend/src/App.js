import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import Grid from './components/Grid/Grid';
import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 64;

const useStyles = makeStyles((theme) => ({
    content: {
        backgroundColor: 'white',
        flexGrow: 1,
        padding: theme.spacing(2),
        color: '#ffffff',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 64,
        height: '100%'
    },
    plot: {
        height: '100%',
        width: '100%'
    }
}));

export default function App() {

  const classes = useStyles();

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