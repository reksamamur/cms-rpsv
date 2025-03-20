import { pb } from '@/lib/pb';
import { useQuery } from '@tanstack/react-query';

export default function useGetSphere(collectionid: string) {
  return useQuery({
    queryKey: ['sphere', 'get'],
    queryFn: ({ signal }) => {
      return pb.collection('sphere').getFullList({
        filter: `collection="${collectionid}"`,
        signal,
      });
    },
  });
}
