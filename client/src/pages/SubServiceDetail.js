import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiCheckCircle,
  FiChevronRight,
  FiMail,
  FiPhone,
} from 'react-icons/fi';
import SEO from '../components/SEO';
import {
  getSubServiceBySlug,
  PARENT_SLUG,
  PARENT_TITLE,
} from '../data/comprehensiveBusinessValuationSubServices';
import { innerPageHeroBackground } from '../styles/heroMixins';

const PageContainer = styled.div`
  padding-top: 120px;
  min-height: 100vh;
`;

const Breadcrumb = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing[4]} ${(props) => props.theme.spacing[4]};
  font-size: ${(props) => props.theme.fontSizes.sm};
  
  ol {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: ${(props) => props.theme.spacing[2]};
    list-style: none;
    margin: 0;
    padding: 0;
    color: ${(props) => props.theme.colors.gray[600]};
  }
  
  a {
    color: ${(props) => props.theme.colors.primary[600]};
    text-decoration: none;
    
    &:hover {
      color: ${(props) => props.theme.colors.primary[700]};
      text-decoration: underline;
    }
  }
  
  li:last-child {
    color: ${(props) => props.theme.colors.primary[800]};
    font-weight: ${(props) => props.theme.fontWeights.medium};
  }
  
  svg {
    font-size: 0.75em;
    vertical-align: middle;
    color: ${(props) => props.theme.colors.gray[400]};
  }
`;

const HeroSection = styled.section`
  ${innerPageHeroBackground('/services.png')}
  position: relative;
  color: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.spacing[12]} 0 ${(props) => props.theme.spacing[16]};
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing[4]};
  
  h1 {
    font-size: ${(props) => props.theme.fontSizes['4xl']};
    margin-bottom: ${(props) => props.theme.spacing[4]};
    color: ${(props) => props.theme.colors.white};
    
    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
      font-size: ${(props) => props.theme.fontSizes['3xl']};
    }
  }
  
  p {
    font-size: ${(props) => props.theme.fontSizes.lg};
    color: ${(props) => props.theme.colors.gray[200]};
    line-height: 1.6;
    margin: 0;
  }
`;

const ParentBadge = styled.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.15);
  color: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.spacing[2]} ${(props) => props.theme.spacing[4]};
  border-radius: ${(props) => props.theme.borderRadius.full};
  font-size: ${(props) => props.theme.fontSizes.sm};
  margin-bottom: ${(props) => props.theme.spacing[4]};
  backdrop-filter: blur(8px);
`;

const ContentSection = styled.section`
  padding: ${(props) => props.theme.spacing[16]} 0;
  background: ${(props) => props.theme.colors.white};
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing[4]};
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${(props) => props.theme.spacing[12]};
  margin-bottom: ${(props) => props.theme.spacing[12]};
  
  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const ContentBlock = styled.div`
  h2 {
    font-size: ${(props) => props.theme.fontSizes['2xl']};
    color: ${(props) => props.theme.colors.primary[800]};
    margin-bottom: ${(props) => props.theme.spacing[4]};
  }
  
  p {
    font-size: ${(props) => props.theme.fontSizes.lg};
    color: ${(props) => props.theme.colors.gray[600]};
    line-height: 1.7;
    margin-bottom: ${(props) => props.theme.spacing[4]};
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${(props) => props.theme.spacing[3]};
  margin-bottom: ${(props) => props.theme.spacing[3]};
  
  svg {
    font-size: ${(props) => props.theme.fontSizes.lg};
    color: ${(props) => props.theme.colors.primary[600]};
    margin-top: 2px;
    flex-shrink: 0;
  }
  
  span {
    color: ${(props) => props.theme.colors.gray[700]};
    font-weight: 500;
    line-height: 1.5;
  }
`;

const ProcessSection = styled.section`
  padding: ${(props) => props.theme.spacing[16]} 0;
  background: ${(props) => props.theme.colors.gray[50]};
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${(props) => props.theme.spacing[6]};
  
  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ProcessStep = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing[5]};
  background: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: ${(props) => props.theme.shadows.sm};
  border: 1px solid ${(props) => props.theme.colors.gray[200]};
  transition: all ${(props) => props.theme.transitions.base};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${(props) => props.theme.shadows.lg};
  }
