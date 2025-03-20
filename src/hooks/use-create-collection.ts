import { useMutation } from "@tanstack/react-query";
import { pb } from "@/lib/pb";

type CreateCollection = {
  name: string;
};

export default function useCreateCollection() {
  return useMutation({
    mutationFn: async ({ name }: CreateCollection) => {
      const create = await pb.collection("collections").create({
        name: name,
      });

      return create;
    },
  });
}
