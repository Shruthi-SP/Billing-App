import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal, Button } from 'react-bootstrap'
import html2pdf from 'html2pdf.js'

import { asyncDeleteBill, asyncGetBill } from '../../actions/billsAction'
import BillModal from "./BillModal"

const BillsList = (props) => {

    const dispatch = useDispatch()

    const [show, setShow] = useState(false)
    const [result, setResult] = useState({})

    const getResult = (obj) => {
        console.log('get result for modal=', obj)
        setResult(obj)
    }

    const handleClose = () => setShow(false);
    const handleShow = (_id) => {
        setShow(true)
        dispatch(asyncGetBill(_id, getResult))
    }


    const bills = useSelector((state) => {
        return state.bills
    })
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

    // const handleDetails = (_id) => {
    //     dispatch(asyncGetBill(_id))
    // }
    const handleDelete = (_id) => {
        dispatch(asyncDeleteBill(_id))
    }
    const generatePDF = () => {
        const content = document.getElementById('tab')
        html2pdf(content)
    }

    return (
        <div>
            <h2>Bills -  {bills.length} </h2>
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bills.map(ele => {
                                    return <tr key={ele._id}>
                                        <td>{ele.date.slice(0, 10)}</td>
                                        <td>{customerName(ele.customer)}</td>
                                        <td>{ele.total}</td>
                                        <td><button onClick={() => { handleShow(ele._id) }}>Details</button></td>
                                        <td><button onClick={() => { handleDelete(ele._id) }}>delete</button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    { Object.keys(result).length > 0 && <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Bill</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <BillModal handleClose={handleClose} show={show} result={result} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={() => { generatePDF() }}>
                                Download Bill
                            </Button>
                        </Modal.Footer>
                    </Modal>}
                </div>
            }
        </div>
    )
}
export default BillsList