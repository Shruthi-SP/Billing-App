import { useDispatch, useSelector } from "react-redux"
import { asyncEditProduct, asyncGetProduct } from "../../actions/productsAction"
import ProductForm from "./ProductForm"

const EditProduct = (props) => {
    //console.log('edit product props=', props)
    const { _id, handleToggle } = props

    const dispatch = useDispatch()

    const products = useSelector((state)=>{
        return state.products
    })

    const product = products.find(ele=>ele._id === _id)
    console.log('productObj in edit=', product)

    // const prodObj = dispatch(asyncGetProduct(_id))
    // console.log('prodObj=', prodObj)

    const formSubmission = (formData, resetForm) => {
        console.log('edit product formdata=', formData)
        dispatch(asyncEditProduct(_id, formData, resetForm))
        handleToggle()
    }
    
    return (
        <div>
            Edit Product
            <ProductForm {...product} formSubmission={formSubmission} />
        </div>
    )
}
export default EditProduct