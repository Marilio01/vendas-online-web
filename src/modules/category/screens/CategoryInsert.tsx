import { useNavigate } from 'react-router-dom';
import Button from '../../../shared/components/buttons/button/Button';
import Input from '../../../shared/components/inputs/input/Input';
import Screen from '../../../shared/components/screen/Screen';
import {
  DisplayFlexJustifyCenter,
  DisplayFlexJustifyRight,
} from '../../../shared/components/styles/display.styled';
import { LimitedContainer } from '../../../shared/components/styles/limited.styled';
import { useInsertCategory } from '../hooks/useInsertCategory';
import { CategoryRoutesEnum } from '../routes';
import Loading from '../../../shared/components/loading/Loading';

const CategoryInsert = () => {
  const { 
    name, 
    categoryId, 
    loading, 
    error,
    handleOnChangeName,
    handleOnBlur,
    disabledButton, 
    insertCategory 
  } = useInsertCategory();
  
  const navigate = useNavigate();

  const handleOnClickCancel = () => {
    navigate(CategoryRoutesEnum.CATEGORY);
  };

  return (
    <Screen
      listBreadcrumb={[
        { name: 'HOME' },
        { name: 'CATEGORIAS', navigateTo: CategoryRoutesEnum.CATEGORY },
        { name: categoryId ? 'EDITAR CATEGORIA' : 'INSERIR CATEGORIA' },
      ]}
    >
      <DisplayFlexJustifyCenter>
        {loading && categoryId ? (
          <DisplayFlexJustifyCenter>
            <Loading size="large" />
          </DisplayFlexJustifyCenter>
        ) : (
          <LimitedContainer width={400}>
            <Input
              title="Nome"
              placeholder="Nome da Categoria"
              value={name}
              onChange={handleOnChangeName}
              onBlur={handleOnBlur}
              margin="0px 0px 16px 0px"
              errorMessage={error}
            />
            <DisplayFlexJustifyRight>
              <LimitedContainer margin="0px 8px" width={120}>
                <Button onClick={handleOnClickCancel} danger>
                  Cancelar
                </Button>
              </LimitedContainer>
              <LimitedContainer width={160}>
                <Button
                  disabled={disabledButton}
                  loading={loading}
                  onClick={insertCategory}
                  type="primary"
                >
                  {categoryId ? 'Salvar' : 'Inserir categoria'}
                </Button>
              </LimitedContainer>
            </DisplayFlexJustifyRight>
          </LimitedContainer>
        )}
      </DisplayFlexJustifyCenter>
    </Screen>
  );
};

export default CategoryInsert;