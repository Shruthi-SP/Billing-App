import ProductsList from "./ProductsList"
import AddProduct from "./AddProduct"

const Products = (props) => {
    return (
        <div>
            <h2>Products</h2>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <ProductsList />
                <AddProduct />
            </div>
        </div>
    )
}
export default Products