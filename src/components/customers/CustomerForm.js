import { useState } from "react"

const CustomerForm = (props) => {
    const { name:editName, mobile:editMobile, email:editEmail, formSubmission } = props
    const [name, setName] = useState(editName ? editName : '')
    const [mobile, setMobile] = useState(editMobile ? editMobile : '')
    const [email, setEmail] = useState(editEmail ? editEmail : '')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const runValidation = () => {
        if(name.trim().length === 0){
            errors.name = 'name cannot be blank'
        }        
    }

    const handleChange = (e) => {
        const attr = e.target.name
        if(attr === 'name'){
            setName(e.target.value)
        }
        if(attr === 'mobile') {
            setMobile(e.target.value)
        }
        if(attr === 'email'){
            setEmail(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()
        if(Object.keys(errors).length === 0){
            setFormErrors({})
            const formData = {
                name: name,
                mobile: mobile,
                email: email
            }
            const resetForm = () => {
                setName('')
                setMobile('')
                setEmail('')
            }
            formSubmission(formData, resetForm)
        }else{
            setFormErrors(errors)
        }
    }

    return (
        <div className='mt-3 mb-3'>
            <h2 className='mb-3'>Add Customer</h2>
            <form onSubmit={handleSubmit}>
                <input  className='form-control'  type='text' 
                        placeholder='enter name' name='name' 
                        value={name} 
                        onChange={handleChange}
                />
                {formErrors.name && <span style={{color: 'red'}}>{formErrors.name}</span>}<br />

                <input  className='form-control'  type='mobile' 
                        placeholder='enter mobile' name='mobile' 
                        value={mobile} 
                        onChange={handleChange}
                /><br />
                
                <input  className='form-control'  type='text' 
                        placeholder='enter your email' name='email'
                        value={email} 
                        onChange={handleChange}
                /><br />
                
                <input style={{width:'50%'}} type='submit' value='Add' />
            </form>
        </div>
    )
}
export default CustomerForm