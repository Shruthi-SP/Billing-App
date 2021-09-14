import axios from "axios"

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
            }else{
                dispatch(getAllCustomers(result))
            }
        })
        .catch((err)=>{
            console.log('err in get all customers', err.message)
            alert(err.message)
            
        })
    }
}
export const getAllCustomers = (customers) => {
    return {type: 'GET_ALL_CUSTOMER', payload: customers}
}

export const asyncGetCustomer = (_id, getResult) => {
    return (dispatch) => {
        axios.get(`http://dct-billing-app.herokuapp.com/api/customers/${_id}`,  {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                console.log(result.errors)
            }else{
                console.log('get a customer res=', result)
                alert(`name: ${result.name}\nmobile: ${result.mobile} \nAdded on: ${result.createdAt}\nID: ${result._id} `)
                //dispatch(getCustomer(result))
                getResult(result)
            }
        })
        .catch((err)=>{
            console.log('err in get all customers', err.message)
            alert(err.message)
        })
    }
}
// export const getCustomer = (custObj) => {
//     return { type:'GET_CUSTOMER', payload: custObj}
// }
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
            }else{
                console.log('add cust response=', result)
                dispatch(addCustomer(result))
                resetForm()
            }
        })
        .catch((err)=>{
            console.log('err in adding customers', err.message)
            alert(err.message)
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
            }else{
                console.log('put edit res=', result)
                alert(`Edited:\nname: ${result.name}\nmobile: ${result.mobile} \nAdded on: ${result.createdAt}\nID: ${result._id} `)
                dispatch(editCustomer(result))
            }
        })
        .catch((err)=>{
            console.log('err in deleting customer=', err.message)
            alert(err.message)
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
            }else{
                console.log('delete cust res=', result)
                dispatch(deleteCustomer(result))
                alert('deleted successfully')
            }
        })
        .catch((err)=>{
            console.log('err in deleting customer', err.message)
            alert(err.message)
        })
    }
}
export const deleteCustomer = (custObj) => {
    return { type: 'DELETE_CUSTOMER', payload: custObj}
}