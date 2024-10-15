import { handler } from "./index.js";

export const main = async (event, context) => {
  return handler(event, context);
};
