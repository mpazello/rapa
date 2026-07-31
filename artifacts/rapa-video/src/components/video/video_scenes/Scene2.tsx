import { motion } from "framer-motion";

const ENERGIES = [
  { name: "Calmo", color: "#b6c7eb", x: "-18vw", y: "-12vh", delay: 0.5 },
  { name: "Fluido", color: "#6FBEDA", x: "18vw", y: "-8vh", delay: 0.8 },
  { name: "Vibrante", color: "#E27B6E", x: "0vw", y: "-20vh", delay: 1.1 },
  { name: "Reflexivo", color: "#a4adbf", x: "-15vw", y: "12vh", delay: 1.4 },
  { name: "Presente", color: "#c9b892", x: "15vw", y: "16vh", delay: 1.7 },
];

export default function Scene2() {
  return (
    <motion.div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {ENERGIES.map((energy, i) => (
          <motion.div
            key={energy.name}
            className="absolute px-[3vw] py-[1.5vw] rounded-full backdrop-blur-md border border-white/10"
            style={{ 
              backgroundColor: `color-mix(in oklab, ${energy.color} 15%, transparent)`,
              color: energy.color,
              boxShadow: `0 0 30px color-mix(in oklab, ${energy.color} 20%, transparent)`
            }}
            initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1, x: energy.x, y: energy.y }}
            transition={{ 
              duration: 2, 
              delay: energy.delay, 
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span className="font-sans font-medium text-[2vw] tracking-wide">{energy.name}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="z-20 text-center max-w-4xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-[#e6ebf5] font-serif text-[6vw] leading-[1.1] tracking-tight">
          Como está sua <br/> <i className="text-[#c9b892]">energia</i> hoje?
        </h2>
      </motion.div>
    </motion.div>
  );
}
