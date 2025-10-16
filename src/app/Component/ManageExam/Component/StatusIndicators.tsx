import React from 'react';

// 1. Define the styles for the complex pentagon shape using clipPath
const pentagonShapeStyle = {
  width: '50px',
  height: '30px',
  position: 'relative',
  marginRight: '10px',
  // This clip-path defines the house/pentagon shape
  clipPath: 'polygon(0% 25%, 50% 0%, 100% 25%, 100% 100%, 0% 100%)',
};

// 2. Define the styles for the circle shape
const circleShapeStyle = {
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  marginRight: '10px',
};

// 3. Reusable Indicator Component
const Indicator = ({ color, label, shape }) => {
  const shapeStyles = shape === 'pentagon' 
    ? { ...pentagonShapeStyle, backgroundColor: color } 
    : { ...circleShapeStyle, backgroundColor: color };

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '10px 20px 10px 0' }}>
      <div style={shapeStyles} />
      <span style={{ fontSize: '16px', color: '#333' }}>
        {label}
      </span>
    </div>
  );
};

// 4. Main Component to render all indicators
const StatusIndicators = () => {
  // Data for all four indicators
  const indicatorsData = [
    { color: '#8BC34A', label: 'Answered', shape: 'pentagon' },      // Light Green
    { color: '#F44336', label: 'Not Answered', shape: 'pentagon' },  // Red
    { color: '#AED581', label: 'Not Visited', shape: 'pentagon' },   // A slightly different green for distinction
    { color: '#9C27B0', label: 'Marked for Review', shape: 'circle' },// Purple
  ];

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'auto auto', 
      gap: '10px 20px', 
      padding: '10px',
      border: '1px solid #eee'
    }}>
      {indicatorsData.map((data, index) => (
        <Indicator 
          key={index}
          color={data.color}
          label={data.label}
          shape={data.shape}
        />
      ))}
    </div>
  );
};

export default StatusIndicators;