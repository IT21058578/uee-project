import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/Genarals";
import { getItem } from "../../utils/Genarals";
import RoutePaths from "../../utils/RoutePaths";

const token = getItem(RoutePaths.token);

export const taskApiSlice = createApi({
  reducerPath: "api/tasks",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["tasks"],

  endpoints: (builder) => ({
    getAlltasks: builder.query({
      query: () => "/tasks/search",
      providesTags: ["tasks"],
    }),

    gettask: builder.query({
      query: (id: string) => `/tasks/${id}`,
      providesTags: ["tasks"],
    }),

    createtask: builder.mutation({
      query: ({ formData }) => ({
        url: "/tasks",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["tasks"],
    }),

    updatetask: builder.mutation({
      query: ({ taskId, formData }) => ({
        url: `/tasks/${taskId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["tasks"],
    }),

    deletetask: builder.mutation({
      query: (id: String) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tasks"],
    }),
      
  }),
});

export const {
  useGetAlltasksQuery,
  useGettaskQuery,
  useUpdatetaskMutation,
  useCreatetaskMutation,
  useDeletetaskMutation,
} = taskApiSlice;