import { useDispatch } from "react-redux"
import { asyncAddProduct } from "../../actions/productsAction"
import ProductForm from "./ProductForm"

const AddProduct = (props) => {
    const dispatch = useDispatch()

    const formSubmission = (formData, resetForm) => {
        dispatch(asyncAddProduct(formData, resetForm))
    }
    return (
        <div className='col-md-4'>
            <ProductForm formSubmission={formSubmission}/>
        </div>
        
    )
}
export default AddProduct