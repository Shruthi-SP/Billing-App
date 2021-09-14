import AddCustomer from "./AddCustomer"
import CustomersList from "./CustomersList"

const Customers = (props) => {
    return (
        <div>
            <h2>Customers</h2>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <CustomersList />
                <AddCustomer />
            </div>
        </div>
    )
}
export default Customers