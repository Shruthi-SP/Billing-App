import { useState } from "react"

const ProductForm = (props) => {
    const { name:editName, price:editPrice, formSubmission } = props
    const [name, setName] = useState(editName ? editName : '')
    const [price, setPrice] = useState(editPrice ? editPrice : '')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const runValidation = () => {
        if(name.trim().length === 0){
            errors.name = 'name required'
        }
        if(price.trim().length === 0){
            errors.price = 'price required'
        }
    }

    const handleChange = (e) => {
        const attr = e.target.name
        if(attr === 'name'){
            setName(e.target.value)
        }
        if(attr === 'price') {
            setPrice(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidation()
        if(Object.keys(errors).length === 0){
            setFormErrors({})
            const formData = {
                name: name,
                price: price
            }
            const resetForm = () => {
                setName('')
                setPrice('')
            }
            formSubmission(formData, resetForm)
        }else{
            setFormErrors(errors)
            console.log(errors)
        }
    }

    return (
        <div>
            <h2 style={{marginTop: '0px'}}>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <input className='form-control'  type='text' 
                        placeholder='enter name' name='name' 
                        value={name} 
                        onChange={handleChange}
                />
                {formErrors.name && <span style={{color: 'red'}}>{formErrors.name}</span>}<br />

                <input  className='form-control' type='text' 
                        placeholder='enter price' name='price' 
                        value={price} 
                        onChange={handleChange}
                />
                {formErrors.price && <span style={{color: 'red'}}>{formErrors.price}</span>}<br />
                <input type='submit' value='Add' />
            </form>
        </div>
    )
}
export default ProductForm