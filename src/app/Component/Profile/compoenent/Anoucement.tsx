import { getAnnouncement } from '@/api/Auth/Annoucement';
import { AppDispatch } from '@/store/store';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AnnoucementPopup from './AnnoucementPopup';

function Anoucement() {
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector(
    (state: any) => state?.announcement?.announcement || []
  );
  const fetchAnnouncements = async () => {
    const payload: any = {};
    await dispatch(getAnnouncement(payload));
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);
  const [toggle, settoggle] = useState(false)
  const [announcementData, setannouncementData] = useState(null)
  const annoucementPopup = async (val: any) => {
    setannouncementData(val)
    settoggle(true)
  }
  return (
    <>
      <AnnoucementPopup
        isOpen={toggle}
        onClose={() => settoggle(false)}
        data={announcementData}
      />

      <div className="p-6 bg-[#EBFAFF] border-none rounded-[8px] flex-1 flex flex-col h-full">
        <h3 className="text-lg font-medium text-[#2D80FB] mb-6 font-poppins">
          Announcements
        </h3>
        <div className="space-y-6 flex-1">
          {data.map((val: any, i: number) => (
            <div
              key={i}
              className="bg-white py-4 px-3 border-l-4 border-[#2D80FB] font-dm-sans"
            >
              <div onClick={() => annoucementPopup(val)} className="flex items-center gap-1 font-bold text-sm cursor-pointer">
                <span className="text-[#2D80FB]">{val.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Anoucement
