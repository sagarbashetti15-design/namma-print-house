import React from 'react';
import './InfoPage.css';

const SizeGuide = () => {
  return (
    <div className="info-page">
      <div className="info-header">
        <h1 className="info-title">SIZE GUIDE</h1>
        <p className="info-subtitle">Find Your Perfect Oversized Fit</p>
      </div>

      <div className="info-section">
        <h2>Oversized T-Shirts Sizing Chart</h2>
        <p>Our t-shirts are designed with a modern <strong>oversized streetwear fit</strong>, featuring dropped shoulders, wider chests, and slightly longer sleeves. If you prefer a regular fit, we recommend ordering one size down from your usual size.</p>
        
        <div className="size-table-container">
          <table className="size-table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Chest (Inches)</th>
                <th>Length (Inches)</th>
                <th>Sleeve Length (Inches)</th>
                <th>Shoulder width (Inches)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>S</strong></td>
                <td>42"</td>
                <td>27.5"</td>
                <td>9.0"</td>
                <td>20.5"</td>
              </tr>
              <tr>
                <td><strong>M</strong></td>
                <td>44"</td>
                <td>28.5"</td>
                <td>9.5"</td>
                <td>21.5"</td>
              </tr>
              <tr>
                <td><strong>L</strong></td>
                <td>46"</td>
                <td>29.5"</td>
                <td>10.0"</td>
                <td>22.5"</td>
              </tr>
              <tr>
                <td><strong>XL</strong></td>
                <td>48"</td>
                <td>30.5"</td>
                <td>10.5"</td>
                <td>23.5"</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="info-section">
        <h2>How to Measure</h2>
        <ul className="info-list">
          <li><strong>Chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal under your arms.</li>
          <li><strong>Length:</strong> Measure from the highest point of your shoulder down to the bottom hem of the shirt.</li>
          <li><strong>Sleeve:</strong> Measure from the base of your neck, across your shoulder joint, and down to the sleeve edge.</li>
        </ul>
      </div>

      <div className="info-section">
        <h2>Fit Guide & Styling</h2>
        <p>Our 240 GSM heavy cotton fabric holds its structure, giving a clean boxy silhouette. We recommend pairing our oversized tees with baggy cargo pants, relaxed jeans, or streetwear shorts for the ultimate look.</p>
      </div>
    </div>
  );
};

export default SizeGuide;
