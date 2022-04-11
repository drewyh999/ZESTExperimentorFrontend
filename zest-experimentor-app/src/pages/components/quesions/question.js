import React from 'react'
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

class Question extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            questions:this.props.questions
        }
    }

    processQuestions(){
        let question_tags_list = [];
        for(let i = 0; i < this.props.questions.length; i ++) {
            const question_type = this.props.questions[i].questionType;

            let question_choices_tags;

            switch (question_type) {
                case 'SingleChoice': {
                    const questionChoices = this.props.questions[i].questionChoices;
                    question_choices_tags =
                        <Box>
                            <h2>{this.props.questions[i].questionText}</h2>
                            <FormControl>
                                <RadioGroup
                                    name="radio-buttons-group"
                                    onChange={this.handleChange}>
                                    {
                                        questionChoices.map((choice) =>
                                            <FormControlLabel value={choice} control={<Radio/>} label={choice}/>)
                                    }
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    ;
                    question_tags_list.push(question_choices_tags);
                    break;
                }
                case 'Text': {
                    question_choices_tags =
                        <Box>
                            <h2>{this.props.questions[i].questionText}</h2>
                            <TextField label="Your Answer" multiline={true} minRows={10} maxRows={10} fullWidth={true}/>
                        </Box>
                    question_tags_list.push(question_choices_tags);
                    break;
                }

                case 'MultipleChoices':{
                    const questionChoices = this.props.questions[i].questionChoices;
                    question_choices_tags =
                        <Box>
                            <h2>{this.props.questions[i].questionText}</h2>
                            <FormGroup>
                                {
                                    questionChoices.map((choice) =>
                                        <FormControlLabel control={<Checkbox />} label={choice} />)
                                }
                            </FormGroup>
                        </Box>
                    ;
                    question_tags_list.push(question_choices_tags);
                    break;
                }
                default: {
                    question_choices_tags = <h1>Error</h1>
                    question_tags_list.push(question_choices_tags);
                    break;
                }
            }
        }
        return(
            <div>
                {question_tags_list}
            </div>
        )
    }
    render() {
        return(
        <Box sx={{display:"flex",flexDirection:'column',textAlign:'left'}}>
            <Box sx={{marginBottom:5}}>{this.processQuestions()}</Box>
            <Button variant="contained" endIcon={<SendIcon />}>Submit</Button>
        </Box>
    );
    }
}

export default Question