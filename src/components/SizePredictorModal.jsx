import React, { useState, useEffect } from 'react';
import { X, Ruler } from 'lucide-react';
import './SizePredictorModal.css';

const SizePredictorModal = ({ isOpen, onClose, onApplySize }) => {
  const [height, setHeight] = useState(170); // in cm
  const [weight, setWeight] = useState(65); // in kg
  const [suggestedSize, setSuggestedSize] = useState('M');

  // Compute recommended size dynamically
  useEffect(() => {
    let size = 'M';
    
    // Height thresholds
    if (height < 155) {
      size = 'XS';
    } else if (height >= 155 && height < 165) {
      size = 'S';
    } else if (height >= 165 && height <= 175) {
      size = 'M';
    } else if (height > 175 && height <= 183) {
      size = 'L';
    } else if (height > 183 && height <= 190) {
      size = 'XL';
    } else {
      size = 'XXL';
    }

    // Weight adjustments
    if (weight < 50) {
      if (size === 'S') size = 'XS';
      else if (size === 'M') size = 'S';
      else if (size === 'L') size = 'M';
      else if (size === 'XL') size = 'L';
      else if (size === 'XXL') size = 'XL';
    } else if (weight >= 50 && weight < 55) {
      if (size === 'M') size = 'S';
      else if (size === 'L') size = 'M';
      else if (size === 'XL') size = 'L';
    } else if (weight >= 73 && weight <= 85) {
      if (size === 'XS') size = 'S';
      else if (size === 'S') size = 'M';
      else if (size === 'M') size = 'L';
      else if (size === 'L') size = 'XL';
      else if (size === 'XL') size = 'XXL';
    } else if (weight > 85 && weight <= 95) {
      if (size !== 'XXL') size = 'XL';
    } else if (weight > 95) {
      size = 'XXL';
    }

    setSuggestedSize(size);
  }, [height, weight]);

  if (!isOpen) return null;

  return (
    <div className="sp-modal-overlay" onClick={onClose}>
      <div className="sp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sp-header">
          <div className="sp-title-group">
            <Ruler size={20} className="sp-icon" />
            <h2>Find Your Perfect Fit</h2>
          </div>
          <button className="sp-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="sp-body">
          <p className="sp-intro">
            Input your height and weight below. We'll analyze your stats to predict the ideal size for our oversized streetwear collection.
          </p>

          <div className="sp-sliders">
            {/* Height Slider */}
            <div className="sp-slider-group">
              <div className="sp-slider-label">
                <span>Height</span>
                <span className="sp-val">{height} cm ({Math.floor(height / 30.48)}' {Math.round((height % 30.48) / 2.54)}")</span>
              </div>
              <input 
                type="range" 
                min="145" 
                max="205" 
                value={height} 
                onChange={(e) => setHeight(parseInt(e.target.value))}
                className="sp-range-input"
              />
              <div className="sp-range-bounds">
                <span>145 cm</span>
                <span>205 cm</span>
              </div>
            </div>

            {/* Weight Slider */}
            <div className="sp-slider-group">
              <div className="sp-slider-label">
                <span>Weight</span>
                <span className="sp-val">{weight} kg ({Math.round(weight * 2.20462)} lbs)</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="120" 
                value={weight} 
                onChange={(e) => setWeight(parseInt(e.target.value))}
                className="sp-range-input"
              />
              <div className="sp-range-bounds">
                <span>40 kg</span>
                <span>120 kg</span>
              </div>
            </div>
          </div>

          <div className="sp-result-box">
            <span className="sp-result-lbl">Recommended Size:</span>
            <div className="sp-result-value">{suggestedSize}</div>
            <p className="sp-result-desc">
              Our tees have a relaxed, boxy oversized fit. Size <strong>{suggestedSize}</strong> will give you that premium drop-shoulder look.
            </p>
          </div>

          <button 
            className="btn btn-navy sp-apply-btn" 
            onClick={() => {
              onApplySize(suggestedSize);
              onClose();
            }}
          >
            APPLY SIZE {suggestedSize}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizePredictorModal;
