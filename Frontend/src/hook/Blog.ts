import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getBlogs, type BlogResponse } from '../api/blog'

export const useBlogs = (query: any) => {
    return useQuery<BlogResponse>({
        queryKey: ["blogs", query],
        queryFn: async () => {
            return await getBlogs(query);
        },
        placeholderData: keepPreviousData
    });
}