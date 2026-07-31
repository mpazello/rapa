import { motion } from "framer-motion";

export default function Scene1() {
  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col items-center text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#a4adbf] font-sans tracking-[0.2em] uppercase text-[1.5vw] mb-4"
        >
          Bem-estar & Jornada
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 40, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[#e6ebf5] font-serif text-[7vw] leading-[1.1] tracking-tight"
          style={{ perspective: 1000 }}
        >
          A sua <i className="text-[#c9b892] italic">jornada pessoal</i><br/>
          começa aqui.
        </motion.h1>
      </div>
    </motion.div>
  );
}
