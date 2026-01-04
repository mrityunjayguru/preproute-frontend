import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import PREPBANNER from "@/assets/images/IPMAT2026.svg"
import { useRouter } from "next/navigation";

type Props = {}

const FeatureSection = (props: Props) => {
    const router = useRouter();
  
  return (
    <>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className=" my-14 sm:my-24 lg:my-32 px-6 sm:px-8 md:px-12 lg:px-28
          text-center rounded-2xl sm:rounded-3xl "
        >
          <Image onClick={()=>router.push("/PlanandPricing")}
          src={PREPBANNER} 
          alt='prep-banner'
          className='w-full'
          width={100}
          height={100}
          />
        </motion.div>
    </>
  )
}

export default FeatureSection