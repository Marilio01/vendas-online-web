import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../../modules/login/types/UserType';
import { NotificationType } from '../../../shared/types/NotificationType';

interface GlobalState {
  notification: NotificationType;
  user?: UserType;
  loading: boolean;
}

const initialState: GlobalState = {
  notification: {
    message: '',
    type: 'success',
  },
  user: undefined,
  loading: false,
};

export const globalSlice = createSlice({
  name: 'globalReducer',
  initialState,
  reducers: {
    setNotificationAction: (state, action: PayloadAction<NotificationType>) => {
      state.notification = action.payload;
    },
    setUserAction: (state, action: PayloadAction<UserType | undefined>) => {
      state.user = action.payload;
    },
    setLoadingAction: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setNotificationAction, setUserAction, setLoadingAction } = globalSlice.actions;

export default globalSlice.reducer;