import React from 'react'
import hljs from 'highlight.js';
import {Box} from "@mui/material";

import BareQuestion from './bare_question'


class CodeEvaluation extends React.Component{

    maskCodeSnippet(){
        document.getElementsByClassName('codeSnippet')[0].style.filter = 'blur(5px)';
        console.log('Masked the code snippets')
        clearInterval(this.intervalId);
    }

    componentDidMount() {
        // console.log('The exposure time is ' + this.props.questionEntities[0].exposureTime);
        hljs.highlightAll();
        if(this.props.questionEntities[0].exposureTime > 0) {
            this.intervalId = setInterval(() => this.maskCodeSnippet(),this.props.questionEntities[0].exposureTime)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        hljs.highlightAll();
        if(this.props.questionEntities[0].exposureTime > 0) {
            this.intervalId = setInterval(() => this.maskCodeSnippet(),this.props.questionEntities[0].exposureTime)
        }
    }

    render() {
        return (
            <Box sx={{
                width: '100%',
                display: 'flex', flexDirection: 'row', alignItems: 'center',
                justifyContent: 'center',}}>
                <Box sx={{width: '50%', height: 800, overflowY: 'scroll'}} className={'codeSnippet'}>
                    <pre>
                        <code className={'language-java'}>
                            {this.props.questionEntities[0].codeText}
                        </code>
                    </pre>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', p: 3, m: 3, width: 400}}>
                    <Box >
                        <BareQuestion url={this.props.url} questionEntities={this.props.questionEntities}
                                      getNewQuestions={this.props.getNewQuestions}/>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default CodeEvaluation