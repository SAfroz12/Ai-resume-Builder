import dotenv from "dotenv";
import { Mistral } from "@mistralai/mistralai";

dotenv.config();

 export const mistral1 = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY1
});
export const mistral2=new Mistral({
  apiKey: process.env.MISTRAL_API_KEY2
});
