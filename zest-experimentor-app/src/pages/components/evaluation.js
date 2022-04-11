import React from 'react'
import CodeEvaluation from './quesions/code_evaluation'

class Evaluation extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            questionChoices:[1,2,3,4,5],
            questionText:Array(10).fill("On a scale of one to ten, how would you rate this code"),
            codeText:Array(10).fill('  //Returns the path to the csv file on the server for download\n' +
                        '    public void exportCSV(HttpServletResponse servletResponse, String mode) throws IOException, BaseNotFoundExeption {\n' +
                    '        servletResponse.setContentType("text/csv");\n' +
                    '        LocalDateTime dateTime = LocalDateTime.now();\n' +
                    '        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");\n' +
                    '        String localtimestring = dateTimeFormatter.format(dateTime);\n' +
                    '\n' +
                    '        //Deal with file name and content type\n' +
                    '        servletResponse.addHeader("Content-Disposition","attachment; filename=" + mode + "-result-export"\n' +
                    '                +localtimestring + ".csv");\n' +
                    '\n' +
                    '        //If nobody had taken the test yet. we return 404\n' +
                    '        if(!testeeService.ifAnyParticipants(mode)){\n' +
                    '            servletResponse.setStatus(HttpServletResponse.SC_NOT_FOUND);\n' +
                    '            return;\n' +
                    '        }\n' +
                    '\n' +
                    '        //Create list of all questions which will be used as headers of the csv file\n' +
                    '        List<String> questionIdList = new ArrayList<>();\n' +
                    '        scheduleService.getAll().get(0).getScheduleModuleList().forEach(scheduleModule -> questionIdList.addAll(scheduleModule.getQuestionIdList()));\n' +
                    '        List<BaseQuestion> questionList = questionService.getByIdList(questionIdList);\n' +
                    '\n' +
                    '        //Get alias of the problem and use them as the csv file header\n' +
                    '        List<String> csvHeaderList = new ArrayList<>();\n' +
                    '        csvHeaderList.add("id");\n' +
                    '        csvHeaderList.add("TestGroup");\n' +
                    '        for(var question: questionList){\n' +
                    '            csvHeaderList.add(question.getAlias());\n' +
                    '            csvHeaderList.add(question.getAlias() + "_time");\n' +
                    '        }\n' +
                    '\n' +
                    '        CSVPrinter csvPrinter = new CSVPrinter(servletResponse.getWriter(), CSVFormat.DEFAULT);\n' +
                    '\n' +
                    '        //Print headers\n' +
                    '        csvPrinter.printRecord(csvHeaderList);\n' +
                    '\n' +
                    '        //Write all results to the output file\n' +
                    '        Stream<Testee> testeeStream = testeeService.getByTestGroupContains(mode);\n' +
                    '        testeeStream.forEach(testee -> {\n' +
                    '                    List<String> record = new ArrayList<>();\n' +
                    '                    record.add(testee.getId());\n' +
                    '                    record.add(testee.getTestGroup());\n' +
                    '                    for (var entry : testee.getAnswerMap().entrySet()) {\n' +
                    '                        if(entry.getValue() != null) {\n' +
                    '                            record.add(entry.getValue().getAnswerText());\n' +
                    '                            //Only print those question with time requirement\n' +
                    '                            if (entry.getValue().getTimeSpent() != null)\n' +
                    '                                record.add(entry.getValue().getTimeSpent().toString());\n' +
                    '                        }\n' +
                    '                        else{\n' +
                    '                            record.add("");\n' +
                    '                            record.add("");\n' +
                    '                        }\n' +
                    '                    }\n' +
                    '            try {\n' +
                    '                csvPrinter.printRecord(record);\n' +
                    '            } catch (IOException e) {\n' +
                    '                e.printStackTrace();\n' +
                    '            }\n' +
                    '        });\n' +
                    '    }')
        }
    }
    render(){
        return(
            <div style={{ width: '100%' ,height:'100%'}}>
                <div align={"center"}>
                    <h1>This is the evaluation process</h1>
                </div>
                <CodeEvaluation questionText = {this.state.questionText[0]} codeText={this.state.codeText[0]}/>
            </div>

        )
    ;}
}

export default Evaluation