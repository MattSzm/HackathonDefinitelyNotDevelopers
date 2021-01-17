import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useSelector, useDispatch} from 'react-redux'
import {useEffect} from 'react';
import {fetchUserHistory} from '../../store/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
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

    const dataDisplayed = userHistory.map( el => {
        return (
            <Accordion expanded={expanded === el.id} onChange={handleChange(el.id)}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={el.id + "bh-content"}
            id={el.id+"bh-header"}
            >
            <Typography className={classes.heading}>{el.prediction}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
                {el.content}
            </Typography>
            </AccordionDetails>
        </Accordion>
        )
    })

    return (
        <div className={classes.root}>
            <div className="card text-white bg-warning mb-3">
                <div className="card-header">So far, by making your texts shorter you have saved:</div>
                    <div className="card-body">
                        <h5 className="card-title">{parseInt(savedTime/60) ? parseInt(savedTime/60) : 0} minutes</h5>
                    </div>
            </div>
            {dataDisplayed}
        </div>
    );
}

export default History;
