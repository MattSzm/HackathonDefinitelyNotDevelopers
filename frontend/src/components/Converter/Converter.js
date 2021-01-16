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

const useStyles = makeStyles((theme) => ({
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
    };

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
                        endIcon={<SendIcon/>}
                        onClick={() => dispatch(predictFile(file))}>
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
                        className={classes.button}
                        endIcon={<SaveIcon/>}>
                        Save it, I'm satisfied
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
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
            <Grid left={left} right ={right}/>
        </div>
        
    );
}

export default Converter;