import styled from 'styled-components';

export const ScreenContainer = styled.div`
  min-height: 100vh;
  background: url('/background.jpg') center/cover no-repeat;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(3px);
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

export const LimitedContainer = styled.div<{
  width?: number | string;
  margin?: string;
}>`
  width: ${({ width }) => (typeof width === 'number' ? `${width}px` : width || '100%')};
  max-width: 420px;
  background: #ffffff;
  padding: 40px 32px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 32px 20px;
  }
`;

export const TitleLogin = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;
  color: #222;
  margin-bottom: 32px;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  letter-spacing: 0.02em;
`;

export const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

export const InputHelperText = styled.span`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 4px;
  display: block;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 32px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;
