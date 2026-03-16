import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiShield, FiUsers, FiTarget, FiBriefcase, FiDollarSign, FiBarChart, FiClock, FiStar } from 'react-icons/fi';
import SEO from '../components/SEO';
import { organizationSchema, personSchema } from '../utils/structuredData';

const AboutContainer = styled.div`
  padding-top: 120px;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[800]} 0%, ${props => props.theme.colors.primary[900]} 100%);
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[20]} 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  
  h1 {
    font-size: ${props => props.theme.fontSizes['5xl']};
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.white};
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes['4xl']};
    }
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.gray[200]};
    line-height: 1.6;
  }
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing[12]};
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[16]};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing[8]};
  }
`;

const ImageContent = styled.div`
  display: flex;
  justify-content: flex-end;
  
  img {
    width: 90%;
    height: auto;
    border-radius: ${props => props.theme.borderRadius.xl};
    box-shadow: ${props => props.theme.shadows.xl};
    filter: brightness(1.05) contrast(1.1);
    transition: all ${props => props.theme.transitions.base};
    
    &:hover {
      filter: brightness(1.1) contrast(1.15);
      transform: scale(1.02);
    }
  }
`;


const ValuesSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.white};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[12]};
  
  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.gray[600]};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing[8]};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ValueCard = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing[8]};
  
  svg {
    font-size: ${props => props.theme.fontSizes['4xl']};
    color: ${props => props.theme.colors.primary[600]};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  h3 {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
  }
  
  p {
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.6;
  }
`;

const CtaSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[16]} 0;
  text-align: center;
`;

const CtaContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  
  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.white};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.xl};
    margin-bottom: ${props => props.theme.spacing[8]};
    color: ${props => props.theme.colors.gray[200]};
  }
`;

const CtaButton = styled.button`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[8]};
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.base};
  box-shadow: ${props => props.theme.shadows.lg};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.xl};
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  }
`;

const FounderSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.white};
`;

const FounderContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const TeamSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.gray[50]};
`;

const TeamContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[8]};
`;

const TeamMemberCard = styled(motion.article)`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  box-shadow: 0 14px 40px rgba(2, 44, 34, 0.08);
  overflow: hidden;
  transition: transform ${props => props.theme.transitions.fast}, box-shadow ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 55px rgba(2, 44, 34, 0.12);
  }
`;

const TeamMemberLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 340px) 1fr;
  align-items: stretch;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const TeamMemberMedia = styled.div`
  position: relative;
  background: ${props => props.theme.colors.gray[100]};
  border-right: 1px solid ${props => props.theme.colors.gray[200]};
  padding: 0;
  display: block;
  overflow: hidden;

  /* Soft overlay tint for a premium look */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 20% 10%, rgba(20, 184, 166, 0.20) 0%, rgba(20, 184, 166, 0.06) 42%, transparent 75%),
      linear-gradient(180deg, rgba(15, 118, 110, 0.08), rgba(255, 255, 255, 0));
    pointer-events: none;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    border-right: none;
    border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
  }
`;

const TeamMemberPhoto = styled.img`
  width: 100%;
  height: 100%;
  min-height: 460px;
  border-radius: 0;
  object-fit: cover;
  /* Slightly lower focal point so faces don't sit too high */
  object-position: 50% 18%;
  background: rgba(15, 118, 110, 0.08);
  border: none;
  flex: 0 0 auto;
  display: block;
  position: relative;
  z-index: 1;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    /* On stacked/mobile layout, use a consistent banner ratio */
    height: auto;
    min-height: 0;
    aspect-ratio: 16 / 9;
    object-position: 50% 22%;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    aspect-ratio: 4 / 3;
    object-position: 50% 20%;
  }
`;

const TeamMemberName = styled.h3`
  margin: 0;
  font-size: ${props => props.theme.fontSizes['3xl']};
  color: ${props => props.theme.colors.gray[900]};
  letter-spacing: -0.02em;
  line-height: 1.15;
`;

const TeamMetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
`;

const TeamMemberRole = styled.div`
  color: ${props => props.theme.colors.primary[800]};
  font-weight: ${props => props.theme.fontWeights.semibold};
  line-height: 1.35;
`;

const TeamPill = styled.span`
  font-size: ${props => props.theme.fontSizes.xs};
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.primary[800]};
  background: rgba(15, 118, 110, 0.10);
  border: 1px solid rgba(15, 118, 110, 0.18);
  padding: 6px 10px;
  border-radius: 999px;
  white-space: nowrap;
`;

const TeamMemberBody = styled.div`
  color: ${props => props.theme.colors.gray[700]};
  line-height: 1.7;

  p {
    margin: 0 0 ${props => props.theme.spacing[4]};
    max-width: 80ch;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const TeamMemberContent = styled.div`
  padding: ${props => props.theme.spacing[6]};
  display: grid;
  gap: ${props => props.theme.spacing[4]};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[5]};
  }
`;

const TeamMemberTop = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[2]};
  padding-bottom: ${props => props.theme.spacing[4]};
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};
`;

const WhatSheDoesSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.gray[50]};
`;

const WhatSheDoesContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;


const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing[8]};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[8]};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all ${props => props.theme.transitions.base};
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
    transform: translateY(-2px);
  }
  
  h3 {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[3]};
    
    svg {
      color: ${props => props.theme.colors.primary[600]};
    }
  }
  
  p {
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.7;
    margin: 0;
  }
`;

const HowSheWorksSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.gray[50]};
`;

const HowSheWorksContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const WorkPrinciplesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing[6]};
  align-items: stretch;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const PrincipleCard = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[6]};
  box-shadow: ${props => props.theme.shadows.sm};
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[3]};
  
  h4 {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.primary[800]};
    margin: 0;
    font-weight: ${props => props.theme.fontWeights.semibold};
  }
  
  p {
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.6;
    margin: 0;
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <SEO
        title="About Yashaswi Das - Founder & Principal, YD Advisory Dubai"
        description="Meet Yashaswi Das, Founder & Principal of YD Advisory. Valuation and transactions specialist with experience at JPMorgan and Dubai Holding. Expert in business valuations, M&A, financial modeling, and due diligence across 15+ sectors."
        keywords="Yashaswi Das, founder YD Advisory, valuation specialist Dubai, M&A advisor UAE, financial modeling expert, JPMorgan Dubai Holding, business valuations UAE, transaction advisory Dubai"
        url="https://ydadvisory.ae/about"
        structuredData={[
          organizationSchema,
          personSchema({
            name: "Yashaswi Das",
            jobTitle: "Founder & Principal",
            description: "Valuation and transactions specialist with experience at JPMorgan and Dubai Holding, leading a licensed practice in Dubai",
            image: "https://ydadvisory.ae/images/team/Yashaswi-Das.jpg",
            education: "Financial Services Industry",
            awards: "50+ clients, $100M+ raised/structured/unlocked, 10+ geographies, 15+ sectors"
          })
        ]}
      />
      
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Us
          </motion.h1>
          {/* description removed as requested */}
        </HeroContent>
      </HeroSection>

      {/* Founder Section */}
      <FounderSection>
        <FounderContent>
          <TwoColumnGrid>
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                Founder
              </motion.h2>
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                style={{ color: '#0d9488', marginBottom: '1rem' }}
              >
                Yashaswi Das<br />
                <span style={{ fontWeight: 500, fontSize: '1.1em', display: 'block', marginTop: '0.1em' }}>Founder & Principal</span>
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                style={{ marginBottom: '0.75rem' }}
              >
                Yashaswi is a valuation and transactions specialist who blends quality with boutique speed to help founders, boards, investors, and family offices make decisive moves.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                viewport={{ once: true }}
                style={{ marginBottom: '0.75rem' }}
              >
                Her experience spans business & IP valuations (incl. 409A and complex securities), M&A execution, financial modelling, and due diligence - producing IVSC-aligned, audit-ready outputs that stand up in boardrooms and negotiations.
              </motion.p>
              <motion.ul
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                viewport={{ once: true }}
                style={{ paddingLeft: '1rem', margin: 0, color: '#4b5563', lineHeight: 1.6 }}
              >
                <li>Defensible valuations: 409A, complex securities, IP/PPA</li>
                <li>Decision‑ready models: three‑statement, scenarios, Monte‑Carlo</li>
                <li>Hands‑on M&A: red‑flag diligence, SPA/PPA, integration</li>
              </motion.ul>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                viewport={{ once: true }}
                style={{ marginTop: '0.75rem' }}
              >
                Previously at JPMorgan (Private Equity analysis & valuation) and Dubai Holding (M&A execution & deal structuring), Yashaswi now leads a licensed practice in Dubai, supporting clients from origination to post‑deal integration.
              </motion.p>
            </div>
            <ImageContent>
              <motion.img
                src="/images/team/yashaswi_das.png"
                alt="Yashaswi Das"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              />
            </ImageContent>
          </TwoColumnGrid>
        </FounderContent>
      </FounderSection>

      {/* What She Does Section */}
      <WhatSheDoesSection>
        <WhatSheDoesContent>
          <SectionHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              What She Does
            </motion.h2>
          </SectionHeader>
          
          <ServicesGrid>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ServiceCard>
                <h3>
                  <FiDollarSign />
                  Valuation Leadership
                </h3>
                <p>
                  Business, IP/intangibles, 409A, and complex instruments (convertibles, warrants, prefs) with clear assumptions and sensitivity tables.
                </p>
              </ServiceCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <ServiceCard>
                <h3>
                  <FiBarChart />
                  Financial Modelling
                </h3>
                <p>
                  Three-statement builds, unit economics, multi-scenario & Monte-Carlo analysis for capital raises, budgeting, and deals.
                </p>
              </ServiceCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ServiceCard>
                <h3>
                  <FiBriefcase />
                  M&A & Transaction Advisory
                </h3>
                <p>
                  Target screening, red-flag diligence, working-capital reviews, SPA/PPA modelling, and integration planning.
                </p>
              </ServiceCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <ServiceCard>
                <h3>
                  <FiUsers />
                  Fractional CFO & Board Stewardship
                </h3>
                <p>
                  KPI packs, board reporting, capital strategy, and fair-value roll-forwards - senior firepower without full-time overhead.
                </p>
              </ServiceCard>
            </motion.div>
          </ServicesGrid>
        </WhatSheDoesContent>
      </WhatSheDoesSection>

      {/* Track Record section removed as requested */}

      {/* How She Works Section */}
      <HowSheWorksSection>
        <HowSheWorksContent>
          <SectionHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              How She Works
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              A founder-led approach that delivers institutional-grade results with boutique speed
            </motion.p>
          </SectionHeader>

          <WorkPrinciplesGrid>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <PrincipleCard>
                <h4>Founder-led & Hands-on</h4>
                <p>No hand-offs; senior attention from day one to delivery.</p>
              </PrincipleCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <PrincipleCard>
                <h4>Quality with Boutique Speed</h4>
                <p>Institutional-grade models and frameworks - without overhead or delay.</p>
              </PrincipleCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <PrincipleCard>
                <h4>Tailored, Not Templated</h4>
                <p>Every model, valuation, and memo reflects the specific business and deal thesis.</p>
              </PrincipleCard>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <PrincipleCard>
                <h4>Outcome-oriented</h4>
                <p>Built for decision-making - not just documentation.</p>
              </PrincipleCard>
            </motion.div>
          </WorkPrinciplesGrid>
        </HowSheWorksContent>
      </HowSheWorksSection>

      {/* Team Section */}
      <TeamSection>
        <TeamContent>
          <SectionHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              A lean, execution-first team supporting transaction advisory, capital markets, and growth initiatives.
            </motion.p>
          </SectionHeader>

          <TeamGrid>
            <TeamMemberCard
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <TeamMemberLayout>
                <TeamMemberMedia>
                  <TeamMemberPhoto src="/images/howlee.png" alt="Heewon Lee" />
                </TeamMemberMedia>
                <TeamMemberContent>
                  <TeamMemberTop>
                    <TeamMemberName>Heewon Lee</TeamMemberName>
                    <TeamMetaRow>
                      <TeamMemberRole>Promotions, Distribution, and Client Relationship Executive</TeamMemberRole>
                      <TeamPill>Business Development &amp; Operations</TeamPill>
                      <TeamPill>Korean National</TeamPill>
                    </TeamMetaRow>
                  </TeamMemberTop>
                  <TeamMemberBody>
                    <p>
                      Heewon Lee, Business Development &amp; Operations and a Korean National, supports promotions, distribution,
                      and client relationship initiatives, contributing to the coordination of internal processes, workflows,
                      and client-facing engagements that underpin the firm’s transaction advisory and capital markets activities.
                      Her work focuses on operational execution, project coordination, and strategic outreach that help identify
                      opportunities, strengthen client relationships, and support the firm’s growth across complex transaction environments.
                    </p>
                    <p>
                      She brings experience in market analysis, venture research, and business development across startup, venture,
                      and institutional ecosystems. Her background includes conducting market studies on international expansion strategies,
                      supporting engagement initiatives within global networks, and performing competitive analysis to inform partnership
                      development and client acquisition strategies across the technology and healthcare sectors.
                    </p>
                    <p>
                      Her work emphasizes cross-functional collaboration and analytical insight, translating market intelligence and
                      operational coordination into actionable strategies that enhance business development and long-term client engagement.
                    </p>
                  </TeamMemberBody>
                </TeamMemberContent>
              </TeamMemberLayout>
            </TeamMemberCard>
          </TeamGrid>
        </TeamContent>
      </TeamSection>

      {/* Core Values Section (replaces Career Timeline) */}
      <ValuesSection>
        <SectionContent>
          <SectionHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Core Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              We run YD Advisory on a simple promise: credible numbers, clear storytelling, and execution that moves deals forward.
            </motion.p>
          </SectionHeader>

          <ValuesGrid>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <ValueCard>
                <FiUsers />
                <h3>Respect</h3>
                <p>We treat every founder, board, and counter-party with professionalism. No jargon for its own sake - only useful, decision-ready work.</p>
              </ValueCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} viewport={{ once: true }}>
              <ValueCard>
                <FiStar />
                <h3>Professionalism</h3>
                <p>IVSC‑aligned valuations and investor‑grade models. We stand behind our assumptions and documentation in boardrooms and audits.</p>
              </ValueCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
              <ValueCard>
                <FiClock />
                <h3>Responsibility</h3>
                <p>We deliver on time and stay accountable end-to-end - no hand-offs, no surprises, fully transparent progress and risks.</p>
              </ValueCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} viewport={{ once: true }}>
              <ValueCard>
                <FiShield />
                <h3>Integrity</h3>
                <p>Numbers must be defensible. We say what the data supports - even when it's hard - and never push work clients don't need.</p>
              </ValueCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
              <ValueCard>
                <FiTarget />
                <h3>Competency</h3>
                <p>Hands-on senior execution in valuations, M&A, and CFO support. If something is outside scope, we say so - and bring the right partner.</p>
              </ValueCard>
            </motion.div>
          </ValuesGrid>
        </SectionContent>
      </ValuesSection>

      {/* CTA Section */}
      <CtaSection>
        <CtaContent>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Work With YD Advisory?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let's discuss how Yashaswi's expertise can help you achieve your financial goals 
            with her personalized approach and proven track record.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <CtaButton>
              Schedule Free Consultation
            </CtaButton>
          </motion.div>
        </CtaContent>
      </CtaSection>
    </AboutContainer>
  );
};

export default About;