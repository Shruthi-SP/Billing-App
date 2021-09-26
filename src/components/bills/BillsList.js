import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { Modal, Button } from 'react-bootstrap'
// import html2pdf from 'html2pdf.js'
import { asyncDeleteBill, asyncGetAllBills, asyncGetBill } from '../../actions/billsAction'
// import BillModal from "./BillModal"
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
        console.log('get result for modal=', obj)
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
                return ele._id == _id
            })
            if (custObj) {
                return custObj.name
            } else return 'unknown'
        }
    }
    const handleSearchChange = (e) => {
        const userInput = e.target.value
        setSearch(userInput)

        const newList = bills.filter(ele => {  
            console.log('ele=',ele)          
            if((ele.date).includes(userInput)){
                return ele
            }
        })
        console.log(newList)
        setTableData(newList)
    }
    
    const handleDelete = (_id) => {
        dispatch(asyncDeleteBill(_id))
    }
    // const generatePDF = () => {
    //     const content = document.getElementById('tab')
    //     html2pdf(content)
    // }

    return (
        <div>
            <h2>Bills -  {bills.length} </h2>
            <input className='form-control mb-3 mt-3' type="text" value={search} placeholder='search' onChange={(e) => { handleSearchChange(e) }} />
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