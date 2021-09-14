import axios from "axios"

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
                console.log('get all products err=', result.errors)
            }else{
                dispatch(getAllProducts(result))
            }
        })
        .catch((err)=>{
            console.log('err in get all products', err.message)
            alert(err.message)
        })
    }
}
export const getAllProducts = (products) => {
    return {type: 'GET_ALL_PRODUCTS', payload: products}
}

export const asyncGetProduct = (_id) => {
    return (dispatch) => {
        axios.get(`http://dct-billing-app.herokuapp.com/api/products/${_id}`,  {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                console.log('get a product err=', result.errors)
            }else{
                console.log('get a product res=', result)
                alert(`name: ${result.name}\nprice: ${result.price} \nAdded on: ${result.createdAt}\nID: ${result._id} `)
                //dispatch(getProduct(result))
                return result
            }
        })
        .catch((err)=>{
            console.log('err in get a product=', err.message)
            alert(err.message)
        })
    }
}
// export const getProduct = (prodObj) => {
//     return { type:'GET_PRODUCT', payload: prodObj}
// }
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
                console.log('add prod err=',result.errors)
            }else{
                console.log('add prod response=', result)
                dispatch(addProduct(result))
                resetForm()
            }
        })
        .catch((err)=>{
            console.log('err in adding product=', err.message)
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
                console.log('put edit prod err=', result.errors)
            }else{
                console.log('put edit prod res=', result)
                alert(`Edited Successfully :\nname: ${result.name}\nprice: ${result.price} \nAdded on: ${result.createdAt}\nID: ${result._id} `)
                dispatch(editProduct(result))
            }
        })
        .catch((err)=>{
            console.log('err in editing prod=', err.message)
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
                console.log('delete prod err',result.errors)
            }else{
                console.log('delete prod res=', result)
                dispatch(deleteProduct(result))
                alert('deleted successfully')
            }
        })
        .catch((err)=>{
            console.log('err in deleting product', err.message)
            alert(err.message)
        })
    }
}
export const deleteProduct = (prodObj) => {
    return { type: 'DELETE_PRODUCT', payload: prodObj}
}