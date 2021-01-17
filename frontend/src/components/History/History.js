import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '../Grid/Grid';
import './History.css';

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
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const data ={ 
        history: [
                    {id: 1,  short: "Historically, a wide range of different programming languages and environments have been used to enable machine learning research and application development. However, as the general-purpose Python language has seen a tremendous growth of popularity within the scientific computing community within the last decade, most recent machine learning and deep learning libraries are now Python-based. With its core focus on readability, Python is a high-level interpreted programming language, which is widely recognized for being easy to learn, yet still able to harness the power of systems-level programming, languages when necessary. Aside from the benefits of the language itself, the community around the available tools and libraries make Python particularly attractive for workloads in data science, machine learning, and scientific computing. According to a recent KDnuggets poll that surveyed more than 1800 participants for ", long: "Historically, a wide range of different programming languages and environments have been used to enable machine learning research and application development. However, as the general-purpose Python language has seen a tremendous growth of popularity within the scientific computing community within the last decade, most recent machine learning and deep learning libraries are now Python-based. With its core focus on readability, Python is a high-level interpreted programming language, which is widely recognized for being easy to learn, yet still able to harness the power of systems-level programming, languages when necessary. Aside from the benefits of the language itself, the community around the available tools and libraries make Python particularly attractive for workloads in data science, machine learning, and scientific computing. According to a recent KDnuggets poll that surveyed more than 1800 participants for preferences in analytics, data science, and machine learning, Python maintained its position at the top of the most widely used language in 2019 [4]. ‘Unfortunately, the most widely used implementation of the Python compiler and interpreter, CPython, executes CPU-bound code in a single thread, and its multiprocessing packages come with other significant performance trade-offs. An alternative to the CPython implementation of the Python language is PyPy [5]. PyPy isa just-in-time (JIT) compiler, unlike CPython’s interpreter, capable of making certain portions of Python code run faster. According to PyPy’s own benchmarks, it runs code four times faster than Python, on average [6]. Unfortunately, PyPy does not support recent versions of Python (supporting 3.6 as of this, writing, compared to the latest 3.8 stable release). Since PyPy is only compatible with a selected pool of Python libraries', it is generally viewed as unattractive for data science, machine learning, and deep learning. The amount of data being collected and generated today is massive, and the numbers continue to grow at record rates, causing the need for tools that are as performant as they are easy to use. The most common approach for leveraging Python’s strengths, such as ease of use while ensuring computational efficiency, is to develop efficient Python libraries that implement lower-level code written in statically typed languages such as Fortran, C/C++, and CUDA. In recent years, substantial efforts are being spent on the development of such performant yet user-friendly libraries for scientific computing and machine learning. The Python community has grown significantly over the last decade, and according to a GitHub report, the main driving force behind Python's growth is a speedily-expanding community of data science professionals and hobbyists? This is owed in part to the ease of use that languages like Python and its supporting ecosystem have created. It is also owed to the feasibility of deep learning, as well as the growth of cloud infrastructure and scalable data processing solutions capable of handling massive data volumes, which make once-intractable workflows possible in a reasonable amount of time. These simple, scalable, and accelerated computing capabilities have enabled an insurgence of useful digital resources that are helping to further mold data science into its own distinct field, drawing individuals from many different backgrounds and disciplines. With its first launch in 2010 and purchase by Google in 2017, Kaggle has become one of the most diverse of these communities, bringing together novice hobbyists with some of the best data scientists and researchers in over 194 countries. Kaggle allows companies to host competitions for challenging machine learning problems being faced in industry, where members can team up and compete for prizes. The competitions often result in public datasets that can aid further research and learning. In addition, Kaggle provides instructional materials and a collaborative social environment"},
                    {id: 2,  short: "yeah this has been shorten", long: "this is the longer equiwalent"},
                    {id: 3,  short: "test test test", long: "loooong text that has been shorten"},
                    {id: 4,  short: "yeah this has been shorten", long: "this is the longer equiwalent"},
                    {id: 5,  short: "test test test", long: "loooong text that has been shorten"},
                    {id: 6,  short: "yeah this has been shorten", long: "this is the longer equiwalent"}
                ],
        savedTime: 36
    };

    const toDisplay = data.history.map( el => {
        let left = (
            <div className="card text-center Scrollable">
                  <div className="card-body">
                      <h5 className="card-title">Shorter version</h5>
                      <p><b>Total characters: {el.short.length}</b></p>
                      <p className="card-text">
                          {el.short}
                      </p>
                  </div>
              </div>
        );
        let right = (
            <div className="card text-center Scrollable">
                  <div className="card-body">
                      <h5 className="card-title">Full text</h5>
                      <p><b>Total characters: {el.long.length}</b></p>
                      <p className="card-text">
                          {el.long}
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
                <Typography className={classes.heading}>{el.short.slice(0, 100) + "..."}</Typography>
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
        <div className={classes.root}>
            <div className="card text-white bg-warning mb-3">
                <div className="card-header">So far, by making your texts shorter you have saved:</div>
                    <div className="card-body">
                        <h5 className="card-title">{data.savedTime} minutes</h5>
                    </div>
            </div>
            {toDisplay}
        </div>
    );
}

export default History;
