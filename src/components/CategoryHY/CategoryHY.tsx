import styled from 'styled-components';
import IconText from './IconText';
import { data } from './Data';

const CategoryHY = () => (
    <Container>
      <Search>
        <SearchIcon />
        <SearchInput />
      </Search>
      <HorizontalLine />
      <CategoryText>재활용품 분류</CategoryText>
      <Inner>
        {data.map((item) => (<IconText {...item} />))}
        {/* <IconText {...data[0]} />      
        <IconText {...data[0]} />
        <IconText {...data[0]} />
        <IconText {...data[0]} /> */}
      </Inner>
    </Container>
  );

export default CategoryHY;

const Container = styled.div`
  width: 100%;
  height: 530px;
  background-color: var(--color-white);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
`;
const Search = styled.div`
  width: 304px;
  height: 47px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-left;
  align-items: center;
  border-radius: 14px;
  border: 1px solid var(--color-purple);
  gap: 10px;
`;
const SearchIcon = styled.div`
  width: 20px;
  height: 100%;
  margin-left: 13px;
  background: url('/search_FILL0_wght400_GRAD0_opsz24.svg') no-repeat center center;
`;
const SearchInput = styled.input`
  width: 230px;
  height: 40px;
  font-size: 18px;
  border: none;
  font-family: var(--font-weight-medium);
  color: var(--color-gray-dark);

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;
const HorizontalLine = styled.div`
  width: 304px;
  height: 1px;
  margin: 25px auto 0;
  background-color: var(--color-purple);
`;
const CategoryText = styled.span`
  font-size: 14px;
  font-weight: var(--font-weight-bold);
  color: var(--color-purple);
  margin-top: 5px;
  margin-left: 35px;
`;
const Inner = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 40px 45px;
  justify-items: center;
  row-gap: 13px;
`;
