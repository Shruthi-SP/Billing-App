const BillCart = (props) => {
    const {lineItems, chosenCustomer, chosenProduct, getCustomerName, getProductName, incQuantity, decQuantity, removeItem, quantity} = props

    const handleDec = (id) => {
        decQuantity(id)
    }

    const handleInc = (id) => {
        incQuantity(id)
    }

    const handleRemove = (id) => {
        removeItem(id)
    }

    return(
        <div>
            <div>
                    <h4>Cart Details</h4>
                    {chosenCustomer && <h6>Customer Name - {getCustomerName(chosenCustomer)}</h6>}
                    {lineItems.length > 0 && <table className='table'>
                        <thead>
                            <tr>
                                <th>Remove</th>
                                <th>Product</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lineItems.map((ele) => {
                                return (<tr key={ele.product}>
                                    <td><button onClick={()=>handleRemove(ele.product)}>remove</button></td>
                                    <td>{getProductName(ele.product)}</td>
                                    <td><button disabled={quantity==1} onClick={()=>{handleDec(ele.product)}}>-</button> {ele.quantity}<button onClick={()=>{handleInc(ele.product)}}>+</button> </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>}
                </div>
        </div>
    )
}
export default BillCart