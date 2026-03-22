import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';

const NotFoundContainer = styled.div`
  min-height: 80vh;
`;

const Content = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[10]} ${props => props.theme.spacing[4]};
  
  h2 {
    font-size: ${props => props.theme.fontSizes['2xl']};
    color: ${props => props.theme.colors.gray[700]};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing[8]};
  }
`;

const HomeButton = styled(Link)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${props => props.theme.fontSizes.lg};
  display: inline-block;
  transition: all ${props => props.theme.transitions.base};
  box-shadow: ${props => props.theme.shadows.lg};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.xl};
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <PageHero
        title="404"
        subtitle="The page you’re looking for doesn’t exist or has been moved."
      />
      <Content>
        <h2>Page Not Found</h2>
        <p>
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track with your financial journey.
        </p>
        <HomeButton to="/">
          Go Back Home
        </HomeButton>
      </Content>
    </NotFoundContainer>
  );
};

export default NotFound;
