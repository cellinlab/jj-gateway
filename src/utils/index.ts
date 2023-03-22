import { parse } from "yaml";

const path = require("path");
const fs = require("fs");

export const getEnv = () => {
  return process.env.RUNNING_ENV || "dev";
}

export const getConfig = () => {
  const env = getEnv();
  const configPath = path.join(process.cwd(), `./.config/.${env}.yaml`);
  const file = fs.readFileSync(configPath, "utf8");
  const config = parse(file);
  return config;
}
