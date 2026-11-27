// Photos for each service.
import { IMAGE_DATA } from "./imageData";
export const img = (name) => IMAGE_DATA[name] || IMAGE_DATA.hero;
export const SERVICE_IMAGES = {
  standard: "home",
  deep: "deep",
  office: "office",
  move: "move",
  recurring: "hero",
  windows: "windows",
};
export const serviceImg = (id) => img(SERVICE_IMAGES[id] || "hero");
