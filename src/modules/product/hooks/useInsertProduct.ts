import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_PRODUCT, URL_PRODUCT_ID } from '../../../shared/constants/urls';
import { InsertProduct } from '../../../shared/dtos/InsertProduct.dto';
import { ProductRoutesEnum } from '../routes';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer';

const DEFAULT_PRODUCT: InsertProduct = {
  name: '',
  price: 0,
  image: '',
  categoryId: undefined,
};

interface ProductErrors {
  name?: string;
  image?: string;
  price?: string;
  categoryId?: string;
}

type TouchedFields = Partial<Record<keyof InsertProduct, boolean>>;


export const useInsertProduct = (productId?: string) => {
  const navigate = useNavigate();
  const { request, loading } = useRequests();
  const { product: productReducer, setProduct: setProductReducer } = useProductReducer();
  
  const [product, setProduct] = useState<InsertProduct>(DEFAULT_PRODUCT);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [errors, setErrors] = useState<ProductErrors>({});
  const [touchedFields, setTouchedFields] = useState<TouchedFields>({});
  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    if (productId) {
      setIsEdit(true);
      setLoadingProduct(true);
      request(URL_PRODUCT_ID.replace('{productId}', productId), MethodsEnum.GET, setProductReducer)
        .finally(() => setLoadingProduct(false));
    } else {
      setProductReducer(undefined);
      setProduct(DEFAULT_PRODUCT);
      setTouchedFields({});
    }
  }, [productId]);

  useEffect(() => {
    if (productReducer) {
      setProduct({
        name: productReducer.name,
        price: productReducer.price,
        image: productReducer.image,
        categoryId: productReducer.category?.id,
      });
    }
  }, [productReducer]);

  useEffect(() => {
    const newErrors: ProductErrors = {};
    const trimmedName = product.name.trim();
    const trimmedImage = product.image.trim();
    const urlRegex = /^(https|http):\/\/[^\s$.?#].[^\s]*$/;

    if (touchedFields.name) {
      if (!trimmedName) newErrors.name = 'Nome é obrigatório.';
      else if (product.name !== trimmedName) newErrors.name = 'Nome não pode começar ou terminar com espaços.';
      else if (trimmedName.length < 3) newErrors.name = 'Nome deve ter no mínimo 3 caracteres.';
    }
    if (touchedFields.image) {
      if (!trimmedImage) newErrors.image = 'URL da imagem é obrigatória.';
      else if (!urlRegex.test(trimmedImage)) newErrors.image = 'Formato de URL inválido.';
    }
    if (touchedFields.price) {
      if (!product.price || product.price <= 0) newErrors.price = 'Preço deve ser maior que zero.';
    }
    if (touchedFields.categoryId) {
      if (!product.categoryId) newErrors.categoryId = 'Categoria é obrigatória.';
    }

    setErrors(newErrors);

    const isFormValid = 
      trimmedName.length >= 3 && product.name === trimmedName &&
      urlRegex.test(trimmedImage) &&
      product.price > 0 &&
      product.categoryId;
      
    setDisabledButton(!isFormValid);

  }, [product, touchedFields]);


  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>, name: keyof InsertProduct, isNumber?: boolean) => {
    setProduct({
      ...product,
      [name]: isNumber ? Number(event.target.value) : event.target.value,
    });
  };

  const handleChangeSelect = (value: string) => {
    setProduct({ ...product, categoryId: Number(value) });
  };
  
  const handleOnBlur = (name: keyof InsertProduct) => {
    setTouchedFields(prev => ({ ...prev, [name]: true }));
  };

  const handleInsertProduct = async () => {
    const body = { ...product, name: product.name.trim(), image: product.image.trim() };
    if (productId) {
      await request(URL_PRODUCT_ID.replace('{productId}', productId), MethodsEnum.PUT, undefined, body, 'Produto modificado!');
    } else {
      await request(URL_PRODUCT, MethodsEnum.POST, undefined, body, 'Produto criado!');
    }
    navigate(ProductRoutesEnum.PRODUCT);
  };
  
  const handleOnClickCancel = () => navigate(ProductRoutesEnum.PRODUCT);

  return {
    product,
    loading,
    disabledButton,
    isEdit,
    loadingProduct,
    errors,
    onChangeInput,
    handleInsertProduct,
    handleChangeSelect,
    handleOnClickCancel,
    handleOnBlur,
  };
};