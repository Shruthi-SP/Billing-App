// import { Button } from 'react-bootstrap'
// import html2pdf from 'html2pdf.js'

const BillModal = (props) => {
    console.log('modal props=', props)
    const {result} = props
    console.log('modal-result=', result)

    return (

        <div id='tab'>
            <p>Bill ID: {result._id}</p>
            <p>Date : {result.date}</p>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>price</th>
                        <th>Quantity</th>
                        <th>Sub Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        result.lineItems.map(ele => {
                            return <tr key={ele._id}>
                                <td>{ele.product}</td>
                                <td>{ele.price}</td>
                                <td>{ele.quantity} </td>
                                <td>{ele.subTotal} </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <p>Total Bill: {result.total}</p>
            {/*<Button onClick={() => { generatePDF() }}>Download</Button>*/}
        </div>


        //     </Modal.Body>
        //     <Modal.Footer>
        //         <Button variant="secondary" onClick={handleClose}>
        //             Close
        //         </Button>
        //         <Button variant="primary" onClick={() => { generatePDF() }}>
        //             Download Bill
        //         </Button>
        //     </Modal.Footer>
        // </Modal>

    )
}
export default BillModal