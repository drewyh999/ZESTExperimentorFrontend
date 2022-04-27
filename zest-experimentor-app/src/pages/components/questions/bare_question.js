import React from 'react'
import {
    Backdrop,
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from "@mui/icons-material/Send";
import axios from 'axios';

class BareQuestion extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            btnLoading:false,
            errorBackDropOpen:false,
            errorText:""
        }
    }

    componentDidMount() {
        this.setState({btnLoading:false,errorBackDropOpen:false});
        for(let question in this.props.questionEntities){
            console.log(question);
        }
    }

    processQuestions(){
        let question_tags_list = [];
        console.log(this.props.questionEntities)
        for(let i = 0; i < this.props.questionEntities.length; i ++) {
            const question_type = this.props.questionEntities[i].questionType;

            let question_choices_tags;

            switch (question_type) {
                case 'SINGLE_CHOICE': {
                    const questionChoices = this.props.questionEntities[i].questionChoices;
                    question_choices_tags =
                        <Box key={i}>
                            <h2>{this.props.questionEntities[i].questionText}</h2>
                            <FormControl>
                                <RadioGroup
                                    name="radio-buttons-group"
                                >
                                    {
                                        questionChoices.map((choice) =>
                                            <FormControlLabel value={choice}  control={<Radio/>} label={choice}/>)
                                    }
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    ;
                    question_tags_list.push(question_choices_tags);
                    break;
                }
                case 'TEXT': {
                    question_choices_tags =
                        <Box key={i}>
                            <h2>{this.props.questionEntities[i].questionText}</h2>
                            <TextField label="Your Answer" multiline={true} minRows={10} maxRows={10} fullWidth={true}/>
                        </Box>
                    question_tags_list.push(question_choices_tags);
                    break;
                }

                case 'MULTI_CHOICE':{
                    const questionChoices = this.props.questionEntities[i].questionChoices;
                    question_choices_tags =
                        <Box key={i}>
                            <h2>{this.props.questionEntities[i].questionText}</h2>
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
                    question_choices_tags = <h1 key={i} >Error</h1>
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

    handleSubmit(){
        this.setState({btnLoading:true});
        let answers = [];
        this.props.questionEntities.forEach((question) => {
            let answer = {
                questionID: question.id,
                answerText: "asdawd",
                timeSpent: 1000
            }
            answers.push(answer);
        });
        axios.post(this.props.url,answers,{withCredentials: true}).then((res) => {
            console.log('fetching new questions');
            if(res.data) {
                this.props.getNewQuestions(res.data);
            }
            else{
                this.props.getNewQuestions(null);
            }
            this.setState({btnLoading:false});
        }).catch((error) =>{
            this.setState({btnLoading:true,errorBackDropOpen:true,errorText:error});
        });
    }
    render() {
        return(
        <Box sx={{display:"flex",flexDirection:'column',textAlign:'left',m:10}}>
            <Box sx={{marginBottom:5}}>
                {this.processQuestions()}
            </Box>
            <Box sx={{textAlign:'center'}}>
                <LoadingButton variant="contained" loading={this.state.btnLoading} endIcon={<SendIcon />} onClick={() => this.handleSubmit()}>
                    Submit
                </LoadingButton>
            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={this.state.errorBackDropOpen}
                onClick={() => {this.setState({errorBackDropOpen:!this.state.errorBackDropOpen})}}
            >
                <h1>An error seemed to happened {this.state.errorText}</h1>
            </Backdrop>
        </Box>
    );
    }
}

export default BareQuestion