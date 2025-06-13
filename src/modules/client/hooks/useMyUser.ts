import { useEffect, useState } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { URL_USER } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { UserType } from '../../login/types/UserType';

export const useMyUser = () => {
  const { request, loading } = useRequests();
  const [user, setUser] = useState<UserType | undefined>();

  const fetchUser = async () => {
    const result = await request<UserType>(URL_USER, MethodsEnum.GET);
    if (result) {
      setUser(result);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    loading,
  };
};