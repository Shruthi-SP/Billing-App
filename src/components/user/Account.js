import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { asyncGetUserAccount } from "../../actions/userAction"

const Account = (props) => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(asyncGetUserAccount())
    }, [])

    const user = useSelector((state)=>{
        return state.user
    })

    const regDate = () => {
        return user.createdAt.slice(0,10).split('-').reverse().join('-')
    }

    return (
        <div>
            <p>User Name: {user.username} </p>
            <p>Email: {user.email} </p>
            <p>Business: {user.businessName}</p>
            <p>Address: {user.address} </p>
            {user.createdAt && <p>Registered on: {regDate()} </p>}
        </div>
    )
}
export default Account