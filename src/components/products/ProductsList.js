import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncDeleteProduct, asyncGetAllProducts, asyncGetProduct } from "../../actions/productsAction"
import EditProduct from "./EditProduct"

const ProductsList = (props) => {
    const [toggle, setToggle] = useState(false)
    const [id, setId] = useState('')

    const dispatch = useDispatch()   

    const handleToggle = () => {
        setToggle(!toggle)
    }

    const products = useSelector((state)=>{
        return state.products
    })

    const handleDetails = (_id) => {
        dispatch(asyncGetProduct(_id))        
    }
    
    const handleEditChange = (_id) => {
        handleToggle()
        setId(_id)
    }
    const handleDelete = (_id) => {
        console.log('delete event')
        dispatch(asyncDeleteProduct(_id))
    }

    return (
        <div>{
                toggle && <div>
                    <EditProduct _id={id} handleToggle={handleToggle} />
                    <button onClick={handleToggle}>cancel</button>
                </div>
            }
            {
                products.length === 0 ? <div>
                    <p>No products. Add Products</p>
                </div> : <div>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Details</th>
                                        <th>Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map(ele=>{
                                            return <tr key={ele._id}>
                                                <td>{ele.name}</td>
                                                <td>{ele.price}</td>
                                                <td>
                                                    <button onClick={()=>{handleDetails(ele._id)}}>View Details</button>
                                                </td>
                                                <td>
                                                    <button onClick={()=>{handleEditChange(ele._id)}}>edit</button>
                                                    <button onClick={()=>{handleDelete(ele._id)}}>delete</button>                                                    
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                    
                </div>
            }
        </div>
    )
}
export default ProductsList