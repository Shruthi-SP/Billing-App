import BillsList from "./BillsList"
import BillForm from "./BillForm"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { asyncGetAllCustomers } from "../../actions/customersAction"
import { asyncGetAllProducts } from "../../actions/productsAction"
import BillForm1 from "./BillForm1"

const Billings = (props) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(asyncGetAllCustomers()) 
        dispatch(asyncGetAllProducts())   
    })

    return (
        <div className='row justify-content-around'>
            <BillsList />
            <BillForm1 />
        </div>
    )
}
export default Billings