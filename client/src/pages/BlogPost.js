import React from 'react';
import styled from 'styled-components';
import PageHero from '../components/PageHero';

const PageContainer = styled.div`
  padding-top: 120px;
  min-height: 80vh;
`;

const Content = styled.div`
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[10]} ${props => props.theme.spacing[4]};
  
  p {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.6;
  }
`;

const BlogPost = () => {
  return (
    <PageContainer>
      <PageHero
        title="Blog"
        subtitle="Financial insights, market trends, and planning perspectives from YD Advisory."
      />
      <Content>
        <p>
          Read our latest financial insights and expert advice on investment
          strategies, market trends, and financial planning.
        </p>
      </Content>
    </PageContainer>
  );
};

export default BlogPost;
