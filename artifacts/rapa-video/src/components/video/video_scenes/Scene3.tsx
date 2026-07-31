import { motion } from "framer-motion";

export default function Scene3() {
  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(15px)" }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] opacity-40 z-0"
        initial={{ rotate: -20, scale: 0.8, opacity: 0 }}
        animate={{ rotate: 10, scale: 1, opacity: 0.5 }}
        transition={{ duration: 15, ease: "linear" }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/tzolkin-mandala.png`} 
          alt="Tzolkin Mandala" 
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(201,184,146,0.3)]"
        />
      </motion.div>

      <div className="z-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[#c9b892] tracking-[0.2em] uppercase text-[1.5vw] mb-[2vh]"
        >
          Ciclos Tzolkin
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#e6ebf5] font-serif text-[5.5vw] leading-[1.1] mb-[4vh]"
        >
          Sincronize com o <br/><i className="text-[#6FBEDA]">tempo natural</i>.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 2, ease: [0.16, 1, 0.3, 1] }}
          className="px-[3vw] py-[1.5vh] rounded-2xl bg-[#141821]/80 backdrop-blur-xl border border-[#262d3c] flex flex-col items-center"
        >
          <span className="font-sans text-[#a4adbf] text-[1.2vw] tracking-wider mb-1">HOJE</span>
          <span className="font-serif text-[#b6c7eb] text-[3vw]">Kin 227: Mão Rítmica Azul</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
