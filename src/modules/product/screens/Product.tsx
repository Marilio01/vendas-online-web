import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ProductType } from '../../../shared/types/ProductType';
import CategoryColumn from '../components/CategoryColumn';
import TooltipImage from '../components/TooltipImage';
import Table from '../../../shared/components/table/Table';
import { useMemo } from 'react';
import Button from '../../../shared/components/buttons/button/Button';
import Screen from '../../../shared/components/screen/Screen';
import { useProduct } from '../hooks/useProduct';
import { convertNumberToMoney } from '../../../shared/functions/money';
import {
  DisplayFlexJustifyRight,
} from '../../../shared/components/styles/display.styled';
import { MobileInsertButton, MobileSearchInput, ProductSearchAndButtonContainer } from '../../../shared/components/styles/mobile.styled';

const { Search } = Input;

const Product = () => {
  const {
    productsFiltered,
    openModalDelete,
    handleOnClickInsert,
    onSearch,
    handleDeleteProduct,
    handleEditProduct,
    handleCloseModalDelete,
    handleOpenModalDelete,
  } = useProduct();

  const columns: ColumnsType<ProductType> = useMemo(
    () => [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: (_, product) => <TooltipImage product={product} />,
        responsive: ['md'],
      },
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Categoria',
        dataIndex: 'category',
        key: 'category',
        render: (_, product) => <CategoryColumn category={product.category} />,
      },
      {
        title: 'Preço',
        dataIndex: 'price',
        key: 'price',
        render: (_, product) => <a>{convertNumberToMoney(product.price)}</a>,
      },
      {
        title: 'Ações',
        dataIndex: '',
        width: 240,
        key: 'x',
        render: (_, product) => (
          <DisplayFlexJustifyRight>
            <Button
              margin="0px 16px 0px 0px"
              onClick={() => handleEditProduct(product.id)}
              icon={<EditOutlined />}
            >
              Editar
            </Button>
            <Button
              danger
              onClick={() => handleOpenModalDelete(product.id)}
              icon={<DeleteOutlined />}
            >
              Deletar
            </Button>
          </DisplayFlexJustifyRight>
        ),
      },
    ],
    [],
  );

  return (
    <Screen
      listBreadcrumb={[
        {
          name: 'HOME',
        },
        {
          name: 'PRODUTOS',
        },
      ]}
    >
      <Modal
        title="Atenção"
        open={openModalDelete}
        onOk={handleDeleteProduct}
        onCancel={handleCloseModalDelete}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja excluir esse produto?</p>
      </Modal>
      <ProductSearchAndButtonContainer>
        <MobileSearchInput>
          <Search placeholder="Buscar produto" onSearch={onSearch} enterButton />
        </MobileSearchInput>

        <MobileInsertButton>
          <Button type="primary" onClick={handleOnClickInsert}>
            Inserir
          </Button>
        </MobileInsertButton>
      </ProductSearchAndButtonContainer>
      <Table columns={columns} dataSource={productsFiltered} />
    </Screen>
  );
};

export default Product;