import { useDispatch, useSelector } from "react-redux"
import { asyncEditCustomer, asyncGetCustomer } from "../../actions/customersAction"
import CustomerForm from "./CustomerForm"

const EditCustomer = (props) => {
    //console.log('edit customer props=', props)
    const { _id, handleToggle } = props

    const dispatch = useDispatch()

    const customers = useSelector((state)=>{
        return state.customers
    })

    const customer = customers.find(ele=>ele._id === _id)
    console.log('customerObj in edit=', customer)

    // const custObj = dispatch(asyncGetCustomer(_id))
    // console.log('custObj=', custObj)

    const formSubmission = (formData, resetForm) => {
        console.log('edit customer formdata=', formData)
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