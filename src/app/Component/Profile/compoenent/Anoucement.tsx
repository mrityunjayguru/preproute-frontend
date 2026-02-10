import React from 'react'

function Anoucement() {
  return (
    <div className="p-6 bg-[#EBFAFF] border-none rounded-[8px] flex-1 flex flex-col">
        <h3 className="text-lg font-medium text-[#2D80FB] mb-6 font-poppins">
          Announcements
        </h3>
        <div className="space-y-6 flex-1">
          {[
            "New practice sets are now live. Start solving today.",
            "Keep learning streak active to earn bonus points.",
            "New mock challenge opens tomorrow at 8 PM.",
          ].map((text, i) => (
            <div
              key={i}
              className="bg-white py-4 px-3 border-l-4 border-[#2D80FB] font-dm-sans"
            >
              <div className="flex items-center gap-1 font-bold text-sm">
                <span className="text-[#2D80FB]">{text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Anoucement
