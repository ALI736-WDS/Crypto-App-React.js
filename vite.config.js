import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// import paths from "./src/constants/paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
  // resolve: {
  //   alias: {
  //     // services: "/src/services", //taeene masir felan folder barayeinke dar baghie files ../ nazanim
  //     ...paths.reduce(
  //       (acc, cur) => ({
  //         ...acc,
  //         [cur]: `/${cur === "src" ? cur : "src/" + cur}`,
  //       }),
  //       "" //meghdar avalie
  //     ),
  //   },
  // },
});
