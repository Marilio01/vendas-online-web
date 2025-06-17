import { useParams } from 'react-router-dom';
import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Select from '../../../shared/components/inputs/select/Select';
import Screen from '../../../shared/components/screen/Screen';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import InputMoney from '../../../shared/components/inputs/inputMoney/InputMoney';
import { useInsertProduct } from '../hooks/useInsertProduct';
import { useCategory } from '../../category/hooks/useCategory';
import { DisplayFlexJustifyCenter } from '../../../shared/components/styles/display.styled';
import { CategoryType } from '../../../shared/types/CategoryType';
import Loading from '../../../shared/components/loading/Loading';
import { ProductRoutesEnum } from '../routes';
import { FormButtonsContainer } from '../../../shared/components/styles/mobile.styled';

const ProductInsert = () => {
  const { productId } = useParams<{ productId: string }>();
  const {
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
  } = useInsertProduct(productId);
  
  const { categories } = useCategory();

  return (
    <Screen
      listBreadcrumb={[
        { name: 'HOME' },
        { name: 'PRODUTOS', navigateTo: ProductRoutesEnum.PRODUCT },
        { name: productId ? 'EDITAR PRODUTO' : 'INSERIR PRODUTO' },
      ]}
    >
      {loadingProduct && isEdit ? (
        <DisplayFlexJustifyCenter><Loading size="large" /></DisplayFlexJustifyCenter>
      ) : (
        <DisplayFlexJustifyCenter>
          <LimitedContainer width={400}>
            <Input
              title="Nome"
              placeholder="Nome"
              value={product.name}
              onChange={(event) => onChangeInput(event, 'name')}
              onBlur={() => handleOnBlur('name')}
              margin="0px 0px 16px 0px"
              errorMessage={errors?.name}
            />
            <Input
              title="Url da Imagem"
              placeholder="http://..."
              value={product.image}
              onChange={(event) => onChangeInput(event, 'image')}
              onBlur={() => handleOnBlur('image')}
              margin="0px 0px 16px 0px"
              errorMessage={errors?.image}
            />
            <InputMoney
              title="Preço"
              placeholder="Preço"
              value={product.price}
              onChange={(event) => onChangeInput(event, 'price', true)}
              onBlur={() => handleOnBlur('price')}
              margin="0px 0px 16px 0px"
              errorMessage={errors?.price}
            />
            <Select
              title="Categoria"
              defaultValue={`${product.categoryId || ''}`}
              onChange={handleChangeSelect}
              onBlur={() => handleOnBlur('categoryId')}
              margin="0px 0px 16px 0px"
              options={categories.map((category: CategoryType) => ({
                value: `${category.id}`,
                label: `${category.name}`,
              }))}
              errorMessage={errors?.categoryId}
            />
            <FormButtonsContainer>
              <LimitedContainer margin="0px 8px 0px 0px" width={120}>
                <Button danger onClick={handleOnClickCancel}>Cancelar</Button>
              </LimitedContainer>
              <LimitedContainer width={160}>
                <Button
                  loading={loading}
                  disabled={disabledButton}
                  onClick={handleInsertProduct}
                  type="primary"
                >
                  {isEdit ? 'Salvar' : 'Inserir produto'}
                </Button>
              </LimitedContainer>
            </FormButtonsContainer>
          </LimitedContainer>
        </DisplayFlexJustifyCenter>
      )}
    </Screen>
  );
};

export default ProductInsert;