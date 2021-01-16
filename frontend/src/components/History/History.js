import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const data ={ 
        history: [
                    {id: 1,  short: "test test test", long: "loooong text that has been shorten"},
                    {id: 2,  short: "yeah this has been shorten", long: "this is the longer equiwalent"},
                    {id: 3,  short: "test test test", long: "loooong text that has been shorten"},
                    {id: 4,  short: "yeah this has been shorten", long: "this is the longer equiwalent"},
                    {id: 5,  short: "test test test", long: "loooong text that has been shorten"},
                    {id: 6,  short: "yeah this has been shorten", long: "this is the longer equiwalent"}
                ],
        savedTime: 36
    };

    const toDisplay = data.history.map( el => {
        return (
            <Accordion expanded={expanded === el.id} onChange={handleChange(el.id)}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={el.id + "bh-content"}
                id={el.id+"bh-header"}
                >
                <Typography className={classes.heading}>{el.short}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    {el.long}
                </Typography>
                </AccordionDetails>
            </Accordion>
        );
    })

    return (
        <div className={classes.root}>
            <div className="card text-white bg-warning mb-3">
                <div className="card-header">So far, by making your texts shorter you have saved:</div>
                    <div className="card-body">
                        <h5 className="card-title">{data.savedTime} hours</h5>
                    </div>
            </div>
            {toDisplay}
        </div>
    );
}

export default History;
