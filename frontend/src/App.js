import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
// import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 64;

const useStyles = makeStyles((theme) => ({
    content: {
        backgroundColor: '#191414',
        flexGrow: 1,
        padding: theme.spacing(3),
        color: '#ffffff',
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: drawerWidth,
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
        {/* <Switch>
              <Route exact path="/" render={() => (
                <Redirect to="/home" />
              )} />
        </Switch> */}
      </div>
    </div>
  );
}