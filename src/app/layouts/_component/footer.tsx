import SocialMedia from '@/app/Component/Home/_componets/social-media'
import React from 'react'
import Image from 'next/image'
import FOOTERLOGO from '@/assets/vectors/footer-logo.svg'

type Props = {}

const Footer = (props: Props) => {
  return (
     <section
        className="bg-[#FF5635] text-white px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 mt-8 sm:mt-12 md:mt-20 py-4 sm:py-5 lg:py-6 xl:py-8"
      >
        <div className="mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-6 sm:gap-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-28">
          <div
            className="flex flex-col gap-2 items-center md:items-start text-center md:text-left"
          >
            {/* Logo */}
            <div className="w-[100px] sm:w-[130px] md:w-[160px] lg:w-[200px]">
              <Image
                src={FOOTERLOGO}
                alt="preproute-logo"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          <div
            className="flex flex-col items-center md:items-start gap-2 sm:gap-3"
          >
            <SocialMedia />
          </div>
        </div>
      </section>
  )
}

export default Footer