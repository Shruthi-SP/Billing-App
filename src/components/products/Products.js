import ProductsList from "./ProductsList"
import AddProduct from "./AddProduct"

const Products = (props) => {
    return (
        <div className='row justify-content-around'>
            <ProductsList />
            <AddProduct />
        </div>
    )
}
export default Products