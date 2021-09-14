import axios from 'axios'

export const asyncUserRegister = (formData, resetForm, redirect) => {
    return (dispatch, getState) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/users/register', formData)
            .then((response)=>{
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    console.log('errors=', result.errors)
                }else if(result.hasOwnProperty('errmsg')){
                    alert('unsuccessful. username already exists.')
                }
                else{
                    console.log('async register response=', result)
                    alert('registered successfully')
                    resetForm()
                    redirect()
                }
            })
    }
}

export const asyncUserLogin = (formData, resetForm, redirect) => {
    return (dispatch, getState) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/users/login', formData)
            .then((response)=>{
                const result = response.data
                if(result.hasOwnProperty('errors')){
                    console.log('errors=', result.errors)
                }
                else{
                    console.log('async register response=', result)
                    localStorage.setItem('token', result.token)
                    alert('successfully logged in')
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
                console.log('errors=', result.errors)
            }
            else{
                console.log('async get user response=', result)
                dispatch(getUser(result))
            }
        })
        .catch((err)=>{
            console.log('err in getting user ', err.message)
            alert(err.message)
        })
    }
}
export const getUser = (userObj) => {
   return { type: 'GET_USER', payload: userObj }
}