import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import { IoBagHandleOutline, IoTimeOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import './MyOrders.css'; // We'll create this right after

const MyOrders = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }

    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', currentUser.uid),
          // Note: you may need a composite index in Firestore for where + orderBy. 
          // If orderBy fails initially, Firestore will provide a link in the console to create it.
          // For now, we will fetch and then sort on the client to avoid immediate index errors on launch.
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedOrders = [];
        querySnapshot.forEach((doc) => {
          fetchedOrders.push({ firestoreId: doc.id, ...doc.data() });
        });

        // Client-side sort by timestamp descending (newest first)
        fetchedOrders.sort((a, b) => {
          const timeA = a.timestamp || 0;
          const timeB = b.timestamp || 0;
          return timeB - timeA;
        });

        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser, navigate]);

  if (loading) {
    return (
      <div className="container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Loading your orders...</h2>
      </div>
    );
  }

  return (
    <div className="container my-orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track and manage your recent purchases</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <IoBagHandleOutline size={64} color="#ccc" />
          <h2>You haven't placed any orders yet!</h2>
          <p>Once you purchase something, it will appear here.</p>
          <Link to="/" className="primary-btn" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '20px' }}>Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.firestoreId} className="order-card">
              <div className="order-card-header">
                <div className="order-meta">
                  <span className="order-id">Order #{order.id}</span>
                  <span className="order-date"><IoTimeOutline /> {order.date}</span>
                </div>
                <div className={`order-status status-${order.status ? order.status.replace(/\s+/g, '-').toLowerCase() : 'pending'}`}>
                  {order.status || 'Processing'}
                </div>
              </div>
              
              <div className="order-items">
                {order.items && order.items.map((item, index) => (
                  <div key={index} className="order-item-row">
                    <img src={item.image} alt={item.title} className="order-item-image" />
                    <div className="order-item-details">
                      <h4>{item.title}</h4>
                      <p>Size: {item.size} {item.color && `| Color: ${item.color}`}</p>
                      <p>Qty: {item.quantity} × ₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-card-footer">
                <div className="payment-info">
                  <span className="payment-method">Paid via {order.paymentMethod}</span>
                  {order.utrNumber && <span className="utr-number">Ref: {order.utrNumber}</span>}
                </div>
                <div className="order-total">
                  Total: <strong>₹{order.total}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
