import axios from "axios"

export const asyncGetAllBills = () => {
    return (dispatch) => {
        axios.get('http://dct-billing-app.herokuapp.com/api/bills', {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                console.log('get all bills err=', result.errors)
            }else{
                dispatch(getAllBills(result))
            }
        })
        .catch((err)=>{
            console.log('err in getting all bills', err.message)
            alert(err.message)
        })
    }
}
export const getAllBills = (bills) => {
    return {type: 'GET_ALL_BILLS', payload: bills}
}

export const asyncGetBill = (_id, getResult) => {
    return (dispatch) => {
        axios.get(`http://dct-billing-app.herokuapp.com/api/bills/${_id}`,  {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                console.log('get a bill err=', result.errors)
            }else{
                console.log('get a bill res=', result)
                alert(`Details:Bill ID: ${result._id}\nDate: ${result.date.slice(0,10)}\nCustomer id: ${result.customer}\nNo. of Items: ${result.lineItems.length}\nTotal:${result.total}\n `)
                //dispatch(getBill(result))
                getResult(result)
                return result
            }
        })
        .catch((err)=>{
            console.log('err in get a bill=', err.message)
            alert(err.message)
        })
    }
}
// export const getBill = (billObj) => {
//     return { type:'GET_BILL', payload: billObj}
// }
export const  asyncAddBill = (formData, resetForm) => {
    return (dispatch) => {
        axios.post('http://dct-billing-app.herokuapp.com/api/bills', formData, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                console.log('add bill err=', result.errors)
            }else{
                console.log('add bill response=', result)
                dispatch(addBill(result))
                resetForm()
                alert('bill added successfully')
            }
        })
        .catch((err)=>{
            console.log('err in adding bill=', err.message)
            alert(err.message)
        })
    }
}
export const addBill = (billObj) => {
    return { type:'ADD_BILL', payload: billObj}
}

export const asyncDeleteBill = (_id) => {
    return (dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/bills/${_id}`, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            if(result.hasOwnProperty('errors')){
                console.log('delete bill err',result.errors)
            }else{
                console.log('delete bill res=', result)
                dispatch(deleteBill(result))
                alert('deleted successfully')
            }
        })
        .catch((err)=>{
            console.log('err in deleting bill', err.message)
            alert(err.message)
        })
    }
}
export const deleteBill = (billObj) => {
    return { type: 'DELETE_BILL', payload: billObj}
}