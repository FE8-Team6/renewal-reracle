import React from 'react';
import styled from 'styled-components';
import IconText from './IconText';
import { data } from './Data';

const SubCategoryHY = () => {
	return (
		<Container>
			<HorizontalLine />
			<CategoryText>재활용품 세부 품목</CategoryText>
			<Inner>					
				<IconText {...data[0]}/>
				<IconText {...data[0]}/>
				<IconText {...data[0]}/>
				<IconText {...data[0]}/>
				<IconText {...data[0]}/>
				<IconText {...data[0]}/>
				<IconText {...data[0]}/>
				<IconText {...data[0]}/>					          
				<IconText {...data[0]}/>					          
				<IconText {...data[0]}/>
				<IconText {...data[0]}/>					          
				<IconText {...data[0]}/>					          
			</Inner>	          		
		</Container>
	);
};

export default SubCategoryHY;

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
const Inner = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	padding: 40px 45px;
	justify-items: center;	
	row-gap: 13px;
`;