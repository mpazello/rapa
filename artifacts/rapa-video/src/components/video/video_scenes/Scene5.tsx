import { motion } from "framer-motion";

export default function Scene5() {
  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0e1116]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute inset-0 bg-[#b6c7eb] blur-[60px] opacity-10 rounded-full" />
          <h1 className="text-[#e6ebf5] font-serif text-[12vw] leading-none tracking-tighter">
            RAPPAA
          </h1>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[#a4adbf] text-[2vw] mt-[2vh] tracking-wider"
        >
          O seu bem-estar, <span className="text-[#c9b892] italic">no seu tempo.</span>
        </motion.p>
      </div>
    </motion.div>
  );
}
