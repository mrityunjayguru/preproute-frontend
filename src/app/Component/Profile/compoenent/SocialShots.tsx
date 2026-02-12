import React from 'react'

function SocialShots() {
  return (
    <div className="space-y-4 pt-10">
            <h2 className="text-xl font-poppins font-medium text-[#FF5635]">
              Social Shots
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 overflow-y-hidden">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className="min-w-[200px] aspect-[10/16] bg-[#E8F1FF] rounded-2xl border border-blue-100/50 flex-shrink-0"
                >
                  {/* image */}
                </div>
              ))}
            </div>
          </div>
  )
}

export default SocialShots
