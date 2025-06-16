import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { URL_CATEGORY, URL_CATEGORY_ID } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useCategoryReducer } from '../../../store/reducers/categoryReducer/useCategoryReducer';
import { useRequests } from '../../../shared/hooks/useRequests';
import { CategoryRoutesEnum } from '../routes';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';

export const useInsertCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { request } = useRequests();
  const { loading } = useGlobalReducer();
  const { setCategories, category, setCategory } = useCategoryReducer();

  const [name, setName] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);
  
  const [error, setError] = useState<string | undefined>();
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (category && categoryId) {
      setName(category.name);
    }
  }, [category, categoryId]);
  
  useEffect(() => {
    const trimmedName = name.trim();
    let newError: string | undefined = undefined;

    if (touched) {
      if (!trimmedName) {
        newError = 'Nome da categoria é obrigatório.';
      } else if (name !== trimmedName) {
        newError = 'O nome não pode começar ou terminar com espaços.';
      } else if (trimmedName.length < 3) {
        newError = 'O nome deve ter no mínimo 3 caracteres.';
      }
    }
    
    setError(newError);

    const isNameValid = trimmedName.length >= 3 && name === trimmedName;
    setDisabledButton(!isNameValid);

  }, [name, touched]);

  useEffect(() => {
    if (categoryId) {
      request(URL_CATEGORY_ID.replace('{categoryId}', categoryId), MethodsEnum.GET, setCategory);
    } else {
      setName('');
      setTouched(false);
      setError(undefined);
    }
  }, [categoryId]);

  const handleOnChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  
  const handleOnBlur = () => {
    setTouched(true);
  };

  const insertCategory = async () => {
    const body = { name: name.trim() }; 

    if (categoryId) {
      await request(URL_CATEGORY_ID.replace('{categoryId}', categoryId), MethodsEnum.PUT, undefined, body);
    } else {
      await request(URL_CATEGORY, MethodsEnum.POST, undefined, body);
    }

    await request(URL_CATEGORY, MethodsEnum.GET, setCategories);
    navigate(CategoryRoutesEnum.CATEGORY);
  };

  return {
    name,
    categoryId,
    loading,
    error,
    disabledButton,
    handleOnChangeName,
    handleOnBlur,
    insertCategory,
  };
};