import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '../Grid/Grid';
import './History.css';
import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react';
import {fetchUserHistory} from '../../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '100%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));


const History = (props) => {

    useEffect(() => dispatch(fetchUserHistory()), []);
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const dispatch = useDispatch();
    const userHistory = useSelector(state => state.reducer.userHistory)
    const savedTime = useSelector(state => state.reducer.savedTime)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const toDisplay = userHistory.map( el => {
        let left = (
            <div className="card text-center Scrollable">
                  <div className="card-body">
                      <h5 className="card-title">Shorter version</h5>
                      <p><b>Total characters: {el.prediction.length}</b></p>
                      <p className="card-text">
                          {el.prediction}
                      </p>
                  </div>
              </div>
        );
        let right = (
            <div className="card text-center Scrollable">
                  <div className="card-body">
                      <h5 className="card-title">Full text</h5>
                      <p><b>Total characters: {el.content.length}</b></p>
                      <p className="card-text">
                          {el.content}
                      </p>
                  </div>
              </div>
        );
        return (
            <Accordion expanded={expanded === el.id} onChange={handleChange(el.id)}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={el.id + "bh-content"}
                id={el.id+"bh-header"}
                >
                <Typography className={classes.heading}>{el.prediction.slice(0, 100) + "..."}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    <Grid left={left} right={right}/>
                </Typography>
                </AccordionDetails>
            </Accordion>
        );
    })

    return (
        <div className={classes.root} style={{padding:'24px'}}>
            <div className="card text-white bg-warning mb-3">
                <div className="card-header">So far, by making your texts shorter you have saved:</div>
                    <div className="card-body">
                        <h5 className="card-title">{parseInt(savedTime/60) ? parseInt(savedTime/60) : 0} minutes</h5>
                    </div>
            </div>
            {toDisplay}
        </div>
    );
}

export default History;
