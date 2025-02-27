import { QueryClient } from "@tanstack/react-query";
import PocketBase from "pocketbase";

export const queryClient = new QueryClient();

export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

export function generateId(
  length = 15,
  alphabet = "abcdefghijklmnopqrstuvwxyz0123456789"
) {
  let result = "";

  for (let i = 0; i < length; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }

  return result;
}
