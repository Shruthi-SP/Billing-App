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

    const [toggle, setToggle] = useState(false)
    const [id, setId] = useState('')
    const [search, setSearch] = useState('')
    const [tableData, setTableData] = useState([])
    const [show, setShow] = useState(false)
    const [result, setResult] = useState({})

    useEffect(() => {
        setTableData(customers)
    }, [customers])

    const dispatch = useDispatch()

    const getResult = (obj) => {
        console.log('get result for modal=', obj)
        setResult(obj)
    }

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

        const newList = customers.filter(ele => {
            console.log(customers)
            return ele.name.toLowerCase().includes(userInput) || String(ele.mobile).includes(userInput)
        })
        console.log(newList)
        setTableData(newList)
    }

    // const handleDetails = (_id) => {
    //     dispatch(asyncGetCustomer(_id))

    // }

    const handleEditChange = (_id) => {
        handleToggle()
        setId(_id)
    }
    const handleDelete = (_id) => {
        console.log('delete event')
        dispatch(asyncDeleteCustomer(_id))
    }

    return (
        <div>
            {
                toggle && <div>
                    <EditCustomer _id={id} handleToggle={handleToggle} />
                    <button onClick={handleToggle}>cancel</button>
                </div>
            }
            {
                tableData.length === 0 ? <div>
                    <p>No customers. Add Customers</p>
                </div> : <div>
                    <div >
                        <h3 style={{ margin: '0px 5px' }}>Listing Customers - {tableData.length}</h3>
                        <input className='form-control mb-3 mt-3' type="text" value={search} placeholder='search' onChange={(e) => { handleSearchChange(e) }} />
                    </div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Details</th>
                                <th>Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tableData.map(ele => {
                                    return <tr key={ele._id}>
                                        <td>{ele.name}</td>
                                        <td>{ele.mobile}</td>
                                        <td>
                                            <button onClick={() => { handleShow(ele._id) }}>Details</button>
                                        </td>
                                        <td>
                                            <Link to='#' onClick={() => { handleEditChange(ele._id) }}><img src='icons8-edit-64.png' width='30px' height='32px' /></Link>
                                            <Link to='#' onClick={() => { handleDelete(ele._id) }}><img src='icons8-delete-64.png' width='30px' height='32px' /></Link>
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
                             <p>Added On: {result.createdAt}</p>
                             <p>ID: {result._id}</p>
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