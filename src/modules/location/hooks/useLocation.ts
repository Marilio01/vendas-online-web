import { useState } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { StateType } from '../../../shared/types/StateType';
import { CityType } from '../../../shared/types/CityType';
import { URL_CITY, URL_STATE } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';

export const useLocation = () => {
  const { request, loading } = useRequests();
  const [states, setStates] = useState<StateType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);

  const fetchStates = async () => {
    const result = await request<StateType[]>(URL_STATE, MethodsEnum.GET);
    if (result) {
      setStates(result);
    }
  };

  const fetchCities = async (stateId: number) => {
    setCities([]);
    const result = await request<CityType[]>(`${URL_CITY}/${stateId}`, MethodsEnum.GET);
    if (result) {
      setCities(result);
    }
  };

  return {
    loading,
    states,
    cities,
    fetchStates,
    fetchCities,
  };
};