import {Pie, Line} from "react-chartjs-2";
import 'chart.js/auto'

const AdminStatsChart = ({stats}) => {

    const pieData ={
        labels: ['Total Earnings', 'Total Orders', 'Total Users', 'All Products'],
        datasets: [{
            label: 'Admin Stats',
            data:[
                stats?.totalEarnings ,
                 stats?.totalOrders ,
                 stats?.totalUsers,
                 stats?.totalProducts
            ],
            backgroundColor:[
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
            ],
            borderColor:[
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
            ],
            borderWidth:1,
            hoverBackgroundColor:
            [
               ' #FF6384',
               '#36A2EB',
               '#FFCE56',
               '#4BC0C0',
          
            ]
        }]
    }

    // Line chart 
  const months=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", 'Sep', "Oct", "Nov", "Dec"] 
const data = new Array(12).fill(0);

stats?.monthlyEarnings?.forEach((entry) => {
  const index = months.indexOf(entry.month);

  if (index !== -1) {
    data[index] = entry.earnings;
  }
});
const lineData = {
  labels: months,
  datasets:[{
    label: 'Monthly Earnings',
    data,
    fill: false,
    backgroundColor: '#36A2EB',
    borderColor: '#36A2EB',
    tension: 0.1
  }]
};


    const options ={
        responsive:true,
        maintainAspectRatio: false,
    }
  return (
    <div className="mt-12 space-y-8">
        <h2 className="text-xl font-semibold mb-4">Admin Stats Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* pie chart  */}
            <div className="max-h-96 md:h-96 w-full"> <Pie data={pieData} options={options}/></div>
            {/* line chart  */}
            <div className="max-h-96 md:h-96 w-full">
                <Line data={lineData} options={options} />
                
            </div>
        </div>
    </div>
  )
}

export default AdminStatsChart