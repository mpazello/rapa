import "@testing-library/jest-dom";

// Mock SVG/image imports — Vite handles these as URLs in the browser,
// but in jsdom they must return a predictable string so tests can assert
// that the correct src is present without triggering network requests.
vi.mock("@/lib/seal-images", () => {
  const SEAL_IMAGE: Record<number, string> = {};
  for (let i = 1; i <= 20; i++) SEAL_IMAGE[i] = `/seals/seal-${i}.svg`;
  return { SEAL_IMAGE };
});

vi.mock("@/lib/tone-images", () => {
  const TONE_IMAGE: Record<number, string> = {};
  for (let i = 1; i <= 13; i++) TONE_IMAGE[i] = `/tones/tone-${i}.svg`;
  return { TONE_IMAGE };
});
