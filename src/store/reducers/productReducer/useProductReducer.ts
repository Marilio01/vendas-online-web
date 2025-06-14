import { useDispatch } from 'react-redux';
import { ProductType } from '../../../shared/types/ProductType';
import { useAppSelector } from '../../hooks';
import { setProductAction, setProductsAction, setSearchTermAction } from '.';

export const useProductReducer = () => {
  const dispatch = useDispatch();
  const { products, product, searchTerm } = useAppSelector((state) => state.productReducer);

  const setProducts = (currentProducts: ProductType[]) => {
    dispatch(setProductsAction(currentProducts));
  };

  const setProduct = (currentProduct?: ProductType) => {
    dispatch(setProductAction(currentProduct));
  };
  
  const setSearchTerm = (term: string) => {
    dispatch(setSearchTermAction(term));
  };

  return {
    product,
    products,
    searchTerm,
    setProducts,
    setProduct,
    setSearchTerm,
  };
};