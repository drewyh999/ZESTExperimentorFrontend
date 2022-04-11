import React from 'react'
import hljs from 'highlight.js';
import {Box} from "@mui/material";

import BareQuestion from './bare_question'


class CodeEvaluation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            questionEntities:[
                {
                    questionID:"adwasdawd",
                    questionText:this.props.questionText,
                    questionChoices: [1,2,3,4,5],
                    questionType:"SingleChoice",
                },
                {
                    questionID:"AAA*!(@!#",
                    questionText:this.props.questionText,
                    questionChoices: [1,2,3,4,5],
                    questionType:"Text",
                }
            ]
        }
    }

    componentDidMount() {
        hljs.initHighlightingOnLoad();
        hljs.highlightAll();

    }

    render() {

        return (
            <Box sx={{
                width: '100%',
                display: 'flex', flexDirection: 'row', alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Box sx={{width: '50%', height: 800, overflowY: 'scroll'}}>
                <pre>
                    <code className={'language-java'}>
                    {this.props.codeText}
                        </code>
               </pre>
                </Box>

                <Box sx={{display: 'flex', flexDirection: 'column', p: 3, m: 3, width: 400}}>

                    <h1>{}</h1>

                    <Box sx={{marginTop:3,marginBottom:5,width:"100%",textAlign:"center"}}>

                    <BareQuestion questions={this.state.questionEntities}/>

                    </Box>

                </Box>
            </Box>
        );
    }
}

export default CodeEvaluation