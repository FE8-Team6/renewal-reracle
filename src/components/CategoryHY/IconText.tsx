import React from 'react';
import styled from 'styled-components';


const IconText = ({ text, imageUrl }) => (
		<IconTextWrapper>
			<IconContainer>
				<Icon url={imageUrl}/>
			</IconContainer>
			<Text>{text}</Text>
		</IconTextWrapper>
	);

export default IconText;

const IconTextWrapper = styled.div`
	width: 73px;
	height: 90px;
	display: flex;  
  flex-direction: column;  
  align-items: center;  
  justify-content: center;
	cursor: pointer;
`;
const Text = styled.span`
	margin-top: 5px;
	font-size: 11px;
  font-weight: var(--font-weight-medium);
  color: var(--color-black);
`;
const IconContainer = styled.div`
	width: 73px;
	height: 73px;
	background-color: var(--color-yellow-light);
	border-radius: 14px;	
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Icon = styled.div`
  width: 100%;
	height: 58px;
	background: url(${props => props.url}) no-repeat center center;
`;


