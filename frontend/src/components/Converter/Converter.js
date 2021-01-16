import React from 'react';
import TextArea from '../TextArea/TextArea';
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
import {predictFile} from '../../store/actions';
import {useDispatch} from 'react-redux';
import ProgBar from './ProgBar';
import * as progressHandlers from './ProgBar';
import PropTypes from 'prop-types';
import {withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import InputIcon from '@material-ui/icons/Input';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import StepConnector from '@material-ui/core/StepConnector';
import './Converter.css';


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
      input: {
        display: 'none',
      },
  }));

const Converter = (props) => {
    const classes = useStyles();
    const [file, setFile] = React.useState();
    const [type, setType] = React.useState('');
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setType(event.target.value);
        handleFstToScd();
    };

    const handleSubmitProcessing = (event) => {
        handleScdToThd();
        dispatch(predictFile(file));
    }

    const handleFinish = (event) => {
        handleReset()
    }

    const handleDelete = (event) => {
        handleReset()
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
    };


    const stepsPath = (
        <div className="card text-left DesktopOnly">
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

        reader.onloadend = () => {
            setFile({
                ...file,
                selectedImage: img,
                imagePreviewUrl: reader.result
            });
        }
        reader.readAsDataURL(img);

        console.log(img);
    }


    let userInput = null;
    if(type === 'text'){
        userInput = <TextArea rows={10} holder="Enter your text here..."/>
    }else if (type ==='file'){
        userInput = (
            <div className="card text-right">
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

    const left = (
        <div>
            <div className="card text-left">
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

            {userInput}

            <br/>
            <div className="card text-right">
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
    );

    const right = (
        <div>
            <TextArea rows={10} holder=""/>
            <br/>
            <div className="card text-right">
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
            </div>
        </div>
    );

    return(
        <div>  
            {stepsPath}<br/>
            <Grid left={left} right ={right}/>
        </div>
        
    );
}

export default Converter;