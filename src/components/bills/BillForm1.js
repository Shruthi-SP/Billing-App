// {lineItems.length> 0 && <BillCart lineItems={lineItems} getCustomerName={getCustomerName} getProductName={getProductName} incQuantity={incQuantity} decQuantity={decQuantity} removeItem={removeItem} quantity={quantity}  />}

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from 'react-select'
import swal from 'sweetalert'
import { asyncAddBill, asyncGetBill } from "../../actions/billsAction"
import BillStats from "./BillStats"
import BillCart from "./BillCart"

const BillForm1 = (props) => {
    const customers = useSelector((state) => {
        return state.customers
    })
    
    const custOpt=customers.map(ele=>{
        return {value: ele._id, label: ele.name}
    })

    const products = useSelector((state) => {
        return state.products
    })

    const prodOpt=products.map(ele=>{
        return { value:ele._id, label: ele.name }
    })

    const [prod, setProd] = useState([])
    const [cust, setCust] = useState([])
    const [chosenDate, setChosenDate] = useState('')
    const [chosenCustomer, setChosenCustomer] = useState('')
    const [lineItems, setLineItems] = useState([])
    const [chosenProduct, setChosenProduct] = useState('')
    const [quantity, setQuantity] = useState('')
    const [formError, setFormError] = useState('')
    const errors = {}

    const [show, setShow] = useState(false)
    const [result, setResult] = useState({})


    const dispatch = useDispatch()

    const getResult = (obj) => {
        setResult(obj)
    }

    const handleClose = () => setShow(false);
    const handleShow = (_id) => {
        setShow(true)
        dispatch(asyncGetBill(_id, getResult))
    }

    const getCustomerName = (_id) => {
        const getCustObj = customers.find(ele => ele._id === _id)
        return getCustObj.name
    }
    const getProductName = (_id) => {
        const getProdObj = products.find(ele => ele._id === _id)
        return getProdObj.name
    }
    
    const incQuantity = (id) => {
        const result = lineItems.map(ele =>{
            if(ele.product == id){
                return {...ele, ...{quantity: Number(ele.quantity) + 1}}
            }else {
                return {...ele}
            }
        })
        setLineItems(result)
    }
    const decQuantity = (id) => {
        const result = lineItems.map(ele =>{
            if(ele.product == id){
                return {...ele, ...{quantity: Number(ele.quantity) - 1}}
            }else {
                return {...ele}
            }
        })
        setLineItems(result)
    }
    const removeItem = (id) => {
        const result = lineItems.filter(ele =>{
            return ele.product!=id
        })
        setLineItems(result)
    }

    const runValidation = () => {
        if (quantity.length === 0 ) {
            errors.quantity = 'add quantity'
        }
        if (chosenDate.length === 0) {
            errors.chosenDate = 'pick the date'
        }
        if (chosenProduct.trim().length === 0) {
            errors.chosenProduct = 'product cannot be empty'
        }
        if (chosenCustomer.trim().length === 0) {
            errors.chosenCustomer = 'choose customer'
        }
    }

    const handleChange = (e) => {
        const attr = e.target.name
        if (attr === 'chosenDate') {
            setChosenDate(e.target.value)
        }
        if (attr === 'chosenCustomer') {
            //console.log('chosen customer', e.target.value)
            setChosenCustomer(e.target.value)
        }
        if (attr === 'chosenProduct') {
            setChosenProduct(e.target.value)
        }
        if (attr === 'quantity') {
            setQuantity(e.target.value)
        }
    }

    const handleCustomerChange = (custOpt) => {
        setChosenCustomer(custOpt.value)
        setCust(custOpt)
    }
    const handleProductChange = (prodOpt) => {
        setChosenProduct(prodOpt.value)
        setProd(prodOpt)
    }

    const resetForm = () => {
        setChosenDate('')
        setChosenCustomer('')
        setChosenProduct('')
        setQuantity('')
        setLineItems([])
        setCust([])
        setProd([])
    }

    const handleAddItem = (e) => {
        e.preventDefault()
        runValidation()
        if (Object.keys(errors).length === 0) {
            setFormError({})
            const item = {
                product: chosenProduct,
                quantity: quantity
            }
            const newLineItems = [item, ...lineItems]
            //console.log('cart items=', newLineItems)
            setLineItems(newLineItems)
            swal('Added to cart')
            setProd([])
            setQuantity('')
            setChosenProduct('')
        } else {
            setFormError(errors)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()
        if (lineItems.length > 0) {
            setFormError({})
            let billObj = {}
            billObj = {
                date: chosenDate,
                customer: chosenCustomer,
                lineItems: lineItems
            }
            dispatch(asyncAddBill(billObj, resetForm, handleShow))
        } else {
            if (lineItems.length === 0) {
                errors.lineItems = 'Click on Add Items'
            }
            setFormError(errors)
        }
    }

    return (
        <div className='col-md-4'>
            {
                lineItems.length > 0 && <BillCart lineItems={lineItems} chosenCustomer={chosenCustomer} chosenProduct={chosenProduct} getCustomerName={getCustomerName} getProductName={getProductName} incQuantity={incQuantity} decQuantity={decQuantity} removeItem={removeItem} quantity={quantity}  />
            }
            <h2  className='mt-3' >Add Bill</h2>
            <form className='mt-3' onSubmit={handleSubmit}>
                <input className='form-control'                     
                    type='date' name='chosenDate' 
                    value={chosenDate} 
                    onChange={handleChange} 
                />
                {formError.chosenDate && <span style={{ color: 'red' }}>{formError.chosenDate}</span>}<br />              

                <Select
                    placeholder='Select or search customer' 
                    value={cust} 
                    onChange={handleCustomerChange} 
                    options={custOpt} 
                /> 
                {formError.chosenCustomer && <span style={{ color: 'red' }}>{formError.chosenCustomer}</span>}<br />                 

                <label><b>Items : </b></label>
                <div style={{marginLeft: '85px', paddingLeft: '15px', width: '270px' }}>
                <Select
                    placeholder='Select or search product' 
                    value={prod} 
                    onChange={handleProductChange} 
                    options={prodOpt} 
                /></div>
                {formError.chosenProduct && <span style={{marginLeft: '100px', paddingLeft: '15px', width: '255px', color: 'red' }}>{formError.chosenProduct}</span>}<br /> 

                <input className='form-control' 
                    style={{ marginLeft: '100px', paddingLeft: '15px', width: '255px' }} 
                    type='number' min='1' 
                    placeholder='1' 
                    name='quantity' 
                    value={quantity} 
                    onChange={handleChange} 
                />
                {formError.quantity && <span style={{ marginLeft: '100px', paddingLeft: '15px', width: '255px', color: 'red' }}>{formError.quantity}</span>}<br />

                <button className='form-control'
                    style={{ marginLeft: '100px', paddingLeft: '15px', width: '255px'}} 
                    onClick={handleAddItem}>Add Item </button>
                <br />

                <input className='form-control' style={{ width: '100%' }} type='submit' value='Add Bill' /><br />    
            </form>
            { Object.keys(result).length > 0 && <BillStats handleClose={handleClose} show={show} result={result} />}
        </div>
    )
}
export default BillForm1