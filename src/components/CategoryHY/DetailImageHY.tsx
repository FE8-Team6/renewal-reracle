import React from 'react';
import styled from 'styled-components';

const DetailImageHY = ({ imageUrl }) => {
	return (
		<IconContainer>
			<Icon url={imageUrl}/>
		</IconContainer>
	);
};

export default DetailImageHY;

const IconContainer = styled.div`
	width: 304px;
	height: 153px;
	background-color: var(--color-purple-light);
	border-radius: 14px;
	// position: absolute;	
	display: flex;
	margin: 30px auto;
	justify-content: center;
	align-items: center;
`;
const Icon = styled.div`
  width: 100%;
	height: 100px;
	background: url(${props => props.url}) no-repeat center center;
`;