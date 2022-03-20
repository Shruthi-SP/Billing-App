import { useSelector } from "react-redux"
import BillCard from "./BillCard"
import BillChart from "./BillChart"

const BillingDashboard = (props) => {

    const bills = useSelector((state) => {
        return state.bills
    })

    const arrAmt = bills.map(ele => ele.total)

    let sum = 0
    arrAmt.forEach(ele => {
        sum += ele
    })

    // const dateTotal = bills.map(ele=>{
    //     return {date: ele.date, total: ele.total}
    // })
    //console.log('dateTotal=', dateTotal) 
    // let month = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec']
    // let totalSales = {}
    // bills.forEach(ele => {
    //     let sum = ele.total
    //     let d = new Date(ele.date)
    //     //console.log(d)
    //     let m = month[d.getMonth()]
    //     console.log('month=', m, sum)
        
    //     if (totalSales.hasOwnProperty(m)) {
    //         totalSales[m] += sum
    //     } else {
    //         totalSales[m] = sum
    //     }
    //     console.log('totalsal',totalSales)
    // })
    // const resultChart = Object.keys(totalSales)
    //console.log('rsuCrt',resultChart)


    const data = bills.map(ele => {
        return [ele.date.slice(0, 10), ele.total]
    })

    const customers = useSelector((state) => {
        return state.customers
    })
    const products = useSelector((state) => {
        return state.products
    })

    return (
        <div style={{ marginTop: '20px' }}>
            <div style={{ marginBottom: '0px' }} className="row row-cols-1 row-cols-md-4 g-4">
                <BillCard statsName='Total Customers' data={customers.length} />
                <BillCard statsName='Total Products' data={products.length} />
                <BillCard statsName='Total Orders' data={bills.length} />
                <BillCard statsName='Total Sales' data={sum} />
            </div>
            <BillChart data={data} />
        </div>
    )
}
export default BillingDashboard