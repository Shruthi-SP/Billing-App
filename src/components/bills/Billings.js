import BillsList from "./BillsList"
import BillForm from "./BillForm"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { asyncGetAllCustomers } from "../../actions/customersAction"
import { asyncGetAllProducts } from "../../actions/productsAction"

const Billings = (props) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(asyncGetAllCustomers()) 
        dispatch(asyncGetAllProducts())   
    })

    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <BillsList />
            <BillForm />
        </div>
    )
}
export default Billings