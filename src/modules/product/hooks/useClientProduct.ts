import { useEffect, useState, useMemo, useCallback } from 'react';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useProductReducer } from '../../../store/reducers/productReducer/useProductReducer';
import { ProductType } from '../../../shared/types/ProductType';
import { CategoryType } from '../../../shared/types/CategoryType';
import { URL_PRODUCT, URL_CATEGORY } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enum';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';

export interface GroupedProduct {
  category: CategoryType;
  products: ProductType[];
}

export const useClientProduct = () => {
  const { request } = useRequests();
  const { loading } = useGlobalReducer();
  const { searchTerm } = useProductReducer();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const fetchData = useCallback(async () => {
    const [productsResult, categoriesResult] = await Promise.all([
      request<ProductType[]>(URL_PRODUCT, MethodsEnum.GET),
      request<CategoryType[]>(URL_CATEGORY, MethodsEnum.GET),
    ]);
    setProducts(productsResult || []);
    setCategories(categoriesResult || []);
  }, [request]);

  useEffect(() => {
    fetchData();
  }, []);

  const groupedProducts = useMemo<GroupedProduct[]>(() => {
    if (!categories.length || !products.length) {
      return [];
    }
    return categories
      .map((category) => ({
        category,
        products: products.filter((product) => product.category?.id === category.id),
      }))
      .filter((group) => group.products.length > 0);
  }, [categories, products]);

  const filteredGroupedProducts = useMemo<GroupedProduct[]>(() => {
    if (!searchTerm) {
      return groupedProducts;
    }
    const term = searchTerm.toUpperCase();
    return groupedProducts
      .map((group) => ({
        ...group,
        products: group.products.filter((product) =>
          product.name.toUpperCase().includes(term),
        ),
      }))
      .filter((group) => group.products.length > 0);
  }, [searchTerm, groupedProducts]);

  return {
    groupedProducts: filteredGroupedProducts,
    loading,
  };
};