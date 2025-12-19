import React from 'react'
import { motion } from 'framer-motion'

type Props = {}

const FeatureSection = (props: Props) => {
  return (
    <>
      <section className="w-full flex items-center flex-col justify-center my-16 sm:my-24 lg:my-32 px-6 sm:px-8 md:px-12 lg:px-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-14 
          text-center bg-[#020034] rounded-2xl sm:rounded-3xl"
        >
          {/* content goes here */}
        </motion.div>
      </section>
    </>
  )
}

export default FeatureSection