import styled from 'styled-components';
import { DisplayFlexJustifyBetween, DisplayFlexJustifyRight } from '../../../shared/components/styles/display.styled';

export const ProductSearchAndButtonContainer = styled(DisplayFlexJustifyBetween)`
  margin: 0px 0px 16px 0px; 
  gap: 16px; 

  @media (max-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;

    & > div {
      flex-shrink: 1;
      min-width: 0;
    }
  }
`;

export const MobileSearchInput = styled.div`
  flex-grow: 1
  max-width: 240px;

  @media (max-width: 768px) {
    width: auto;
    .ant-input-search {
      width: 100%; 
    }
  }
`;

export const MobileInsertButton = styled.div`
  @media (max-width: 768px) {
    .ant-btn {
      width: 100%;
    }
  }
`;


export const FormButtonsContainer = styled(DisplayFlexJustifyRight)`

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    & > div {
      width: 100%;
      margin: 0 !important;
    }
  }
`;