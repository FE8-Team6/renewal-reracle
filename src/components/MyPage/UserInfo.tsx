import styled from 'styled-components';
import { UserInfoProps } from '@/lib/types/userInfo';

const Container = styled.div`
  width: 46vh;
  height: 9vh;
  // background-color: var(--color-purple-light);
`;
const HorizontalLine = styled.div`
  width: 46vh;
  height: 1px;
  margin: 2vh auto 0.1vh;
  background-color: var(--color-purple);
`;
const User = styled.label`
  font-size: 1.5vh;
  font-weight: var(--font-weight-bold);
  color: var(--color-purple);
`;
const Input = styled.input`
  width: 46vh;
  height: 5vh;
  margin-top: 1.3vh;
  font-size: 3vh;
  border: none;
  color: var(--color-gray-dark);
  font-weight: var(--font-weight-bold);
  background-color: transparent;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const UserInfo = ({ label, type, value, onChange }: UserInfoProps) => (
  <Container>
    <HorizontalLine />
    <User>{label}</User>
    <Input type={type} value={value} onChange={onChange} />
  </Container>
);

export default UserInfo;
