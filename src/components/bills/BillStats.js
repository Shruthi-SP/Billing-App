import { Modal, Button } from 'react-bootstrap'
import html2pdf from 'html2pdf.js'
import BillModal from "./BillModal"

const BillStats = (props) => {
    // const { statsName, data } = props
    // return (
    //     <div style={{border:'3px solid', padding:'10px'}}>
    //         <h1>{data}</h1>
    //         <h2>{statsName}</h2>                         
    //     </div>
    // )

    const {show, handleClose, result} = props
    console.log('bill stats props=', props)
    
    const generatePDF = () => {
        const content = document.getElementById('tab')
        html2pdf(content)
    }
    return (
        <Modal show={show} onHide={handleClose}>
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
                    </Modal>
    )
}
export default BillStats