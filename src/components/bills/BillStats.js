import { Modal, Button } from 'react-bootstrap'
import html2pdf from 'html2pdf.js'
import BillModal from "./BillModal"

const BillStats = (props) => {
    const {show, handleClose, result} = props
    
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