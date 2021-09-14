import { useState } from "react"
import { useDispatch } from 'react-redux'
import validator from 'validator'
import { asyncUserRegister } from "../../actions/userAction"

const Register = (props) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [address, setAddress] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const dispatch = useDispatch()

    const runValidation = () => {
        if(username.trim().length <= 3){
            errors.username = 'name must include 4 or more characters'
        }
        if(email.trim().length === 0){
            errors.email = 'email cannot be blank'
        }else if(!validator.isEmail(email)){
            errors.email = 'email is not valid'
        }
        if(password.trim().length === 0) {
            errors.password = 'password cannot be blank'
        }
        if(businessName.trim().length === 0) {
            errors.businessName = 'business name cannot be blank'
        }
        if(address.trim().length === 0) {
            errors.address = 'address cannot be blank'
        }
    }

    const handleChange = (e) => {
        const attr = e.target.name
        if(attr === 'username'){
            setUsername(e.target.value)
        }
        else if(attr === 'email'){
            setEmail(e.target.value)
        }
        else if(attr === 'password'){
            setPassword(e.target.value)
        }
        else if(attr === 'businessName'){
            setBusinessName(e.target.value)
        }
        else if(attr === 'address'){
            setAddress(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()
        if(Object.keys(errors).length === 0){
            setFormErrors({})
            const formData = {
                username: username,
                email: email,
                password: password,
                businessName: businessName,
                address: address
            }
            const resetForm = () => {
                setUsername('')
                setEmail('')
                setPassword('')
                setBusinessName('')
                setAddress('')
            }
            const redirect = () => {
                props.history.push('/users/login')
            }
            console.log('register formdata=', formData)
            dispatch(asyncUserRegister(formData, resetForm, redirect))
            
        }else{
            setFormErrors(errors)
            console.log(errors)
        }
    }

    return (
        <div>
            <h2>Register with us</h2>
            <form onSubmit={handleSubmit}>
                <input  type='text' 
                        placeholder='enter your name' name='username' 
                        value={username} 
                        onChange={handleChange}
                /><br />
                {formErrors.username && <span style={{color: 'red'}}>{formErrors.username}</span>}<br />
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
                <input  type='text' 
                        placeholder='enter business name' name='businessName' 
                        value={businessName} 
                        onChange={handleChange}
                /><br />
                {formErrors.businessName && <span style={{color: 'red'}}>{formErrors.businessName}</span>}<br />
                <input  type='text' 
                        placeholder='enter address' 
                        name='address' 
                        value={address} 
                        onChange={handleChange}
                /><br />
                {formErrors.address && <span style={{color: 'red'}}>{formErrors.address}</span>}<br />
                <input type='submit' value='Register' />
            </form>
        </div>
    )
}
export default Register