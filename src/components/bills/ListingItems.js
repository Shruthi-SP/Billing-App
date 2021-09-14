const ListingItems = (props) => {
    const {lineItems, chosenCustomer} = props
    return(
        <div>Cart Details
                    {chosenCustomer && <p>Customer Name - {chosenCustomer}</p>}
                    {lineItems.length > 0 && <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lineItems.map((ele,i)=>{
                                return (<tr key={i}>
                                    <td>{ele.product}</td>
                                    <td>{ele.quantity}</td>
                                </tr>)
                            })}
                        </tbody>
                        </table>}
                </div>
    )
}
export default ListingItems