import React from 'react';

const TextArea = (props) => (
            <textarea 
                className="form-control" 
                id="exampleFormControlTextarea1" 
                rows={props.rows} 
                placeholder={props.holder}></textarea>
);

export default TextArea;