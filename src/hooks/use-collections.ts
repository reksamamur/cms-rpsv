import { pb } from "@/lib/pb";
import { useQuery } from "@tanstack/react-query";

export default function useCollections() {
  return useQuery({
    queryKey: ["collections"],
    queryFn: ({ signal }) => {
      return pb.collection("collections").getFullList({
        signal,
      });
    },
  });
}
