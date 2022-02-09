import React, {Component} from "react"
import classes from "./QuizList.module.css"
import {NavLink} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import axios from "../../axios/axiosQuiz";

export default class QuizList extends Component {

    state = {
        quizes: [],
        loading: true
    }

    renderQuizes() {
        console.log(this.state.quizes)

        return this.state.quizes.map((quiz, index) => {
            return (
                <li key={quiz.id+index}>
                    <NavLink to={'/quiz/' + quiz.id}> Test {quiz.name}</NavLink>
                </li>
            )
        })
    }

   async componentDidMount () {

        try {
            const response = await axios.get('/quizes.json')

            const quizes = []
            Object.keys(response.data).forEach((key,index)=> {
                quizes.push({
                    id:key,
                    name: `Тест №${index+ 1}`
                })
            })
            this.setState({
                quizes,
                loading: false
            })
        } catch (error){
            console.log(error)
        }
    }




    render() {
        return <div className={classes.QuizList}>
            <div>
                <h1> Список тестов </h1>
                {this.state.loading
                    ? <Loader/>
                    : <ul>
                        {this.renderQuizes()}
                      </ul>
                }
            </div>
        </div>
    }
}