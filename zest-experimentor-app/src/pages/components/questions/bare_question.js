import React from 'react';
import {
    Box, Button,
    Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
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
        this.state= {
            btnLoading: false,
            errorBackDropOpen: false,
            errorText: "",
        }
        this.setState({btnLoading:false,errorBackDropOpen:false});
        this.props.questionEntities.forEach((q) => {
            if(q.questionType === "MULTI_CHOICE"){
                const questionChoices = q.questionChoices;
                const qID = q.id;
                let checkStates = {}
                questionChoices.forEach((q) => checkStates[q] = false);
                let currState = this.state;
                currState[qID] = checkStates;
                this.setState(currState);
            }
            else{
                let currState = this.state;
                currState[q.id] = undefined;
                this.setState(currState);
            }
        });
        console.log(this.state);

    }

    componentDidMount() {
        this.setState({mountedTime:Date.now()});
    }

    handleSingleChange(event, qID){
        let newState = this.state;
        newState[qID] = event.target.value;
        this.setState(newState);
        console.log(this.state);
    }

    handleCheckBoxChange(qID,choice){
        let newState = this.state;
        newState[qID][choice] = !newState[qID][choice];
        this.setState(newState);
    }

    processQuestions(){
        let question_tags_list = [];
        console.log("Processing questions");
        for(let i = 0; i < this.props.questionEntities.length; i ++) {
            const question_type = this.props.questionEntities[i].questionType;
            let question_choices_tags;
            switch (question_type) {
                case 'SCALE_CHOICE': {
                    const questionChoices = this.props.questionEntities[i].questionChoices;
                    question_choices_tags =
                        <Box key={this.props.questionEntities[i].alias + this.props.questionEntities[i].key}>
                            <h2>{this.props.questionEntities[i].questionText}</h2>
                            <FormControl>
                                <RadioGroup
                                    name="radio-buttons-group"
                                    row
                                    value={this.state[this.props.questionEntities[i].id]}
                                    onChange={(event) => this.handleSingleChange(event,this.props.questionEntities[i].id)}
                                >
                                    {
                                        questionChoices.map((choice) =>
                                            <FormControlLabel value={choice}  labelPlacement={"bottom"} control={<Radio/>} label={choice}/>)
                                    }
                                </RadioGroup>
                            </FormControl>
                        </Box>
                    ;
                    question_tags_list.push(question_choices_tags);
                    break;
                }
                case 'SINGLE_CHOICE': {
                    const questionChoices = this.props.questionEntities[i].questionChoices;
                    question_choices_tags =
                        <Box key={this.props.questionEntities[i].alias + this.props.questionEntities[i].key}>
                            <h2>{this.props.questionEntities[i].questionText}</h2>
                            <FormControl>
                                <RadioGroup
                                    name="radio-buttons-group"
                                    value={this.state[this.props.questionEntities[i].id]}
                                    onChange={(event) => this.handleSingleChange(event,this.props.questionEntities[i].id)}
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
                        <Box key={this.props.questionEntities[i].alias + this.props.questionEntities[i].key}>
                            <h2>{this.props.questionEntities[i].questionText}</h2>
                            <TextField label="Your Answer" multiline={true} minRows={10} maxRows={10} fullWidth={true}
                                       value={this.state[this.props.questionEntities[i].id]}
                                       onChange={(event) => this.handleSingleChange(event,this.props.questionEntities[i].id)}/>
                        </Box>
                    question_tags_list.push(question_choices_tags);
                    break;
                }

                case 'MULTI_CHOICE':{
                    const questionChoices = this.props.questionEntities[i].questionChoices;
                    const qID = this.props.questionEntities[i].id;
                    question_choices_tags =
                        <Box key={this.props.questionEntities[i].alias + this.props.questionEntities[i].key}>
                            <h2>{this.props.questionEntities[i].questionText}</h2>
                            <FormGroup>
                                {
                                    questionChoices.map((choice) =>
                                        <FormControlLabel checked={this.state[qID][choice]}
                                                          control={<Checkbox />}
                                                          label={choice}
                                                          onChange={() => this.handleCheckBoxChange(qID,choice)} />)
                                }
                            </FormGroup>
                        </Box>
                    ;
                    question_tags_list.push(question_choices_tags);
                    break;
                }
                default: {
                    question_choices_tags = <h1 key={ i + Date.now()} >Error</h1>
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
        for(let i = 0;i < this.props.questionEntities.length;i ++){
            if(!this.state[this.props.questionEntities[i].id]){
                this.setState({btnLoading:true,errorBackDropOpen:true,errorText:"You have not completed all questions"});
                return;
            }
        }
        this.props.questionEntities.forEach((question) => {
            let answer;
            let reactionTime = Date.now() - this.state.mountedTime;
            if(!(this.state[question.id].constructor === Object)){
                answer = {
                    questionID: question.id,
                    answerText: this.state[question.id],
                    //TODO time here is the time from page is loaded to press the submit button
                    timeSpent: reactionTime
                }
            }
            else{
                let multipleTexts = [];
                Object.keys(this.state[question.id]).forEach((key) =>{
                   if(this.state[question.id][key]){
                       multipleTexts.push(key);
                   }
                });
                answer = {
                    questionID: question.id,
                    answerText: multipleTexts.toString(),
                    timeSpent: reactionTime
                }
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
        <Box sx={{display:"flex",flexDirection:'column',m:10}}>
            <Box sx={{marginBottom:5}}>
                {this.processQuestions()}
            </Box>
            <Box >
                <LoadingButton variant="contained" loading={this.state.btnLoading} endIcon={<SendIcon />} onClick={() => this.handleSubmit()}>
                    Submit
                </LoadingButton>
            </Box>

            <Dialog open={this.state.errorBackDropOpen}>
                <DialogTitle>
                    {"An error seemed to happened"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        {this.state.errorText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {this.setState({errorBackDropOpen:!this.state.errorBackDropOpen,btnLoading:false})}}>OK</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
    }
}

export default BareQuestion