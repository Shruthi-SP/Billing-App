import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Modal, Button } from 'react-bootstrap'
import { asyncDeleteCustomer, asyncGetAllCustomers, asyncGetCustomer } from "../../actions/customersAction"
import EditCustomer from "./EditCustomer"

const CustomersList = (props) => {
    
    const customers = useSelector((state) => {
        console.log('cust len=', state.customers.length)
        return state.customers
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(asyncGetAllCustomers())
    }, [])

    const [toggle, setToggle] = useState(false)
    const [id, setId] = useState('')
    const [search, setSearch] = useState('')
    const [tableData, setTableData] = useState(customers)
    const [show, setShow] = useState(false)
    const [result, setResult] = useState({})

    useEffect(() => {
        setTableData(customers)
    }, [customers])

    const getResult = (obj) => setResult(obj)

    const handleClose = () => setShow(false);
    const handleShow = (_id) => {
        setShow(true)
        dispatch(asyncGetCustomer(_id, getResult))
    }

    const handleToggle = () => {
        setToggle(!toggle)
    }

    const handleSearchChange = (e) => {
        const userInput = e.target.value
        setSearch(userInput)
        const newList = customers.filter(ele => ele.name.toLowerCase().includes(userInput) || (ele.mobile).includes(userInput))
        setTableData(newList)
    }

    const handleEditChange = (_id) => {
        handleToggle()
        setId(_id)
    }
    const handleDelete = (_id) => {
        dispatch(asyncDeleteCustomer(_id))
    }

    return (
        <div className='col-md-6'>
            <h2 className='mt-3 mb-3'>Customers</h2>
            <input className='form-control mb-3 mt-3' type="text" value={search} placeholder='search by name or mobile' onChange={(e) => { handleSearchChange(e) }} />
            {
                tableData.length === 0 ? <div>
                    <p>No customers. Add Customers</p>
                </div> : <div>
                    <div >
                        <h3 style={{ margin: '0px 5px' }}>Listing - {tableData.length}</h3>
                    </div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Details</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableData.map(ele => {
                                    return <tr key={ele._id}>
                                        <td>{ele.name}</td>
                                        <td>{ele.mobile}</td>
                                        <td>
                                            <Link to='#' onClick={() => { handleShow(ele._id) }}><img style={{ marginLeft: '10px' }} src='icons8-view-details-64.png' width='30px' height='32px' alt='view' /></Link>
                                        </td>
                                        <td>
                                            {
                                                (toggle && id===ele._id) ? <div>
                                                    <EditCustomer _id={id} handleToggle={handleToggle} />
                                                    <button onClick={handleToggle}>cancel</button>
                                                </div> : <Link to='#' onClick={() => { handleEditChange(ele._id) }}><img src='icons8-edit-64.png' width='30px' height='32px' alt='edit' /></Link>
                                            }
                                        </td>
                                        <td>
                                            <Link to='#' onClick={() => { handleDelete(ele._id) }}><img src='icons8-delete-64.png' width='30px' height='32px' alt='delete' /></Link>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    {Object.keys(result).length > 0 && <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Customer Information</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Name: {result.name}</p>
                            <p>Mobile: {result.mobile}</p>
                            <p>Added On: {result.createdAt.slice(0, 10)}</p>
                            <p>Customer ID: {result._id}</p>
                            {result.email && <p>Email: {result.email}</p>}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>}
                </div>
            }
        </div>
    )
}
export default CustomersList