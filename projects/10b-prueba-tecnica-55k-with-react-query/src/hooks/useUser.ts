import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { type User } from '../types.d';
import { fetchUsers } from '../services/user';

export const useUsers = () => {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{ nextCursor?: number; users: User[] }>({
      queryKey: ['users'], // <- la key de la información o de la query
      queryFn: ({ pageParam }) =>
        fetchUsers({ pageParam: pageParam as number }), // <- la función que se ejecuta para obtener la información
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 3,
    });

  const users: User[] = data?.pages.flatMap((page) => page.users) ?? [];

  const deleteUser = (uuid: string) => {
    queryClient.setQueryData<{
      pages: { nextCursor?: number; users: User[] }[];
    }>(['users'], (oldData) => {
      if (!oldData) return { pages: [] };

      let totalUsers = 0;
      const newPages = oldData.pages.map((page, pageIndex) => {
        const newUsers = page.users.filter((user) => user.login.uuid !== uuid);
        totalUsers += newUsers.length;

        // Recalculate nextCursor
        const currentPage = pageIndex + 1;
        const nextCursor =
          totalUsers < currentPage * 10 ? undefined : currentPage + 1;

        return {
          ...page,
          users: newUsers,
          nextCursor,
        };
      });

      // Remove empty pages
      const filteredPages = newPages.filter((page) => page.users.length > 0);

      return { ...oldData, pages: filteredPages };
    });
  };

  return {
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    users,
    deleteUser,
    hasNextPage,
  };
};
