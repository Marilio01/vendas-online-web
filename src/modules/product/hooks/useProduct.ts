import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { URL_PRODUCT, URL_PRODUCT_ID } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ProductType } from '../../../shared/types/ProductType';
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer';
import { ProductRoutesEnum } from '../routes';

export const useProduct = () => {
  const [productIdDelete, setProductIdDelete] = useState<number | undefined>();
  const { products, setProducts } = useProductReducer();
  const [productsFiltered, setProdutsFiltered] = useState<ProductType[]>([]);
  const { request } = useRequests();
  const navigate = useNavigate();

  const getAndSortProducts = () => {
    request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET).then((data) => {
      if (data) {
        const sortedProducts = [...data].sort((a, b) => a.id - b.id);
        setProducts(sortedProducts);
      }
    });
  };

  useEffect(() => {
    setProdutsFiltered([...products]);
  }, [products]);

  useEffect(() => {
    getAndSortProducts();
  }, []);

  const handleOnClickInsert = () => {
    navigate(ProductRoutesEnum.PRODUCT_INSERT);
  };

  const onSearch = (value: string) => {
    if (!value) {
      setProdutsFiltered([...products]);
    } else {
      setProdutsFiltered(
        products.filter((product) => product.name.toLowerCase().includes(value.toLowerCase())),
      );
    }
  };

  const handleDeleteProduct = async () => {
    await request(URL_PRODUCT_ID.replace('{productId}', `${productIdDelete}`), MethodsEnum.DELETE);
    getAndSortProducts();
    setProductIdDelete(undefined);
  };

  const handleEditProduct = async (productId: number) => {
    navigate(ProductRoutesEnum.PRODUCT_EDIT.replace(':productId', `${productId}`));
  };

  const handleCloseModalDelete = () => {
    setProductIdDelete(undefined);
  };

  const handleOpenModalDelete = (productId: number) => {
    setProductIdDelete(productId);
  };

  return {
    productsFiltered,
    openModalDelete: !!productIdDelete,
    handleOnClickInsert,
    onSearch,
    handleDeleteProduct,
    handleEditProduct,
    handleCloseModalDelete,
    handleOpenModalDelete,
  };
};