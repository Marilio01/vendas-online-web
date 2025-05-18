import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { ProductRoutesEnum } from '../../product/routes';
import Loading from '../../../shared/components/loading/Loading';

const FirstScreen = () => {
  const { user } = useGlobalReducer();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(ProductRoutesEnum.PRODUCT);
    }
  }, [user]);

   return <Loading />;
};

export default FirstScreen;
