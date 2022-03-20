import { useDispatch } from "react-redux"
import { asyncAddCustomer } from "../../actions/customersAction"
import CustomerForm from "./CustomerForm"

const AddCustomer = (props) => {
    const dispatch = useDispatch()

    const formSubmission = (formData, resetForm) => {
        dispatch(asyncAddCustomer(formData, resetForm))
        
    }
    return (
        <div className='col-md-4'>
            <CustomerForm formSubmission={formSubmission}/>
        </div>
        
    )
}
export default AddCustomer