const BillCard = (props) => {
    const { statsName, data } = props
    return (
        <div className='col'>
            <div className="card border-light mb-3">
               <div className="card-header">{statsName}</div>
                <div className="card-body">
                    <h3 className="card-title">{data}</h3>
                </div>                
            </div>
        </div>
    )
}
export default BillCard