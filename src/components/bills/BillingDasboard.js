import { useEffect } from "react"
import { useSelector } from "react-redux"
import BillStats from "./BillStats"

const BillingDashboard = (props) => {

    const bills = useSelector((state)=>{
        return state.bills
    })
    const arrAmt = bills.map(ele=>ele.total)
    console.log('arrAmt',arrAmt)
    let sum=0
    arrAmt.forEach(ele=>{
        sum+=ele
    })
    console.log('amt=', sum)

    const customers = useSelector((state)=>{
        return state.customers
    })
    const products = useSelector((state)=>{
        return state.products
    })

    return (
        <div style={{marginTop: '50px', textAlign: 'center', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            <BillStats statsName='Total Customers' data={customers.length}/>
            <BillStats statsName='Total Products' data={products.length}/>
            <BillStats statsName='Total Orders' data={bills.length}/>
            <BillStats statsName='Total Sales' data={sum}/>
        </div>
    )
}
export default BillingDashboard