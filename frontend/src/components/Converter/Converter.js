import React from 'react';
import Grid from '../Grid/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InputLabel from '@material-ui/core/InputLabel';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {onUpdateSummary, predictFile, predictText, trainAlgo} from '../../store/actions';
import { useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import InputIcon from '@material-ui/icons/Input';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import StepConnector from '@material-ui/core/StepConnector';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import './Converter.css';
import LinkList from '../LinkList/LinkList';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    completed: {
      '& $line': {
        backgroundImage:
          'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: '#eaeaf0',
      borderRadius: 1,
    },
  })(StepConnector);
  
  const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: '#ccc',
      zIndex: 1,
      color: '#fff',
      width: 50,
      height: 50,
      display: 'flex',
      borderRadius: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    active: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
  });
  
  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;
  
    const icons = {
      1: <InputIcon />,
      2: <AddToQueueIcon />,
      3: <DoneOutlineIcon />,
    };
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }
  
  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };
  
  function getSteps() {
    return ['Select input type', 'Add input in choosen type', 'Enjoy the result & save it for later'];
  }

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
      },
      instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
    button: {
      margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
      },
    selectEmpty: {
        marginTop: theme.spacing(2),
      },
    input :{
      display: 'none'
    }
  }));

const Converter = (props) => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.reducer);
    const classes = useStyles();
    const [file, setFile] = React.useState();
    const [type, setType] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [filename, setFilename] = React.useState('');
    const [text, setText] = React.useState('');
    const [isLoaded, setIsLoaded] = React.useState(false);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };

    const handleChange = (event) => {
        setType(event.target.value);
        handleFstToScd();
    };

    const handleSubmitProcessing = (event) => {
        handleScdToThd();
        if (type === "text") {
            dispatch(predictText(text));
        } else {
            dispatch(predictFile(file));}
        setIsLoaded(true);
    }

    const handleFinish = (event) => {
        dispatch(trainAlgo(state.summaryID, state.summary));
        handleReset()
        setIsLoaded(false)
    }

    const handleDelete = (event) => {
        handleReset()
        dispatch({type: "TRAIN_ALGO_SUCCESS"})
        setIsLoaded(false)
    }

    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
  
    const handleFstToScd = () => {
      setActiveStep((prevActiveStep) => 1);
    };
  
    const handleScdToThd = () => {
      setActiveStep((prevActiveStep) => 2);
    };
  
    const handleReset = () => {
      setActiveStep(0);
      setFilename('');
      setFile('');
      setText('');
      setType('');
    };

    const onInputChandler = (event) => {
      setText(event.target.value);
    }

    const onInputChange = (event) => {
      dispatch(onUpdateSummary(event.target.value));
    }


    const stepsPath = (
        <div className="card text-center DesktopOnly">
                <div className="card-body">
                    <p className="card-text"></p>
                    <div className={classes.root}>
                        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                        {steps.map((label) => (
                            <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                            </Step>
                        ))}
                        </Stepper>
                    </div>
                </div>
            </div>
    );

    const imageSelectedHandler = event => {
        let reader = new FileReader();
        let img = event.target.files[0];
        setFile(img)
        setFilename(img.name);
        handleScdToThd();
        reader.readAsDataURL(img);
    }

    let userInput = null;
    if(type === 'text'){
        userInput = <div>
            <textarea 
              className="form-control" 
              id="exampleFormControlTextarea1" 
              rows={10} 
              placeholder={"Enter your text here..."}
              value={text}
              onChange={(event) => onInputChandler(event)}>
            </textarea>
        </div>
    }else if (type ==='file'){
        userInput = (
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">Load file:</h5>
                    <div className={classes.root}>
                        <input
                            accept="image/*,application/pdf"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={imageSelectedHandler}
                        />
                        <p>{filename}</p>
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="secondary" component="span" endIcon={<CloudUploadIcon/>}>
                            Upload
                            </Button>
                        </label>
                        </div>
                </div>
            </div>
            
        );
    }

    let left = null;
    let linkList = null;
    if(state.links.length > 0 ){
        linkList = (
          <div>
            <div className="card text-center LinkList">
                  <div className="card-body">
                      <h5 className="card-title">Usefull links - they come from your recently shortened file - we don't want you to lose them!</h5>
                      <p className="card-text"></p>
                      <LinkList linkArray={state.links}/>
                  </div>
              </div>
              <br/>
          </div>
          
        )
    }
    
    if(isLoaded){
      console.log(state);
      left = (
        <div>
          {linkList}
              <div className="card text-center">
                  <div className="card-body">
                      <h5 className="card-title">Check how much time you've saved!</h5>
                      <p className="card-text">
                        Thanks to this app you didn't have to read the whole text - and becouse of that fact you've just saved {Math.round(state.time)} seconds.
                      </p>
                  </div>
              </div>
        </div>
        
      );
    }
    else {
      left = (
        <div>
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">Choose input type:</h5>
                    <p className="card-text"></p>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Input type</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={type}
                                onChange={handleChange}
                                label="Age"
                                >
                            <MenuItem value="">
                                <em>Choose input type</em>
                            </MenuItem>
                            <MenuItem value={'text'}>Text</MenuItem>
                            <MenuItem value={'file'}>PDF/JPG</MenuItem>
                            </Select>
                        </FormControl>
                </div>
            </div><br/>

            {userInput}<br/>
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">Submit and proceed {type}</h5>
                    <p className="card-text"></p>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={handleSubmitProcessing}
                        endIcon={<SendIcon/>}>
                        Let's make it shorter
                    </Button>
                </div>
            </div><br/>
        </div>
    )
  }

    const right = (
        <div>
        <textarea
            value={state.summary}
            className="form-control" 
            id="ex2" 
            placeholder="Soon your text, but leaner and shorter, will be there!"
            rows={10}
            onChange={(event) => onInputChange(event)}>
          </textarea>
            <br/>
            <div className="card text-center">
                <div className="card-body">
                    <h5 className="card-title">Rate and save results (they will be stored in your history)</h5>
                    <p className="card-text"></p>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleFinish}
                        className={classes.button}
                        endIcon={<SaveIcon/>}>
                        Save it, I'm satisfied
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleDelete}
                        className={classes.button}
                        endIcon={<DeleteIcon/>}>
                        Delete fesult 
                    </Button>
                </div>
            </div><br/>
        </div>
    );


    return(
        <div>  
            {stepsPath}<br/>
            <Grid left={left} right ={right}/>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                Your photo has been uploaded!
              </Alert>
            </Snackbar>
        </div>
        
    );
}

export default Converter;