import { Modal } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../functions/connection/auth';
import { HeaderContainer, LogoExit, DisplayIcon } from './header.style'; 

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleGoToDisplay = () => {
    navigate('/display'); 
  };

  return (
    <>
      <Modal
        title="Atenção"
        open={open}
        onOk={() => logout(navigate)}
        onCancel={hideModal}
        okText="Sim"
        cancelText="Cancelar"
      >
        <p>Tem certeza que deseja sair?</p>
      </Modal>

      <HeaderContainer>
        <DisplayIcon onClick={handleGoToDisplay} />
        
        <LogoExit onClick={showModal} />
      </HeaderContainer>
    </>
  );
};

export default Header;