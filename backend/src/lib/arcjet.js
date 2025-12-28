import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ENV } from "./env.js";


// const aj = arcjet({
//   key: ENV.ARCJET_KEY,
//   rules: [
//     // Shield protects your app from common attacks e.g. SQL injection
//     shield({ mode: "LIVE" }),
//     // Create a bot detection rule
//     detectBot({
//       mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
//       allow: [
//         "CATEGORY:SEARCH_ENGINE", 
//       ],
//     }),
//     // Create a token bucket rate limit. Other algorithms are supported.
//     slidingWindow({
//         mode: "LIVE",
//         max: 200,
//         interval: 60,
//     }),
//   ],
// });



const isDevelopment = ENV.NODE_ENV === "development";

const aj = arcjet({
  key: ENV.ARCJET_KEY,
  rules: [
    // Shield always included (use DRY_RUN in dev)
    shield({ mode: isDevelopment ? "DRY_RUN" : "LIVE" }),
    
    detectBot({
      mode: isDevelopment ? "DRY_RUN" : "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    
    slidingWindow({
      mode: isDevelopment ? "DRY_RUN" : "LIVE",
      max: isDevelopment ? 1000 : 200,
      interval: 60,
    }),
  ],
});


export default aj;