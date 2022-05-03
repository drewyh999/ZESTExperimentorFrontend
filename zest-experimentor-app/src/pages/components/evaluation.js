import React from 'react'
import CodeEvaluation from './questions/code_evaluation'
import Axios from 'axios'
import {Box, CircularProgress} from "@mui/material";
import BareQuestion from "./questions/bare_question";

class Evaluation extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            done:false,
            mode:this.props.mode,
            url:'https://localhost:8443/'+this.props.mode,
            questionEntities:null
        }
    }
    componentDidMount(){
        Axios.post(this.state.url,[],{withCredentials: true}).then((res) => {
            this.setQuestion(res.data);
            console.log(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    setQuestion(newEntities){
        this.setState({questionEntities:newEntities});
        console.log("The current question entities are" + this.state.questionEntities);
        if(newEntities === null){
            this.setState({done:true});
        }
    }

    processQuestions(){
        if(this.state.done){
            return (
                <Box sx={{textAlign:'center'}}>
                    <h1> Thank you for your participation! </h1>
                </Box>
            );
        }
        if(this.state.questionEntities === null){
            return(
                <CircularProgress />
            );
        }
        else if(this.state.questionEntities[0]['@type'] === "CodeEvaluation"){
            return <CodeEvaluation key={Date.now()} url={this.state.url} questionEntities={this.state.questionEntities}
                                  getNewQuestions={this.setQuestion.bind(this)} />
        }
        else{
            return <BareQuestion key={Date.now()} url={this.state.url} questionEntities={this.state.questionEntities}
                                 getNewQuestions={this.setQuestion.bind(this)} />
        }
    }


    render(){
        return(
            <div style={{ width: '100%' ,height:'100%'}}>
                <div align={"center"}>
                    <h1>This is the evaluation process</h1>
                </div>
                {this.processQuestions()}
            </div>
        )
    ;}
}

export default Evaluation