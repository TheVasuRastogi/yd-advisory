import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const TemplatesContainer = styled.div`
  min-height: 100vh;
  padding-top: 120px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[50]}, ${props => props.theme.colors.white});
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[4]};
`;

const Hero = styled.div`
  background: linear-gradient(180deg, ${props => props.theme.colors.white} 0%, ${props => props.theme.colors.primary[50]} 100%);
  border: 1px solid ${props => props.theme.colors.gray[100]};
  border-radius: 24px;
  padding: ${props => props.theme.spacing[12]} ${props => props.theme.spacing[8]};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[12]};
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[4]};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.gray[600]};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.1rem;
  }
`;


const CTA = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  border-radius: 16px;
  padding: ${props => props.theme.spacing[8]};
  text-align: center;
  color: ${props => props.theme.colors.white};
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-bottom: ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.white};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.5rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: ${props => props.theme.spacing[6]};
  color: ${props => props.theme.colors.white};
  opacity: 0.95;
`;

const CTALink = styled.a`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary[600]};
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: 1.1rem;
  transition: all ${props => props.theme.transitions.fast};
  display: inline-block;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
  }
`;

const ComingSoonSection = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[50]}, ${props => props.theme.colors.white});
  border: 2px solid ${props => props.theme.colors.primary[200]};
  border-radius: 24px;
  padding: ${props => props.theme.spacing[12]} ${props => props.theme.spacing[8]};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[12]};
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(20, 184, 166, 0.1);
  transition: all ${props => props.theme.transitions.base};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(20, 184, 166, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary[500]}, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[500]});
    animation: shimmer 3s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const ComingSoonTitle = styled.h2`
  font-size: 3rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[6]};
  letter-spacing: -0.02em;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const ComingSoonDescription = styled.p`
  font-size: 1.375rem;
  color: ${props => props.theme.colors.gray[700]};
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.7;
  font-weight: ${props => props.theme.fontWeights.medium};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.25rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.125rem;
  }
`;

const Templates = () => {

  return (
    <>
      <SEO 
        title="Free Financial Templates | YD Advisory"
        description="Download free financial templates including pitch decks, financial models, and due diligence checklists. Professional tools for startups and businesses."
        keywords="financial templates, pitch deck, financial model, due diligence, startup templates, business templates"
      />
      
      <TemplatesContainer>
        <Container>
          <Hero>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Title>Financial Templates</Title>
              <Subtitle>
                Professional financial templates and tools for startups and businesses. Coming soon with comprehensive analytics and detailed reporting.
              </Subtitle>
            </motion.div>
          </Hero>

          <ComingSoonSection>
          <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ComingSoonTitle>Coming Soon!</ComingSoonTitle>
              <ComingSoonDescription>
                We're working hard to bring you the Financial templates with comprehensive analytics, market research, and detailed reporting. Stay tuned for updates!
              </ComingSoonDescription>
          </motion.div>
          </ComingSoonSection>

          <CTA>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <CTATitle>Need Custom Templates?</CTATitle>
              <CTADescription>
                Our team can create custom financial models, pitch decks, and templates tailored to your specific industry and requirements.
              </CTADescription>
              <CTALink href="/contact">Get Custom Template</CTALink>
            </motion.div>
          </CTA>
        </Container>
      </TemplatesContainer>
    </>
  );
};

export default Templates;
