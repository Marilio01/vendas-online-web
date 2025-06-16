import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { UserType } from '../../../modules/login/types/UserType';
import { NotificationEnum } from '../../../shared/types/NotificationType';
import { useAppSelector } from '../../hooks';
import { setNotificationAction, setUserAction, setLoadingAction } from '.';

export const useGlobalReducer = () => {
  const dispatch = useDispatch();
  const { user, notification, loading } = useAppSelector((state) => state.globalReducer);

  const setNotification = useCallback((message: string, type: NotificationEnum, description?: string) => {
    dispatch(
      setNotificationAction({
        message,
        type,
        description,
      }),
    );
  }, [dispatch]);
  
  const setUser = useCallback((user?: UserType) => {
    dispatch(setUserAction(user));
  }, [dispatch]);

  const setLoading = useCallback((isLoading: boolean) => {
    dispatch(setLoadingAction(isLoading));
  }, [dispatch]);

  return {
    user,
    notification,
    loading,
    setNotification,
    setUser,
    setLoading,
  };
};