`;

const StepNumber = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary[600]}, ${(props) => props.theme.colors.primary[700]});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${(props) => props.theme.spacing[3]};
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontSizes.lg};
  font-weight: 700;
`;

const StepTitle = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.lg};
  color: ${(props) => props.theme.colors.primary[800]};
  margin-bottom: ${(props) => props.theme.spacing[2]};
`;

const StepDescription = styled.p`
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.gray[600]};
  line-height: 1.5;
  margin: 0;
`;

const BenefitsSection = styled.section`
  padding: ${(props) => props.theme.spacing[16]} 0;
  background: ${(props) => props.theme.colors.white};
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(props) => props.theme.spacing[6]};
  
  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const BenefitCard = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.spacing[6]};
  background: ${(props) => props.theme.colors.gray[50]};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  border: 1px solid ${(props) => props.theme.colors.gray[200]};
  transition: all ${(props) => props.theme.transitions.base};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${(props) => props.theme.shadows.lg};
    background: ${(props) => props.theme.colors.white};
  }
  
  svg {
    font-size: ${(props) => props.theme.fontSizes['3xl']};
    color: ${(props) => props.theme.colors.primary[600]};
    margin-bottom: ${(props) => props.theme.spacing[3]};
  }
  
  h3 {
    font-size: ${(props) => props.theme.fontSizes.lg};
    color: ${(props) => props.theme.colors.primary[800]};
    margin-bottom: ${(props) => props.theme.spacing[2]};
  }
  
  p {
    font-size: ${(props) => props.theme.fontSizes.sm};
    color: ${(props) => props.theme.colors.gray[600]};
    line-height: 1.5;
    margin: 0;
  }
`;

const CtaSection = styled.section`
  padding: ${(props) => props.theme.spacing[16]} 0;
  background: linear-gradient(135deg, ${(props) => props.theme.colors.primary[600]}, ${(props) => props.theme.colors.primary[700]});
  color: ${(props) => props.theme.colors.white};
  text-align: center;
`;

const CtaContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.spacing[4]};
  
  h2 {
    font-size: ${(props) => props.theme.fontSizes['3xl']};
    margin-bottom: ${(props) => props.theme.spacing[4]};
    color: ${(props) => props.theme.colors.white};
  }
  
  p {
    font-size: ${(props) => props.theme.fontSizes.lg};
    color: ${(props) => props.theme.colors.gray[200]};
    line-height: 1.6;
    margin-bottom: ${(props) => props.theme.spacing[6]};
  }
`;

const CtaButtons = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing[4]};
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(Link)`
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.primary[700]};
  padding: 14px 28px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
    background: ${(props) => props.theme.colors.gray[100]};
  }
`;

