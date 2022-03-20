import axios from "axios"
import swal from 'sweetalert'

export const asyncGetAllProducts = () => {
    return (dispatch) => {
        axios.get('http://dct-billing-app.herokuapp.com/api/products',  {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.errors)
            }else{
                dispatch(getAllProducts(result))
            }
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}
export const getAllProducts = (products) => {
    return {type: 'GET_ALL_PRODUCTS', payload: products}
}

export const asyncGetProduct = (_id, getResult) => {
    return () => {
        axios.get(`http://dct-billing-app.herokuapp.com/api/products/${_id}`,  {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.errors)
            }else{
                getResult(result)
            }
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}

export const  asyncAddProduct = (formData, resetForm) => {
    return (dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/products', formData, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.errors)
            }else{
                dispatch(addProduct(result))
                resetForm()
                swal('Product added sucessfully')
            }
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}
export const addProduct = (productObj) => {
    return { type:'ADD_PRODUCT', payload: productObj}
}
export const asyncEditProduct = (_id, formData) => {
    return (dispatch) => {
        axios.put(`http://dct-billing-app.herokuapp.com/api/products/${_id}`, formData, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.errors)
            }else{
                swal(`Edited Product data`)
                dispatch(editProduct(result))
            }
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}
export const editProduct = (productObj) => {
    return { type: 'EDIT_PRODUCT', payload: productObj}
}

export const asyncDeleteProduct = (_id) => {
    return (dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/products/${_id}`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.errors)
            }else{
                dispatch(deleteProduct(result))
                swal('Product deleted')
            }
        })
        .catch((err)=>{
            alert(err.message)
        })
    }
}
export const deleteProduct = (prodObj) => {
    return { type: 'DELETE_PRODUCT', payload: prodObj}
}