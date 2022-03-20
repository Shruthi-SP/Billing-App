import axios from "axios"
import swal from 'sweetalert'

export const asyncGetAllCustomers = () => {
    return (dispatch) => {
        axios.get('http://dct-billing-app.herokuapp.com/api/customers',  {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                swal(result.errors)
            }else{
                dispatch(getAllCustomers(result))
            }
        })
        .catch((err)=>{
            swal(err.message)
        })
    }
}
export const getAllCustomers = (customers) => {
    return {type: 'GET_ALL_CUSTOMER', payload: customers}
}

export const asyncGetCustomer = (_id, getResult) => {
    return () => {
        axios.get(`http://dct-billing-app.herokuapp.com/api/customers/${_id}`,  {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                swal(result.errors)
            }else{
                getResult(result)
            }
        })
        .catch((err)=>{
            swal(err.message)
        })
    }
}

export const  asyncAddCustomer = (formData, resetForm) => {
    return (dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/customers', formData, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                swal(result.errors)
            }else{
                dispatch(addCustomer(result))
                resetForm()
                swal('Customer added successfully')
            }
        })
        .catch((err)=>{
            swal(err.message)
        })
    }
}
export const addCustomer = (custObj) => {
    return { type:'ADD_CUSTOMER', payload: custObj}
}
export const asyncEditCustomer = (_id, formData) => {
    return (dispatch) => {
        axios.put(`http://dct-billing-app.herokuapp.com/api/customers/${_id}`, formData, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                swal(result.errors)
            }else{
                swal(`Edited Customer data`)
                dispatch(editCustomer(result))
            }
        })
        .catch((err)=>{
            swal(err.message)
        })
    }
}
export const editCustomer = (custObj) => {
    return { type: 'EDIT_CUSTOMER', payload: custObj}
}

export const asyncDeleteCustomer = (_id) => {
    return (dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/customers/${_id}`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                swal(result.errors)
            }else{
                dispatch(deleteCustomer(result))
                swal('Customer deleted')
            }
        })
        .catch((err)=>{
            swal(err.message)
        })
    }
}
export const deleteCustomer = (custObj) => {
    return { type: 'DELETE_CUSTOMER', payload: custObj}
}