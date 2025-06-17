import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Button from '../../../shared/components/buttons/button/Button';
import Screen from '../../../shared/components/screen/Screen';
import { useCategory } from '../hooks/useCategory';
import Table from '../../../shared/components/table/Table';
import { CategoryType } from '../../../shared/types/CategoryType';
import {
  DisplayFlexJustifyRight,
} from '../../../shared/components/styles/display.styled';
import { MobileInsertButton, MobileSearchInput, ProductSearchAndButtonContainer } from '../../../shared/components/styles/mobile.styled';

const { Search } = Input;

const Category = () => {
  const {
    categories,
    openModalDelete,
    handleOnChangeSearch,
    handleOnClickCategory,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleConfirmDeleteCategory,
    handleGoToEditCategory,
  } = useCategory();

  const columns: ColumnsType<CategoryType> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Produtos',
      dataIndex: 'amountProducts',
      key: 'amountProducts',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Ações',
      dataIndex: '',
      width: 240,
      key: 'x',
      render: (_, category) => (
          <DisplayFlexJustifyRight>
            <Button onClick={() => handleGoToEditCategory(category.id)} icon={<EditOutlined />}>
              Editar
            </Button>
          {category.amountProducts <= 0 && (
            <Button
              danger
              onClick={() => handleOpenModalDelete(category.id)}
              icon={<DeleteOutlined />}
            >
              Deletar
            </Button>
          )}
          </DisplayFlexJustifyRight>
      ),
    },
  ];

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'CATEGORIAS',
        },
      ]}
    >
      <Modal
        title="Atenção"
        open={openModalDelete}
        onOk={handleConfirmDeleteCategory}
        onCancel={handleCloseModalDelete}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja excluir essa categoria?</p>
      </Modal>
      <ProductSearchAndButtonContainer> 
        <MobileSearchInput>
          <Search placeholder="Buscar categoria" onSearch={handleOnChangeSearch} enterButton />
        </MobileSearchInput>

        <MobileInsertButton>
          <Button type="primary" onClick={handleOnClickCategory}>
            Inserir
          </Button>
        </MobileInsertButton>
      </ProductSearchAndButtonContainer>

      <Table columns={columns} dataSource={categories} />
    </Screen>
  );
};

export default Category;