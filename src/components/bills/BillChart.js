import React from 'react'
import {GoogleCharts} from 'google-charts'

const BillChart = (props) =>{
    const {data} = props
    const chartData = [['Date', 'Sales'], ...data]

    GoogleCharts.load(drawChart);
 
    function drawChart() {
    
        // Standard google charts functionality is available as GoogleCharts.api after load
        const data = GoogleCharts.api.visualization.arrayToDataTable(chartData);
        var options = {
            isStacked: true,
            hAxis: {
            title: 'Date of Sale'
            },
            vAxis: {
            title: 'Total Sales'
            }
        };
        const col_chart = new GoogleCharts.api.visualization.ColumnChart(document.getElementById('chart1'));
        col_chart.draw(data, options);
    }
    return (
        <div id='chart1' style={{marginBottom:'0px', width:'850px', height:'500px'}}></div>
    )
}
export default BillChart