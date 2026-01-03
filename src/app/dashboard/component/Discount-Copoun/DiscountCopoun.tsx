"use client"
import React, { useEffect, useState } from 'react';
import AddOnstable from './Component/CouponTable';
import RelayForm from './Component/DiscountForm';
import DiscountForm from './Component/DiscountForm';
import CouponManager from './Component/CouponForm';
import { useDispatch } from 'react-redux';
import { setUpdatecoupon } from '@/api/coupon';
import { AppDispatch } from '@/store/store';

const tabs = [
  { label: 'Discount', key: 'Discount' },
];

function DiscountCopoun() {
  const [activeTab, setActiveTab] = useState('Discount');
  const dispatch=useDispatch<AppDispatch>()
useEffect(()=>{
  return ()=>{
      const payload2:any=null
         dispatch(setUpdatecoupon(payload2))
  }
})
  return (
    <div className="pb-20"> {/* padding-bottom to avoid hidden content behind fixed nav */}
      {/* Top Navigation Tabs */}
      <div className="topnav">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {/* {activeTab === 'Discount' && <CouponManager />} */}
        {activeTab === 'Discount' && <DiscountForm />}
      </div>
    </div>
  );
}

export default DiscountCopoun;
