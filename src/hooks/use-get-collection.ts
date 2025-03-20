import { pb } from '@/lib/pb';
import { useQuery } from '@tanstack/react-query';

export default function useGetCollection(id: string) {
  return useQuery({
    queryKey: ['collection', 'get'],
    queryFn: ({ signal }) => {
      return pb
        .collection('collections')
        .getFirstListItem(`id="${id}"`, { signal });
    },
  });
}
