import { useSelector } from "react-redux"

const BillModal = (props) => {

    const products = useSelector((state) => {
        return state.products
    })

    const {result} = props

    const getProductName = (_id) => {
        const getProdObj = products.find(ele => ele._id === _id)
        return getProdObj.name
    }

    return (
        <div id='tab' className='container'>
            <p>Bill ID: {result._id}</p>
            <p>Date : {result.date.slice(0,10)}</p>
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
                                <td>{getProductName(ele.product)}</td>
                                <td>{ele.price}</td>
                                <td>{ele.quantity} </td>
                                <td>{ele.subTotal} </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div className='row'>
                <h5 style={{marginRight:'50xp'}} className='col-md-8'>Total Bill: </h5>
                <h5 style={{marginRight:'50xp'}} className='col-md-4'>{result.total}</h5>
            </div>            
        </div>
    )
}
export default BillModal