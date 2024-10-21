import { styled } from "styled-components";

// 보라색 버튼
export const PurpleButton = styled.button`
  width: 23rem;
  height: 6vh;
  border: none;
  background-color: var(--color-purple);
  color: #fff;
  cursor: pointer;
  font-size: 2vh;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: var(--font-weight-bold);
  transition: 0.2s;
  border-radius: 1vh;
  margin-top: 1vh;
  &:hover {
    background-color: var(--color-purple-light);
    color: var(--color-purple);
  }
`;
// 화이트 버튼
export const WhiteButton = styled.button`
  width: 46vh;
  height: 6vh;
  border: 1px solid var(--color-purple);
  background-color: var(--color-white);
  color: var(--color-purple);
  cursor: pointer;
  // position: absolute;

  font-size: 2vh;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: var(--font-weight-bold);
  transition: 0.2s;
  border-radius: 1vh;
`;