const SecondaryButton = styled(Link)`
  background: transparent;
  color: ${(props) => props.theme.colors.white};
  padding: 14px 28px;
  border: 2px solid ${(props) => props.theme.colors.white};
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.primary[700]};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: ${(props) => props.theme.spacing[6]};
  margin-top: ${(props) => props.theme.spacing[6]};
  flex-wrap: wrap;
  
  @media (max-width: ${(props) => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing[2]};
  color: ${(props) => props.theme.colors.gray[200]};
  font-size: ${(props) => props.theme.fontSizes.sm};
  
  svg {
    color: ${(props) => props.theme.colors.white};
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing[12]};
  
  h2 {
    font-size: ${(props) => props.theme.fontSizes['3xl']};
    color: ${(props) => props.theme.colors.primary[800]};
    margin-bottom: ${(props) => props.theme.spacing[3]};
  }
  
  p {
    font-size: ${(props) => props.theme.fontSizes.lg};
    color: ${(props) => props.theme.colors.gray[600]};
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const SubServiceDetail = () => {
  const { subSlug } = useParams();
  const subService = getSubServiceBySlug(subSlug);

  if (!subService) {
    return (
      <PageContainer>
        <ContentSection>
          <ContentContainer style={{ textAlign: 'center', paddingTop: '3rem', paddingBottom: '3rem' }}>
            <h1 style={{ color: '#0f766e', marginBottom: '1rem' }}>Sub-Service Not Found</h1>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              The requested sub-service could not be found.
            </p>
            <CtaButtons>
              <PrimaryButton to={`/services/${PARENT_SLUG}`}>
                View Parent Service <FiArrowRight />
              </PrimaryButton>
              <SecondaryButton to="/services">View All Services <FiArrowRight /></SecondaryButton>
            </CtaButtons>
          </ContentContainer>
        </ContentSection>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SEO
        title={`${subService.title} - YD Advisory`}
        description={subService.shortDescription}
        url={`https://ydadvisory.ae/services/${PARENT_SLUG}/${subService.slug}`}
      />

      <Breadcrumb aria-label="Breadcrumb">
        <ol>
          <li><Link to="/">Home</Link></li>
          <li><FiChevronRight /></li>
          <li><Link to="/services">Services</Link></li>
          <li><FiChevronRight /></li>
          <li><Link to={`/services/${PARENT_SLUG}`}>{PARENT_TITLE}</Link></li>
          <li><FiChevronRight /></li>
          <li>{subService.title}</li>
        </ol>
      </Breadcrumb>

      <HeroSection>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ParentBadge>Part of {PARENT_TITLE}</ParentBadge>
            <h1>{subService.title}</h1>
            <p>{subService.shortDescription}</p>
          </motion.div>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <ContentContainer>
          <TwoColumnGrid>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ContentBlock>
                <h2>Overview</h2>
                <p>{subService.description}</p>
              </ContentBlock>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ContentBlock>
                <h2>What We Offer</h2>
                <FeaturesList>
                  {subService.features.map((feature, index) => (
                    <FeatureItem key={index}>
                      <FiCheckCircle />
                      <span>{feature}</span>
                    </FeatureItem>
                  ))}
                </FeaturesList>
              </ContentBlock>
            </motion.div>
          </TwoColumnGrid>
        </ContentContainer>
      </ContentSection>

      <ProcessSection>
        <ContentContainer>
          <SectionHeader>
            <h2>Our Process</h2>
            <p>We follow a structured approach to deliver clear, defensible results.</p>
          </SectionHeader>
          <ProcessGrid>
            {subService.process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <ProcessStep>
                  <StepNumber>{step.step}</StepNumber>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </ProcessStep>
              </motion.div>
            ))}
          </ProcessGrid>
        </ContentContainer>
      </ProcessSection>

      <BenefitsSection>
        <ContentContainer>
          <SectionHeader>
            <h2>Why Choose This Service</h2>
            <p>Key benefits of working with our team on this engagement.</p>
          </SectionHeader>
          <BenefitsGrid>
            {subService.benefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <BenefitCard>
                    <BenefitIcon />
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </BenefitCard>
                </motion.div>
              );
            })}
          </BenefitsGrid>
        </ContentContainer>
      </BenefitsSection>

      <CtaSection>
        <CtaContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Get Started?</h2>
            <p>
              Contact us to discuss your {subService.title.toLowerCase()} needs. Our team will respond within 24 hours.
            </p>
            <CtaButtons>
              <PrimaryButton to="/contact">
                Get Free Consultation <FiArrowRight />
              </PrimaryButton>
              <SecondaryButton to={`/services/${PARENT_SLUG}`}>
                Back to {PARENT_TITLE} <FiArrowRight />
              </SecondaryButton>
            </CtaButtons>
            <ContactInfo>
              <ContactItem>
                <FiPhone />
                <span>+971-528477349</span>
              </ContactItem>
              <ContactItem>
                <FiMail />
                <span>Yashaswi.das@ydadvisory.ae</span>
              </ContactItem>
            </ContactInfo>
          </motion.div>
        </CtaContent>
      </CtaSection>
    </PageContainer>
  );
};

export default SubServiceDetail;
