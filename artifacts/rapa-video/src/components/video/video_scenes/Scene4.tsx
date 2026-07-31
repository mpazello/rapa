import { motion } from "framer-motion";

export default function Scene4() {
  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-[8vw] w-full max-w-[80%] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex items-center justify-center"
        >
          {/* KAI Orb Component */}
          <div className="kai-orb w-[25vw] h-[25vw] max-w-[300px] max-h-[300px]">
            <div className="kai-orb-core"></div>
          </div>
          
          {/* Floating data particles around KAI */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[1vw] h-[1vw] bg-[#b6c7eb] rounded-full blur-[2px]"
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0],
                x: (Math.random() - 0.5) * 400, 
                y: (Math.random() - 0.5) * 400 
              }}
              transition={{ 
                duration: 3 + Math.random() * 2, 
                repeat: Infinity,
                delay: Math.random() * 2 
              }}
            />
          ))}
        </motion.div>

        <div className="flex flex-col text-left">
          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#e6ebf5] font-serif text-[6.5vw] leading-[1.1] tracking-tight mb-[2vh]"
          >
            Converse com o <i className="text-[#b6c7eb]">KAI</i>.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-[#a4adbf] text-[2vw] max-w-[30vw] leading-relaxed"
          >
            Seu guia inteligente de autoconhecimento, sempre pronto para ouvir.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
