import { useDispatch } from "react-redux"
import { asyncAddProduct } from "../../actions/productsAction"
import ProductForm from "./ProductForm"

const AddProduct = (props) => {
    const dispatch = useDispatch()

    const formSubmission = (formData, resetForm) => {
        console.log('form in add product=', formData)
        dispatch(asyncAddProduct(formData, resetForm))
    }
    return (
        <div>
            <ProductForm formSubmission={formSubmission}/>
        </div>
        
    )
}
export default AddProduct