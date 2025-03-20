import { QueryClient } from "@tanstack/react-query";
import PocketBase from "pocketbase";

export const queryClient = new QueryClient();

export const pb = new PocketBase("http://127.0.0.1:8090");

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
