import { useMutation } from '@tanstack/react-query';
import { pb, queryClient } from '@/lib/pb';

export default function useCreateSphere() {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await pb.collection('sphere').create(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sphere', 'get'] });
    },
  });
}
