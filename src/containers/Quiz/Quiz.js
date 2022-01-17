import React, {Component} from "react";
import classes from "./Quiz.module.css"
import ActiveQuiz from "../../components/ActivQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishQuiz/FinishedQuiz";


class Quiz extends Component {

    state = {
        results: {},
        isFinished:false,
        activeQuestion: 0,
        answerState: null,
        quiz :[
            {
                question: 'Какого цвета небо?',
                rightAnswerId:2,
                id:1,
                answers: [
                    {text: 'Черный', id:1},
                    {text: 'Синий', id:2},
                    {text: 'Зеленый', id:3},
                    {text: 'Серый', id:4}
                ]
            },
            {
                question: 'В каком году основали Киев',
                rightAnswerId:3,
                id:2,
                answers: [
                    {text: '1460', id:1},
                    {text: '1204', id:2},
                    {text: '635', id:3},
                    {text: '321', id:4}
                ]
            },
        ]
    }

    onAnswerClickHandler = (answerId)=> {
        console.log(this.state.answerState)
        if(this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if(this.state.answerState[key] ==='success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if(question.rightAnswerId === answerId) {
            if(!results[question.id]){
                results[question.id] = 'success'
            }
            this.setState({
                results,
                answerState: {[answerId]:'success'}
            })

            const timeout = window.setTimeout(()=> {


                if(this.isQuizFinished()){
                     this.setState({
                         isFinished:true,
                     })

                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            },1000)

        } else {
            results[question.id] = 'error'
            this.setState({
                results,
                answerState: {[answerId]:'error'}
            })
        }

    }

    isQuizFinished(){
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = ()=> {
        this.setState({
            isFinished:false,
            activeQuestion: 0,
            answerState: null,
            results: {}
        })
    }

    render(){
        console.log(this.state);
        return(

            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответте на все вопросы</h1>
                    {this.state.isFinished ?
                        <FinishedQuiz
                            retryHandler={this.retryHandler}
                            results = {this.state.results}
                            quiz = {this.state.quiz}
                        /> :
                        <ActiveQuiz
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            question={this.state.quiz[this.state.activeQuestion].question}
                            onAnswerClick={this.onAnswerClickHandler}
                            state={this.state.answerState}
                        />
                    }
                </div>
            </div>

        )
    }
}

export default Quiz