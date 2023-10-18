import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../utils/Genarals';
import { getItem } from '../../utils/Genarals';
import RoutePaths from '../../utils/RoutePaths';

const token = getItem(RoutePaths.token);

export const usersApiSlice = createApi({
    
    reducerPath : 'api/users',
    baseQuery : fetchBaseQuery({baseUrl : BASE_URL ,
    async prepareHeaders(headers) {
        const token = await getItem(RoutePaths.token);
            if (token) {
              headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
          },}),
    tagTypes : ['Users'],

    endpoints : (builder) => ({

        getAllUsers : builder.query(({
            query : () => '/users/search',
            providesTags : ['Users'],
        })),

        getUser : builder.query({
            query : (id) => `/users/${id}`,
            providesTags : ['Users']
        }),

    })
})


export const {
    useGetAllUsersQuery,
    useGetUserQuery,
 } = usersApiSlice;
