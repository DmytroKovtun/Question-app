import React, {Component} from "react"
import classes from './Auth.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";


export default class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: "Email",
                errorMessage: 'Введите коректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: "Пароль",
                errorMessage: 'Введите коректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = ()=> {

    }

    registerHandler=()=>{

    }

    submitHandler = event => {
        event.preventDefault()
    }

    validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    validateControl = (value, validation)=>{
        if(!validation){
            return true
        }
        let isValid = true;

        if(validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if(validation.email) {
            isValid = this.validateEmail(value)
        }

        if(validation.minLength) {
            isValid =  value.length >= validation.minLength && isValid
        }

        return  isValid
    }

    onchangeHandler =(event, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value;
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({formControls, isFormValid})

    }



    renderInputs = () =>{
       return  Object.keys(this.state.formControls).map((controlName, index ) => {
           const control = this.state.formControls[controlName]
            return <Input
                        key={controlName+index}
                        type = {control.type}
                        value={control.value}
                        valid={control.valid}
                        touched ={control.touched}
                        label = {control.label}
                        shouldValidate = {!!control.validation}
                        errorMessage = {control.errorMessage}
                        onChange = {event => this.onchangeHandler(event, controlName)}
            />
                 })
    }




 render () {

  return <div className={classes.Auth}>
           <div>
               <h1>Авторизация</h1>
               <form action="" onSubmit = {this.submitHandler} className={classes.AuthForm}>
                   {this.renderInputs()}
                   <Button
                       type = 'success'
                       onClick = {this.loginHandler}
                        disabled = {!this.state.isFormValid}
                   > Войти </Button>
                   <Button
                       type = 'success'
                       onClick = {this.registerHandler}
                       disabled = {!this.state.isFormValid}
                   > Реестрация </Button>
               </form>
           </div>

        </div>
 }
}