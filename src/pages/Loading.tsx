import styled from 'styled-components';
import logo from '../assets/images/logo.png';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #d8ffda;
  width: 56.3vh;
  height: 100vh;
  transition: opacity 0.2s;
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <img src={logo} alt="logo" />
    </LoadingContainer>
  );
};

export default Loading;
