import AddCustomer from "./AddCustomer"
import CustomersList from "./CustomersList"

const Customers = (props) => {
    return (
        <div className='row justify-content-around'>
            <CustomersList />
            <AddCustomer />
        </div>
    )
}
export default Customers