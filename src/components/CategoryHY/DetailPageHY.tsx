import React from 'react';
import styled from 'styled-components';
import DetailImageHY from './DetailImageHY';
import batteryImg from '/battery.svg';
import RecycleMethodsHY from './RecycleMethodsHY';
import { textData } from './TextData';


const DetailPageHY = () => {
	return (
		<Container>
			<HorizontalLine />
			<CategoryText>재활용품 세부 품목</CategoryText>
			<DetailImageHY imageUrl={batteryImg} />	
			<RecycleMethodsHY {...textData[0]}/>		       		
		</Container>
	);
};

export default DetailPageHY;

const Container = styled.div`
  width: 100%;
  height: 530px;
  background-color: var(--color-white);
	position: relative;
	display: flex;
	flex-direction: column;
	justify-items: center;
	overflow-y: auto;
`; 
const HorizontalLine = styled.div`
	width: 304px;
	height: 1px;	
	margin: 30px auto 0;
	background-color: var(--color-purple);
`;
const CategoryText = styled.span`
	font-size: 14px;
	font-weight: var(--font-weight-bold);
	color: var(--color-purple);
	margin-top: 5px;
	margin-left: 35px;
`;