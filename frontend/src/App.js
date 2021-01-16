import './App.css';
import Layout from './components/Layout/Layout';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Converter from './components/Converter/Converter';
import History from './components/History/History';
import Stats from './components/Stats/Stats';

const drawerWidth = 64;

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        color: 'black',
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
        <Switch>
              <Route exact path="/" component={Converter} />
              <Route exact path="/history" component={History} />
              <Route exact path="/statistics" component={Stats} />
        </Switch>
      </div>
    </div>
  );
}