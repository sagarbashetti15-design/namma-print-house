import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('/api/orders');
      } catch (err) {
        console.error('Fetch orders error:', err);
        showToast('Failed to fetch orders from backend', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [showToast]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axios.put(`/api/orders/${orderId}/status`, { status: newStatus });
      setOrders(prev => prev.map(o => o._id === orderId ? res.data : o));
      showToast(`Order status updated to ${newStatus}`, 'success');
      
      if (res.data.trackingUrl) {
        showToast(`Shipping label generated: ${res.data.trackingUrl}`, 'success');
      }
    } catch (err) {
      console.error('Update status error:', err);
      showToast('Failed to update order status', 'error');
    }
  };

  if (loading) return <div className="container admin-dashboard">Loading Orders...</div>;

  return (
    <div className="container admin-dashboard">
      <div className="admin-header">
        <h1>Admin Operations Dashboard</h1>
        <p>Manage store orders, fulfillment, and customer data</p>
      </div>

      <div className="admin-content">
        <h2>Recent Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found in the database.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id.substring(0, 8)}...</td>
                    <td>{order.user?.name || 'Guest'} <br/><small>{order.user?.email}</small></td>
                    <td>₹{order.totalAmount}</td>
                    <td>
                      <span className={`status-badge status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                      {order.trackingUrl && (
                        <div style={{ marginTop: '8px' }}>
                          <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: '#007bff', textDecoration: 'underline' }}>
                            Track Shipment
                          </a>
                        </div>
                      )}
                    </td>
                    <td>
                      <select 
                        className="status-select"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
