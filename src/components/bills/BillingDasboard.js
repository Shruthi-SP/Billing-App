import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import BillCard from "./BillCard"
import BillChart from "./BillChart"
//import BillStats from "./BillStats"

const BillingDashboard = (props) => {

    const bills = useSelector((state) => {
        return state.bills
    })

    const [billData, setBillData] = useState(bills)

    useEffect(() => {
        setBillData(bills)
    })

    const data = bills.map(ele => {
        return [ele.date.slice(0, 10), ele.total]
    })
    console.log('Bill data =', data)

    const arrAmt = bills.map(ele => ele.total)
    console.log('arrAmt', arrAmt)
    let sum = 0
    arrAmt.forEach(ele => {
        sum += ele
    })
    console.log('amt=', sum)

    const customers = useSelector((state) => {
        return state.customers
    })
    const products = useSelector((state) => {
        return state.products
    })

    return (
        <div style={{marginTop:'20px'}}>
            <div style={{marginBottom:'0px'}} className="row row-cols-1 row-cols-md-4 g-4">
                    <BillCard statsName='Total Customers' data={customers.length} />
                    <BillCard statsName='Total Products' data={products.length}/>
                    <BillCard statsName='Total Orders' data={bills.length}/>
                    <BillCard statsName='Total Sales' data={sum}/>
            </div>           
            <BillChart data={data} />
        </div>
    )
}
export default BillingDashboard