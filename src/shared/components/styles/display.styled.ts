import styled from 'styled-components';

interface DisplayFlexProps {
  margin?: string;
}

export const DisplayFlex = styled.div`
  display: flex;
`;

export const DisplayFlexJustifyRight = styled(DisplayFlex)`
  justify-content: right;
    @media (max-width: 768px) { 
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 8px 0; 
  }
`;

export const DisplayFlexJustifyCenter = styled(DisplayFlex)`
  justify-content: center;
`;


export const DisplayFlexJustifyBetween = styled(DisplayFlex)<DisplayFlexProps>`
  display: flex;
  justify-content: space-between;
  ${(props) => (props.margin ? `margin: ${props.margin}` : '')};

  @media (max-width: 768px) {
    flex-wrap: wrap; 
  }
`;
