import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncDeleteBill, asyncGetAllBills, asyncGetBill } from '../../actions/billsAction'
import { Link } from "react-router-dom"
import BillStats from "./BillStats"

const BillsList = (props) => {

    const dispatch = useDispatch()

    const bills = useSelector((state) => {
        return state.bills
    })

    useEffect(()=>{
        dispatch(asyncGetAllBills())
    }, [])

    const [search, setSearch] = useState('')
    const [tableData, setTableData] = useState(bills)
    const [show, setShow] = useState(false)
    const [result, setResult] = useState({})

    useEffect(() => {
        setTableData(bills)
    }, [bills])

    const getResult = (obj) => {
        setResult(obj)
    }

    const handleClose = () => setShow(false);
    const handleShow = (_id) => {
        setShow(true)
        dispatch(asyncGetBill(_id, getResult))
    }

    const customers = useSelector((state) => {
        return state.customers
    })
    const customerName = (_id) => {
        if (customers.length > 0) {
            const custObj = customers.find(ele => {
                return ele._id === _id
            })
            if (custObj) {
                return custObj.name
            } else return 'unknown'
        }
    }
    const handleSearchChange = (e) => {
        const userInput = e.target.value
        setSearch(userInput)
        const newList = bills.filter(ele =>(ele.date).includes(userInput)||customerName(ele.customer).includes(userInput))
        setTableData(newList)
    }
    
    const handleDelete = (_id) => {
        dispatch(asyncDeleteBill(_id))
    }

    return (
        <div className='col-md-6'>
            <h2 className='mt-3' >Bills -  {bills.length} </h2>
            <input className='form-control mb-3 mt-3' type="text" value={search} placeholder='search by date or customer name' onChange={(e) => { handleSearchChange(e) }} />
            {
                bills.length === 0 ? <div>
                    <p>No bills. Add Bill</p>
                </div> : <div>
                    <table  className='table'>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Total Bill</th>
                                <th>View</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableData.map(ele => {
                                    return <tr key={ele._id}>
                                        <td>{ele.date.slice(0, 10)}</td>
                                        <td>{customerName(ele.customer)}</td>
                                        <td>{ele.total}</td>
                                        <td><Link to='#' onClick={() => { handleShow(ele._id) }}><img style={{ marginLeft: '10px' }} src='icons8-view-details-64.png' width='30px' height='32px' alt='view' /></Link></td>
                                        <td><Link to='#' onClick={() => { handleDelete(ele._id) }}><img style={{ marginLeft: '10px' }}src='icons8-delete-64.png' width='30px' height='32px' alt='delete' /></Link></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    { Object.keys(result).length > 0 && <BillStats handleClose={handleClose} show={show} result={result} />}
                </div>
            }
        </div>
    )
}
export default BillsList