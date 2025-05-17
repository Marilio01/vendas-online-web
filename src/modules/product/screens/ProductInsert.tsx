import { useParams } from 'react-router-dom';
import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Select from '../../../shared/components/inputs/select/Select';
import Screen from '../../../shared/components/screen/Screen';
import { ProductRoutesEnum } from '../routes';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import InputMoney from '../../../shared/components/inputs/inputMoney/InputMoney';
import { useInsertProduct } from '../hooks/useInsertProduct';
import { useCategory } from '../../category/hooks/useCategory';
import {
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/components/styles/display.styled';
import { CategoryType } from '../../../shared/types/CategoryType';
import { ProductInsertTestIdEnum } from '../enum/ProductInsertTestIdEnum';

const ProductInsert = () => {
  const { productId } = useParams<{ productId: string }>();
  const {
    product,
    loading,
    disabledButton,
    isEdit,
    onChangeInput,
    handleInsertProduct,
    handleChangeSelect,
    handleOnClickCancel,
  } = useInsertProduct(productId);
  const { categories } = useCategory();

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'PRODUTOS',
          navigateTo: ProductRoutesEnum.PRODUCT,
        },
        {
          name: 'INSERIR PRODUTO',
        },
      ]}
    >
      {loading ? (
        <div>carregando</div>
      ) : (
        <DisplayFlexJustifyCenter data-testid={ProductInsertTestIdEnum.PRODUCT_INSERT_CONTAINER}>
          <LimitedContainer width={400}>
            <Input
              data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_NAME}
              onChange={(event) => onChangeInput(event, 'name')}
              value={product.name}
              margin="0px 0px 16px 0px"
              title="Nome"
              placeholder="Nome"
            />
            <Input
              data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_IMAGE}
              onChange={(event) => onChangeInput(event, 'image')}
              value={product.image}
              margin="0px 0px 16px 0px"
              title="Url imagem"
              placeholder="Url imagem"
            />
            <InputMoney
              data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_PRICE}
              onChange={(event) => onChangeInput(event, 'price', true)}
              value={product.price}
              margin="0px 0px 16px 0px"
              title="Preço"
              placeholder="Preço"
            />
            <Select
              defaultValue={`${product.categoryId || ''}`}
              data-testid={ProductInsertTestIdEnum.PRODUCT_INPUT_SELECT}
              title="Categoria"
              margin="0px 0px 16px 0px"
              onChange={handleChangeSelect}
              options={categories.map((category: CategoryType) => ({
                value: `${category.id}`,
                label: `${category.name}`,
              }))}
            />
            <DisplayFlexJustifyRight>
              <LimitedContainer margin="0px 8px" width={120}>
                <Button
                  data-testid={ProductInsertTestIdEnum.PRODUCT_BUTTON_CANCEL}
                  danger
                  onClick={handleOnClickCancel}
                >
                  Cancelar
                </Button>
              </LimitedContainer>
              <LimitedContainer width={120}>
                <Button
                  data-testid={ProductInsertTestIdEnum.PRODUCT_BUTTON_INSERT}
                  loading={loading}
                  disabled={disabledButton}
                  onClick={handleInsertProduct}
                  type="primary"
                >
                  {isEdit ? 'Salvar' : 'Inserir produto'}
                </Button>
              </LimitedContainer>
            </DisplayFlexJustifyRight>
          </LimitedContainer>
        </DisplayFlexJustifyCenter>
      )}
    </Screen>
  );
};

export default ProductInsert;
