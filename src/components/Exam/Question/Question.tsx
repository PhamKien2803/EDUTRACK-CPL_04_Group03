import React, { useState } from 'react';
import '../../../Sass/QestionQuiz.scss'
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";


function Question(props) {
    const { index, data } = props;
    console.log('check data', data)
    return (
        <div className='Question-container'>
            <div className="title">
                <h5>Question {index + 1}</h5>
            </div>
            <div className="q-content">
                <div className="image">
                    <img src={data?.image} alt="" />
                </div>
                <div className="q-description">
                    <h6>{data?.content}</h6>
                </div>
                <div className="q-answer">
                    <FormGroup>
                        {
                            data?.answer.map(answer => (
                                <FormControlLabel control={<Checkbox />} label={answer} />
                            ))
                        }
                    </FormGroup>
                </div>
            </div>
        </div>
    );
}

export default Question;