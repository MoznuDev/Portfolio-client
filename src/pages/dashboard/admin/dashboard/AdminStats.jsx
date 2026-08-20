

const AdminStats = ({stats}) => {

  return (
    <div className="my-5 space-y-5">
        <div className="grid sm:grid-cols-2  lg:grid-cols-4 gap-4">
  <div className="bg-white shadow-md rounded-lg p-4 hover:border-red-300 hover:shadow-lg transition-all duration-300 hover:scale-105 border">
    <h3 className="text-lg font-semibold">Total Earnings</h3>
    <p className="text-gray-600">${stats?.totalEarnings}</p>
  </div>

  <div className="bg-white shadow-md rounded-lg p-4 hover:border-red-300 hover:shadow-lg transition-all duration-300 hover:scale-105 border">
    <h3 className="text-lg font-semibold">All Orders</h3>
    <p className="text-gray-600">{stats?.totalOrders}</p>
  </div>

  <div className="bg-white shadow-md rounded-lg p-4 hover:border-red-300 hover:shadow-lg transition-all duration-300 hover:scale-105 border">
    <h3 className="text-lg font-semibold">All Users</h3>
    <p className="text-gray-600">{stats?.totalUsers}</p>
  </div>

  <div className="bg-white shadow-md rounded-lg p-4 hover:border-red-300 hover:shadow-lg transition-all duration-300 hover:scale-105 border">
    <h3 className="text-lg font-semibold">Total Products</h3>
    <p className="text-gray-600">{stats?.totalProducts}</p>
  </div>
</div>
    </div>
  )
}

export default AdminStats