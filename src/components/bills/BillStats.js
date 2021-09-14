const BillStats = (props) => {
    const { statsName, data } = props
    return (
        <div style={{border:'3px solid', padding:'10px'}}>
            <h1>{data}</h1>
            <h2>{statsName}</h2>                         
        </div>
    )
}
export default BillStats