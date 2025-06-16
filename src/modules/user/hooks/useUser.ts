import { useEffect, useState } from 'react';
import { URL_USER_ALL_COMUM } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useUserReducer } from '../../../store/reducers/userReducer/useUserReducer';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';

export const useUser = () => {
  const { users, setUsers } = useUserReducer();
  const [usersFiltered, setUsersFiltered] = useState(users);
  const { request } = useRequests();
  const { loading } = useGlobalReducer();

  useEffect(() => {
    request(URL_USER_ALL_COMUM, MethodsEnum.GET, setUsers);
  }, []);
  
  useEffect(() => {
    setUsersFiltered(users);
  }, [users]);

  const handleOnChangeSearch = (value: string) => {
    if (!value) {
      setUsersFiltered([...users]);
    } else {
      setUsersFiltered([...users.filter((user) => user.name.includes(value))]);
    }
  };

  return {
    users: usersFiltered,
    loading,
    handleOnChangeSearch,
  };
};
