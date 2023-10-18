import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/Genarals";
import { getItem } from "../../utils/Genarals";
import RoutePaths from "../../utils/RoutePaths";


export const scheduleApi = createApi({
    reducerPath: "api/schedules",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        async prepareHeaders(headers) {
        const token = await getItem(RoutePaths.token);
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
        },
    }),
    tagTypes: ["schedules"],

    endpoints: (builder) => ({

        getAllPersonalDaySchedules: builder.query (({
            query: () => '/personalDaySchedules',
            providesTags : ['schedules']
        })),
        
        getPopulatedRoomSchedule: builder.query({
            query: ({ userId, roomId, date }) => {
                return `/schedules/detailed?user-id=${userId}&room-id=${roomId}&date=${date}`;
            },
            providesTags : ['schedules'],
        }),

        getDetailedScheduledForUser: builder.query({
            query: ({ userId, date }) => {
              return `/schedules/detailed/all-rooms?user-id=${userId}&date=${date}`;
            },
            providesTags : ['schedules'],
        }),
            
    }),
});

export const {
    useGetAllPersonalDaySchedulesQuery,
    useGetPopulatedRoomScheduleQuery,
    useGetDetailedScheduledForUserQuery} = scheduleApi;