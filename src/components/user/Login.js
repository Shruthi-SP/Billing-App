import { useState } from "react"
import { useDispatch } from 'react-redux'
import validator from 'validator'
import { asyncUserLogin } from "../../actions/userAction"

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const dispatch = useDispatch()

    const runValidation = () => {
        if(email.trim().length === 0){
            errors.email = 'email cannot be blank'
        }else if(!validator.isEmail(email)){
            errors.email = 'email is not valid'
        }
        if(password.trim().length === 0) {
            errors.password = 'password cannot be blank'
        }
    }

    const handleChange = (e) => {
        const attr = e.target.name
        if(attr === 'email'){
            setEmail(e.target.value)
        }
        else if(attr === 'password'){
            setPassword(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()
        if(Object.keys(errors).length === 0){
            setFormErrors({})
            const formData = {
                email: email,
                password: password
            }
            const resetForm = () => {
                setEmail('')
                setPassword('')
            }
            const redirect = () => {
                props.history.push('/')
                props.handleLoggedIn()
            }
            console.log('login formdata=', formData)
            dispatch(asyncUserLogin(formData, resetForm, redirect))
            
        }else{
            setFormErrors(errors)
            console.log(errors)
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input  type='text' 
                        placeholder='enter your email' name='email' 
                        value={email} 
                        onChange={handleChange}
                /><br />
                {formErrors.email && <span style={{color: 'red'}}>{formErrors.email}</span>}<br />
                <input  type='password' 
                        placeholder='enter password' name='password' 
                        value={password} 
                        onChange={handleChange}
                /><br />
                {formErrors.password && <span style={{color: 'red'}}>{formErrors.password}</span>}<br />
                <input type='submit' value='Login' />
            </form>
        </div>
    )
}
export default Login