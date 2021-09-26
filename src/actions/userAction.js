import axios from 'axios'
import swal from 'sweetalert'

export const asyncUserRegister = (formData, resetForm, redirect) => {
    return () => {
        axios.post('http://dct-billing-app.herokuapp.com/api/users/register', formData)
            .then((response)=>{
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    console.log('errors=', result.errors)
                    swal(result.errors)
                }else if(result.hasOwnProperty('errmsg')){
                    swal('unsuccessful. username already exists.')
                }
                else{
                    console.log('async register response=', result)
                    swal('Registered successfully')
                    resetForm()
                    redirect()
                }
            })
    }
}

export const asyncUserLogin = (formData, resetForm, redirect) => {
    return () => {
        axios.post('http://dct-billing-app.herokuapp.com/api/users/login', formData)
            .then((response)=>{
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    console.log('errors=', result.errors)
                }
                else{
                    console.log('async register response=', result)
                    localStorage.setItem('token', result.token)
                    swal('successfully logged in')
                    resetForm()
                    redirect()
                }
            })
    }
}

export const asyncGetUserAccount = () => {
    return (dispatch) => {
        axios.get('http://dct-billing-app.herokuapp.com/api/users/account', {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
            
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                swal(result.errors)
            }
            else{
                console.log('async get user response=', result)
                dispatch(getUser(result))
            }
        })
        .catch((err)=>{
            console.log('err in getting user ', err.message)
            swal(err.message)
        })
    }
}
export const getUser = (userObj) => {
   return { type: 'GET_USER', payload: userObj }
}