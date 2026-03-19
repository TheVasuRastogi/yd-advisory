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
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(10, 80, 76, 0.92) 0%,
      rgba(10, 80, 76, 0.55) 55%,
      rgba(17, 94, 89, 0.7) 100%
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
    font-family: ${props => props.theme.fonts.display};
    font-size: clamp(2.6rem, 6vw, 3.8rem);
    font-weight: 900;
    letter-spacing: -0.03em;
    margin-bottom: ${props => props.theme.spacing[3]};
    color: ${props => props.theme.colors.white};
    text-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  }

  p {
    font-size: ${props => props.theme.fontSizes.lg};
    line-height: 1.75;
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

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[8]};

  h2 {
    font-size: ${props => props.theme.fontSizes['3xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[3]};
    font-weight: ${props => props.theme.fontWeights.extrabold};
  }

  p {
    color: ${props => props.theme.colors.gray[600]};
    max-width: 680px;
    margin: 0 auto;
    line-height: 1.7;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.xl};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  border: 1px solid rgba(15, 118, 110, 0.25);
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const ApplyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[6]};
  margin-top: ${props => props.theme.spacing[8]};
`;

const RolesTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-x: contain;
  touch-action: pan-x;
  border-radius: ${props => props.theme.borderRadius['2xl']};
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  box-shadow: ${props => props.theme.shadows.md};

  /* Make sure on mobile we can scroll instead of squishing */
  -webkit-overflow-scrolling: touch;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    border-radius: ${props => props.theme.borderRadius['2xl']};
  }
`;

const RolesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${props => props.theme.fontSizes.base};
  table-layout: auto;

  th {
    text-align: left;
    padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[5]};
    background: ${props => props.theme.colors.gray[50]};
    border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
    font-weight: ${props => props.theme.fontWeights.semibold};
    color: ${props => props.theme.colors.primary[800]};
    white-space: nowrap;
  }

  td {
    padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[5]};
    border-bottom: 1px solid ${props => props.theme.colors.gray[100]};
    vertical-align: top;
    color: ${props => props.theme.colors.gray[700]};
    line-height: 1.65;
    overflow-wrap: anywhere;
  }

  tbody tr:hover td {
    background: ${props => props.theme.colors.gray[50]};
  }

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    /* Keep readable columns by enforcing a minimum width */
    min-width: 1240px;
  }
`;

const TableCellTitle = styled.div`
  font-weight: ${props => props.theme.fontWeights.extrabold};
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: ${props => props.theme.spacing[1]};
`;

const ApplyCard = styled.article`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  box-shadow: ${props => props.theme.shadows.md};
  padding: ${props => props.theme.spacing[8]};
`;

const ApplyTitle = styled.h3`
  color: ${props => props.theme.colors.primary[800]};
  font-size: ${props => props.theme.fontSizes['2xl']};
  font-weight: ${props => props.theme.fontWeights.extrabold};
  margin: 0 0 ${props => props.theme.spacing[3]};
`;

const ApplyText = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.75;
  margin: 0 0 ${props => props.theme.spacing[5]};
`;

const Bullet = styled.li`
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const ContactEmailBlock = styled.div`
  background: ${props => props.theme.colors.gray[50]};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[5]};
`;

const ContactEmailLabel = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${props => props.theme.colors.gray[500]};
  font-weight: ${props => props.theme.fontWeights.semibold};
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const ContactEmailRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};

  svg {
    color: ${props => props.theme.colors.primary[700]};
  }
`;

