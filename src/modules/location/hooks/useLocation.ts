import { useState, useRef, useCallback } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { StateType } from '../../../shared/types/StateType';
import { CityType } from '../../../shared/types/CityType';
import { URL_CITY, URL_STATE } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';

export const useLocation = () => {
  const { request } = useRequests();
  const { loading } = useGlobalReducer();
  const [states, setStates] = useState<StateType[]>([]);
  const [cities, setCities] = useState<CityType[]>([]);

  const hasFetchedStates = useRef(false);

  const fetchStates = useCallback(async () => {
    if (hasFetchedStates.current) return;
    hasFetchedStates.current = true;

    const result = await request<StateType[]>(URL_STATE, MethodsEnum.GET);
    if (result) {
      setStates(result);
    }
  }, [request]);

  const fetchCities = useCallback(async (stateId: number) => {
    setCities([]);
    const result = await request<CityType[]>(`${URL_CITY}/${stateId}`, MethodsEnum.GET);
    if (result) {
      setCities(result);
    }
  }, [request]);

  return {
    loading,
    states,
    cities,
    fetchStates,
    fetchCities,
  };
};
