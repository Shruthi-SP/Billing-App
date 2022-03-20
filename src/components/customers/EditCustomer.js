import { useDispatch, useSelector } from "react-redux"
import { asyncEditCustomer} from "../../actions/customersAction"
import CustomerForm from "./CustomerForm"

const EditCustomer = (props) => {
    const { _id, handleToggle } = props

    const dispatch = useDispatch()

    const customers = useSelector((state)=>{
        return state.customers
    })

    const customer = customers.find(ele=>ele._id === _id)

    const formSubmission = (formData, resetForm) => {
        dispatch(asyncEditCustomer(_id, formData, resetForm))
        handleToggle()
    }
    
    return (
        <div>
            Edit Customer
            <CustomerForm {...customer} formSubmission={formSubmission} />
        </div>
    )
}
export default EditCustomer