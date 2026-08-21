const UserStats = ({ stats }) => {
  return (
    <div className="my-5 space-y-5">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-between">
        <div className="bg-white shadow-md rounded-lg p-4 hover:border-red-300 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 border ">
          <h3 className="text-lg font-semibold ">Total Payments</h3>
          <p className="text-gray-600">${stats?.totalPayments || 0}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 hover:border-red-300 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 border ">
          <h3 className="text-lg font-semibold ">Total Purchased Products</h3>
          <p className="text-gray-600">${stats?.totalPurchasedProducts || 0}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 hover:border-red-300 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 border ">
          <h3 className="text-lg font-semibold ">Total Reviews</h3>
          <p className="text-gray-600">{stats?.totalReviews || 0}</p>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default UserStats;
