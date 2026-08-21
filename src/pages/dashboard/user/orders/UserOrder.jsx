import { useSelector } from "react-redux";
import Loading from "../../../../components/Loading";

const UserOrders = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    data: orderData,
    isLoading,
    error,
  } = useGetOrdersByEmailQuery(user?.email);

  if (isLoading) return <Loading />;

  if (error) {
    return <div className="error-text">Failed to load your orders!</div>;
  }

  const orders = orderData?.data || [];

  return (
    <div className="orders-container">
      <h2 className="orders-title">My Orders</h2>

      {orders.length === 0 ? (
        <p className="no-orders">You haven't placed any orders yet.</p>
      ) : (
        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Order ID</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order._id}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    <span
                      className={`status-badge ${order.status?.toLowerCase()}`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserOrders;
