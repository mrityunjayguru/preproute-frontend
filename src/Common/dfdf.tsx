import React, { useState } from 'react';
const DraggableWrapper = ({ children }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const startDrag = (e) => {
    setDragging(true);
    const rect = e.target.getBoundingClientRect();

    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const duringDrag = (e) => {
    if (!dragging) return;

    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const stopDrag = () => setDragging(false);

  return (
    <div
      onMouseMove={duringDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9999]"
    >
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        className="pointer-events-auto"
      >
        {React.cloneElement(children, { startDrag })}
      </div>
    </div>
  );
};
export default DraggableWrapper;
