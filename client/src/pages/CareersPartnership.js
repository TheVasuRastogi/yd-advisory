import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import SEO from '../components/SEO';

const PageContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: ${props => props.theme.colors.gray[50]};
`;

const HeroSection = styled.section`
  background: url('/images/careers.jpg') center/cover no-repeat;
  background-color: ${props => props.theme.colors.primary[900]};
  color: ${props => props.theme.colors.white};
  padding: 0;
  min-height: 440px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(10, 80, 76, 0.88) 0%,
      rgba(10, 80, 76, 0.55) 55%,
      rgba(17, 94, 89, 0.65) 100%
    );
    z-index: 0;
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  padding: 0 ${props => props.theme.spacing[4]};
  position: relative;
  z-index: 1;
  text-align: center;

  h1 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    margin-bottom: ${props => props.theme.spacing[3]};
    font-weight: ${props => props.theme.fontWeights.extrabold};
    letter-spacing: -0.03em;
    color: ${props => props.theme.colors.white};
    text-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  }

  p {
    font-size: ${props => props.theme.fontSizes.lg};
    line-height: 1.8;
    max-width: 760px;
    margin: 0 auto;
    color: rgba(255, 255, 255, 0.98);
    text-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
  }
`;

const ContentSection = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[10]} ${props => props.theme.spacing[4]};
`;

const Card = styled.article`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  box-shadow: ${props => props.theme.shadows.md};
  overflow: hidden;
  padding: ${props => props.theme.spacing[8]};
`;

const CardTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes['3xl']};
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[3]};
`;

const CardText = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.8;
  margin: 0 0 ${props => props.theme.spacing[6]};
  max-width: 70ch;
`;

const ContactHighlight = styled.div`
  background: ${props => props.theme.colors.gray[50]};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[5]};
  display: grid;
  gap: ${props => props.theme.spacing[2]};
`;

const ContactHighlightLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.gray[500]};
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

const ContactHighlightRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.gray[800]};

  svg {
    flex: 0 0 auto;
    color: ${props => props.theme.colors.primary[700]};
  }
`;

const EmailLink = styled.a`
  color: ${props => props.theme.colors.primary[700]};
  font-weight: ${props => props.theme.fontWeights.semibold};
  text-decoration: none;
  overflow-wrap: anywhere;

  &:hover {
    text-decoration: underline;
  }
`;

const CTAButton = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[5]};
  border-radius: ${props => props.theme.borderRadius.xl};
  border: 1px solid rgba(15, 118, 110, 0.25);
  background: linear-gradient(
    135deg,
    ${props => props.theme.colors.primary[600]},
    ${props => props.theme.colors.primary[700]}
  );
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${props => props.theme.fontSizes.sm};
  width: fit-content;
  margin-top: ${props => props.theme.spacing[4]};
`;

const CareersPartnership = () => {
  const careersEmail = 'Yashaswi.das@ydadvisory.ae';

  return (
    <PageContainer>
      <SEO
        title="Partnerships - YD Advisory"
        description="Explore partnership opportunities with YD Advisory. Send a short note and we will route it to the right team."
        url="https://ydadvisory.ae/careers/partnership"
      />

      <HeroSection>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Join Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Looking to collaborate with YD Advisory? Send a short note and we will route it to the right team.
          </motion.p>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <Card>
          <CardTitle>Apply for partnership</CardTitle>
          <CardText>
            If you are a platform, university, or strategic operator and want to work with YD Advisory, share your
            background and what you are proposing.
          </CardText>

          <ContactHighlight>
            <ContactHighlightLabel>Partnership email</ContactHighlightLabel>
            <ContactHighlightRow>
              <FiMail aria-hidden="true" />
              <EmailLink
                href={`mailto:${careersEmail}?subject=${encodeURIComponent('Partnership Inquiry - YD Advisory')}&body=${encodeURIComponent(
                  'Hello YD Advisory,\\n\\nI would like to discuss a partnership. Here is my background and proposal:\\n\\n'
                )}`}
              >
                {careersEmail}
              </EmailLink>
            </ContactHighlightRow>
          </ContactHighlight>

          <CTAButton to="/contact">
            Talk to our team <FiArrowRight />
          </CTAButton>
        </Card>
      </ContentSection>
    </PageContainer>
  );
};

export default CareersPartnership;

