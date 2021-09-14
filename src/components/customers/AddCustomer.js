import { useDispatch } from "react-redux"
import { asyncAddCustomer } from "../../actions/customersAction"
import CustomerForm from "./CustomerForm"

const AddCustomer = (props) => {
    const dispatch = useDispatch()

    const formSubmission = (formData, resetForm) => {
        console.log('form in add customer=', formData)
        dispatch(asyncAddCustomer(formData, resetForm))
        
    }
    return (
        <div>
            <CustomerForm formSubmission={formSubmission}/>
        </div>
        
    )
}
export default AddCustomer