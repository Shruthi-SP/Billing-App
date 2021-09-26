import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from 'react-select'
import swal from 'sweetalert'
import { asyncAddBill, asyncGetBill } from "../../actions/billsAction"
import BillStats from "./BillStats"

const BillForm = (props) => {
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
        console.log('get result for modal=', obj)
        setResult(obj)
    }

    const handleClose = () => setShow(false);
    const handleShow = (_id) => {
        setShow(true)
        dispatch(asyncGetBill(_id, getResult))
    }

    const getCustomerName = (_id) => {
        const getCustObj = customers.find(ele => ele._id === _id)
        console.log('getCustObj=', getCustObj)
        return getCustObj.name
    }
    const getProductName = (_id) => {
        const getProdObj = products.find(ele => ele._id === _id)
        console.log('getProdObj=', getProdObj)
        return getProdObj.name
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
            console.log('chosen customer', e.target.value)
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
        console.log('optObj=', custOpt)
        console.log('chosenCustomer=', custOpt.value)
        setChosenCustomer(custOpt.value)
        setCust(custOpt)
    }
    const handleProductChange = (prodOpt) => {
        console.log('optProdObj=', prodOpt)
        console.log('chosenProduct=', prodOpt.value)
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
        console.log('inside handle item')
        runValidation()
        if (Object.keys(errors).length === 0) {
            setFormError({})
            const item = {
                product: chosenProduct,
                quantity: quantity
            }
            const newLineItems = [item, ...lineItems]
            setLineItems(newLineItems)
            console.log('line items=', newLineItems)
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
        if (Object.keys(errors).length === 0 && lineItems.length > 0) {
            setFormError({})
            let billObj = {}
            billObj = {
                date: chosenDate,
                customer: chosenCustomer,
                lineItems: lineItems
            }
            console.log('billObj=', billObj)
            dispatch(asyncAddBill(billObj, resetForm, handleShow))
        } else {
            if (lineItems.length === 0) {
                errors.lineItems = 'Click on Add Items'
            }
            setFormError(errors)
        }
    }

    return (
        <div style={{ marginRight: '100px', alignItems: 'self-end' }}>
            {
                lineItems.length > 0 && <div>
                    <h6>Cart Details</h6>
                    {chosenCustomer && <h6>Customer Name - {getCustomerName(chosenCustomer)}</h6>}
                    {lineItems.length > 0 && <table className='table'>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lineItems.map((ele, i) => {
                                return (<tr key={i}>
                                    <td>{getProductName(ele.product)}</td>
                                    <td>{ele.quantity}</td>
                                </tr>)
                            })}
                        </tbody>
                    </table>}
                </div>
            }
            <h2>Add Bill</h2>
            <form className='mt-3' onSubmit={handleSubmit}>
                <input className='form-control' 
                    style={{ width: '100%' }} 
                    type='date' name='chosenDate' 
                    value={chosenDate} 
                    onChange={handleChange} 
                />
                {formError.chosenDate && <span style={{ color: 'red' }}>{formError.chosenDate}</span>}<br />              

                <Select
                    value={cust} 
                    onChange={handleCustomerChange} 
                    options={custOpt} 
                /> 
                {formError.chosenCustomer && <span style={{ color: 'red' }}>{formError.chosenCustomer}</span>}<br />                 

                <label><b>Items : </b></label>
                <Select 
                    value={prod} 
                    onChange={handleProductChange} 
                    options={prodOpt} 
                />
                {formError.chosenProduct && <span style={{ color: 'red' }}>{formError.chosenProduct}</span>}<br /> 

                <input className='form-control' 
                    style={{ marginLeft: '55px', paddingLeft: '15px', width: '140px' }} 
                    type='number' min='1' 
                    placeholder='1' 
                    name='quantity' 
                    value={quantity} 
                    onChange={handleChange} 
                />
                {formError.quantity && <span style={{ marginLeft: '55px', width: '140px', color: 'red' }}>{formError.quantity}</span>}<br />

                <button className='form-control'
                    style={{ marginLeft: '55px', width: '140px' }} 
                    onClick={handleAddItem}>Add Item</button><br />
                {/* {formError.lineItems && <span style={{ color: 'red' }}>{formError.lineItems}</span>} */}

                <input className='form-control' style={{ width: '100%' }} type='submit' value='Add Bill' /><br />    
            </form>
            { Object.keys(result).length > 0 && <BillStats handleClose={handleClose} show={show} result={result} />}
        </div>
    )
}
export default BillForm