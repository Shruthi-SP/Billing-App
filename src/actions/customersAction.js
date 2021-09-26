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
                console.log(result.errors)
                swal(result.errors)
            }else{
                dispatch(getAllCustomers(result))
            }
        })
        .catch((err)=>{
            console.log('err in get all customers', err.message)
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
                console.log(result.errors)
                swal(result.errors)
            }else{
                console.log('get a customer res=', result)
                getResult(result)
            }
        })
        .catch((err)=>{
            console.log('err in get all customers', err.message)
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
                console.log('add cust err=',result.errors)
                swal(result.errors)
            }else{
                console.log('add cust response=', result)
                dispatch(addCustomer(result))
                resetForm()
                swal('Customer added successfully')
            }
        })
        .catch((err)=>{
            console.log('err in adding customers', err.message)
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
                console.log('put edit err=', result.errors)
                swal(result.errors)
            }else{
                console.log('put edit res=', result)
                swal(`Edited Customer data`)
                dispatch(editCustomer(result))
            }
        })
        .catch((err)=>{
            console.log('err in deleting customer=', err.message)
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
                console.log('delete cust err',result.errors)
                swal(result.errors)
            }else{
                console.log('delete cust res=', result)
                dispatch(deleteCustomer(result))
                swal('Customer deleted')
            }
        })
        .catch((err)=>{
            console.log('err in deleting customer', err.message)
            swal(err.message)
        })
    }
}
export const deleteCustomer = (custObj) => {
    return { type: 'DELETE_CUSTOMER', payload: custObj}
}