const EmailLink = styled.a`
  color: ${props => props.theme.colors.primary[700]};
  font-weight: ${props => props.theme.fontWeights.semibold};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const CareersJob = () => {
  const careersEmail = 'Yashaswi.das@ydadvisory.ae';

  const roles = [
    {
      title: 'Manager – Investment Research',
      duration: 'Full-time',
      qualification: 'MBA/PGDM in Finance or Analytics',
      eligibility: 'Strong DCF/LBO fundamentals; valuation and cash-flow analysis; advanced Excel; clear communication.',
      experience: '4–7 years',
      jobDescription: 'Lead valuations and due diligence; build LBO/DCF models; run scenarios and risk analysis; own client-ready outputs (CIMs, decks).',
      ctc: 'Competitive, based on experience'
    },
    {
      title: 'Project Leader – Growth & BD',
      duration: 'Full-time',
      qualification: 'MBA',
      eligibility: 'SEO/SEM + performance marketing; strong analytics; sales alignment; campaign ownership.',
      experience: '5+ years',
      jobDescription: 'Drive digital growth (SEO/SEM, paid, content); track funnels; optimise CAC/ROI; handle market/competitor analysis; travel as needed.',
      ctc: 'Competitive, with performance incentives'
    },
    {
      title: 'Summer Interns – Remote',
      duration: '2 months',
      qualification: 'MBA Batch 2026',
      eligibility: 'MBA in Marketing, Finance or Operations',
      experience: '0',
      jobDescription: 'Remote 2-month internship for MBA students. Strong performers may be considered for PPOs.',
      ctc: 'Unpaid (with PPO consideration)'
    },
    {
      title: 'Summer Interns – On-site (Dubai)',
      duration: '2 months',
      qualification: 'MBA Batch 2026',
      eligibility: 'MBA in Marketing, Finance or Operations',
      experience: '0',
      jobDescription: 'Full-time on-site internship in Dubai. Stipend/benefits depend on college ranking. PPOs for top performers.',
      ctc: 'Stipend based on college ranking'
    }
  ];

  return (
    <PageContainer>
      <SEO
        title="Careers - Join Us"
        description="Explore job opportunities at YD Advisory and apply in minutes."
        url="https://ydadvisory.ae/careers"
      />

      <HeroSection>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Join Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            Explore roles and apply in minutes. If you don’t see an exact match, send your CV anyway - our team will route
            it to the right opportunity.
          </motion.p>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <SectionHeader>
          <h2>Open Roles</h2>
          <p>We hire across valuation, transaction advisory, financial modelling, and business growth.</p>
        </SectionHeader>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
        >
          <RolesTableWrapper>
            <RolesTable>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Duration</th>
                  <th>Qualification</th>
                  <th>Eligibility</th>
                  <th>Experience</th>
                  <th>Job Description</th>
                  <th>CTC</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.title}>
                    <td>
                      <TableCellTitle>{role.title}</TableCellTitle>
                    </td>
                    <td>{role.duration}</td>
                    <td>{role.qualification}</td>
                    <td>{role.eligibility}</td>
                    <td>{role.experience}</td>
                    <td>{role.jobDescription}</td>
                    <td>{role.ctc}</td>
                  </tr>
                ))}
              </tbody>
            </RolesTable>
          </RolesTableWrapper>
        </motion.div>

        <ApplyGrid>
          <ApplyCard>
            <ApplyTitle>How to apply</ApplyTitle>
            <ApplyText>
              Email your CV plus a short note on why YD Advisory fits your background. If relevant, include examples of
              models, decks, or writing you are proud of.
            </ApplyText>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#374151', lineHeight: 1.8 }}>
              <Bullet>Attach your latest CV (PDF is fine)</Bullet>
              <Bullet>Include a brief note on what you enjoy working on</Bullet>
              <Bullet>Share examples if you have them</Bullet>
            </ul>

            <div style={{ marginTop: 28 }}>
              <CTAButton to="/contact">
                Talk to our team <FiArrowRight />
              </CTAButton>
            </div>
          </ApplyCard>

          <ContactEmailBlock>
            <ContactEmailLabel>Careers email</ContactEmailLabel>
            <ContactEmailRow>
              <FiMail aria-hidden="true" />
              <EmailLink href={`mailto:${careersEmail}`}>
                {careersEmail}
              </EmailLink>
            </ContactEmailRow>
            <p style={{ margin: '14px 0 0', color: '#6b7280', lineHeight: 1.7, fontSize: 14 }}>
              We aim to respond quickly. Thank you for your interest.
            </p>
          </ContactEmailBlock>
        </ApplyGrid>
      </ContentSection>
    </PageContainer>
  );
};

export default CareersJob;

