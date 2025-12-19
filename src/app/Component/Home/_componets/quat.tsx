import Q1 from "@/assets/vectors/quatation/quotation-mark 1.svg";
import Q2 from "@/assets/vectors/quatation/quotation-mark 2.svg";
import Image from "next/image";
import { motion } from "framer-motion";

type Props = {};

const Quat = (props: Props) => {
  return (
    <section className="mt-12 mb-8 px-4 sm:px-6 lg:px-8" >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-10 text-center">
        <motion.div
          initial={{ opacity: 0, x: -30, rotate: -90 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="self-start -mt-2"
        >
          <Image src={Q1} alt="1" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-2xl lg:text-3xl font-bold text-center leading-snug max-w-4xl"
        >
          Exams are not just a test of knowledge, but of preparation —{" "}
          <span className="text-[#FF5635]">
            practice today to conquer tomorrow.
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, x: 30, rotate: 90 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="self-end -mb-2 rotate-360"
        >
          <Image src={Q2} alt="1" />
        </motion.div>
      </div>
    </section>
  );
};

export default Quat;
