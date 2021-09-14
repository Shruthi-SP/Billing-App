import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from 'react-select'

import { asyncAddBill } from "../../actions/billsAction"

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

    // useEffect(()=>{
    //     console.log('ue==',custOpt)
    //     setCust(custOpt)
    // },[])

    const dispatch = useDispatch()

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
        if (quantity < 0) {
            errors.quantity = 'quantity cannot be a negative number'
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
            alert('Added to cart')
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
            dispatch(asyncAddBill(billObj, resetForm))
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
                lineItems.length > 0 && <div>Cart Details
                    {chosenCustomer && <p>Customer Name - {getCustomerName(chosenCustomer)}</p>}
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
            <form onSubmit={handleSubmit}>
                <input style={{ width: '100%' }} type='date' name='chosenDate' value={chosenDate} onChange={handleChange} /><br />
                {formError.chosenDate && <span style={{ color: 'red' }}>{formError.chosenDate}</span>}<br />

                {/*<select style={{ padding: '3px 10px', width: '100%' }} name='chosenCustomer' value={chosenCustomer} onChange={handleChange}>
                    <option value=''>Select Customer</option>
                    {
                        customers.map(ele => {
                            return <option key={ele._id} value={ele._id}>{ele.name}</option>
                        })
                    }
                </select>*/}<br />
                {/*formError.chosenCustomer && <span style={{ color: 'red' }}>{formError.chosenCustomer}</span>*/}

                <Select value={cust} onChange={handleCustomerChange} options={custOpt} /> <br />
                {formError.chosenCustomer && <span style={{ color: 'red' }}>{formError.chosenCustomer}</span>}<br />                 

                <label><b>Items : </b></label>
                <Select value={prod} onChange={handleProductChange} options={prodOpt} /> <br />
                {formError.chosenProduct && <span style={{ color: 'red' }}>{formError.chosenProduct}</span>}<br /> 
                {/* {<select style={{ padding: '3px 11px' }} name='chosenProduct' value={chosenProduct} onChange={handleChange}>
                    <option value=''>Select Products</option>
                    {
                        products.map(ele => {
                            return <option key={ele._id} value={ele._id}>{ele.name}</option>
                        })
                    }
                </select>}<br /> }
                {formError.chosenProduct && <span style={{ color: 'red' }}>{formError.chosenProduct}</span>*/}

                <input style={{ marginLeft: '55px', paddingLeft: '15px', width: '120px' }} type='number' min='0' placeholder='1' name='quantity' value={quantity} onChange={handleChange} /><br />
                {formError.quantity && <span style={{ color: 'red' }}>{formError.quantity}</span>} <br />

                <button style={{ marginLeft: '55px', width: '140px' }} onClick={handleAddItem}>Add Item</button><br ></br>
                {formError.lineItems && <span style={{ color: 'red' }}>{formError.lineItems}</span>}<br />
                <input style={{ width: '100%' }} type='submit' value='Add Bill' /><br />
                
            </form>
                <br />
        </div>
    )
}
export default BillForm