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
      console.log("BRUHHHH", payload);
      state = payload;
      console.log("BRuh", state);
    },
  },
});

export const { setRoom } = room.actions;
export default room.reducer;
