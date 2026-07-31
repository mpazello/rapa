import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Scene1 from "./video_scenes/Scene1";
import Scene2 from "./video_scenes/Scene2";
import Scene3 from "./video_scenes/Scene3";
import Scene4 from "./video_scenes/Scene4";
import Scene5 from "./video_scenes/Scene5";
import { useVideoPlayer } from "../../lib/video/hooks";

export const SCENE_DURATIONS: Record<string, number> = {
  intro: 4000,
  energia: 5500,
  ciclos: 5000,
  kai: 5000,
  outro: 4500,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  intro: Scene1,
  energia: Scene2,
  ciclos: Scene3,
  kai: Scene4,
  outro: Scene5,
};

const SCENE_START_SEC: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  let cumulativeMs = 0;
  for (const [key, ms] of Object.entries(SCENE_DURATIONS)) {
    out[key] = cumulativeMs / 1000;
    cumulativeMs += ms;
  }
  return out;
})();

const AUDIO_SEEK_EPSILON_SEC = 0.18;

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  muted = false,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentSceneKey } = useVideoPlayer({ durations, loop });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, "");
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    const targetTime = SCENE_START_SEC[baseSceneKey] ?? 0;
    if (Math.abs(audio.currentTime - targetTime) > AUDIO_SEEK_EPSILON_SEC) {
      audio.currentTime = targetTime;
    }
    audio.play().catch(() => {});
  }, [currentSceneKey, baseSceneKey, muted]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0e1116] text-[#e6ebf5] flex items-center justify-center">
      {/* Persistent Noise Overlay */}
      <div className="noise-overlay" />

      {/* Persistent Background Elements across scenes */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/bg-intro.jpg)` }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{
          opacity: sceneIndex <= 1 ? 0.4 : 0,
          scale: 1,
        }}
        transition={{ duration: 3, ease: "easeOut" }}
      />

      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/bg-energy.jpg)` }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{
          opacity: sceneIndex === 1 ? 0.6 : sceneIndex === 2 || sceneIndex === 3 ? 0.3 : 0,
          scale: sceneIndex === 1 ? 1 : 1.1,
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>

      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`}
        preload="auto"
        autoPlay
        muted={muted}
      />
    </div>
  );
}
