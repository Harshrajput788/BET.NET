import axios from "axios";
import type {IBLOG} from "../types/blog"
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface BlogResponse {
    success: true;
    message: string;
    data: IBLOG[];
    pagination: {
        totalBlogs: number;
        totalPages: number;
        currentPage: number;
        limit: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
    sort: {
        order: "oldest" | "newest";
        field: string;
    };
}

export const getBlogs = async (query: any): Promise<BlogResponse> => {
  try {
    const qs = new URLSearchParams(query).toString();
    const res = await axios.get(`https://bet-net-3.onrender.com/api/v1/blog?${qs}`);
    console.log("Fetched blogs:", res.data);
    return res.status === 200 ? res.data : Promise.reject(new Error("Failed to fetch blogs"));
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const createBlog = async (formData: FormData) => {
  try {
    const res = await axios.post("https://bet-net-3.onrender.com/api/v1/blog", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    console.log("Blog created:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

export const useCreateBlog = () =>{
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error: any) => {
      console.error("Error creating blog:", error.message);
    }
  });
}
