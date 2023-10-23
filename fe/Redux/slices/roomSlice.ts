import { createSlice } from "@reduxjs/toolkit";

const room = createSlice({
  name: "room",
  initialState: {} as Partial<{
    name: string;
    description: string;
    organization: string;
    tag: string;
    adminIds: string[];
  }>,
  reducers: {
    setRoom: (state, { payload }) => {
      state = payload;
    },
  },
});

export const { setRoom } = room.actions;
export default room.reducer;
