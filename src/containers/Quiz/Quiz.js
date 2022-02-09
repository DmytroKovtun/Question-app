import React, {Component} from "react";
import classes from "./Quiz.module.css"
import ActiveQuiz from "../../components/ActivQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishQuiz/FinishedQuiz";
import axios from "../../axios/axiosQuiz";
import Loader from "../../components/Loader/Loader";
import {withRouter} from "../../hoc/WithRouter/WithRouter";



class Quiz extends Component {

    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true,
    }

    async componentDidMount() {

        try {

            const response = await axios.get(`/quizes/${this.props.router.params.id}.json`, this.state.quiz)
            const quiz = response.data
            this.setState({
                quiz,
                loading: false,
            })
        } catch (error) {
            console.log(error)
        }
    }

    onAnswerClickHandler = (answerId) => {
        console.log(this.state.answerState)
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                results,
                answerState: {[answerId]: 'success'}
            })

            const timeout = window.setTimeout(() => {


                if (this.isQuizFinished()) {
                    this.setState({
                        isFinished: true,
                    })

                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = 'error'
            this.setState({
                results,
                answerState: {[answerId]: 'error'}
            })
        }

    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
            results: {}
        })
    }

    render() {
            console.log(this.state.quiz)
        return (

            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответте на все вопросы</h1>

                    {this.state.loading
                       ? <Loader/>
                        : this.state.isFinished ?
                                <FinishedQuiz
                                    retryHandler={this.retryHandler}
                                    results={this.state.results}
                                    quiz={this.state.quiz}
                                /> :
                                <ActiveQuiz
                                    quizLength={this.state.quiz.length}
                                    answerNumber={this.state.activeQuestion + 1}
                                    answers={this.state.quiz[this.state.activeQuestion].answer}
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

export default withRouter(Quiz)