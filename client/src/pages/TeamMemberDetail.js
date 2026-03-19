import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FiArrowLeft, FiLinkedin, FiMail, FiAward,
  FiGlobe, FiUsers, FiBriefcase,
} from 'react-icons/fi';
import SEO from '../components/SEO';

/* ═══════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════ */
const teamMembers = [
  {
    id: 1,
    name: 'Yashaswi Das',
    initials: 'YD',
    position: 'Founder & Principal',
    tagline: 'Bespoke Transaction & Valuation Advisory',
    image: '/images/team/yashaswi_das.png',
    social: {
      linkedin: 'https://www.linkedin.com/in/yashaswi-das/',
      email: 'Yashaswi.das@ydadvisory.ae',
    },
    credentials: [
      { icon: <FiAward />,     label: 'Chartered Accountant (ICAI) · CFA Charterholder · Valuation Analyst' },
      { icon: <FiBriefcase />, label: 'JPMorgan · Dubai Holding · 8+ years frontline deal experience' },
      { icon: <FiUsers />,     label: '50+ clients · 10+ geographies · 15+ sectors' },
      { icon: <FiGlobe />,     label: 'Licensed practice — Dubai, UAE' },
    ],
    bioSections: [
      {
        heading: 'About',
        text: `After 8 years of frontline deal work with JPMorgan, Dubai Holding and other buy- and sell-side roles, I launched YD Advisory to give founders, family offices and investors investment-bank-grade analytics with boutique agility — without the overhead.

As a Chartered Accountant (ICAI) and CFA Charterholder, I deliver audit-ready valuations and bespoke transaction support that meet IVSC standards and hold up under regulator, auditor or courtroom scrutiny.`,
      },
      {
        heading: 'What I Do',
        text: `I help business owners and their advisors answer the critical question: "What is my business really worth?" Our collaboration begins with a complimentary discovery call, followed by detailed financial analysis using market data and proprietary models — delivered in a concise, easy-to-understand report you can deploy confidently in negotiations or regulatory filings.`,
      },
      {
        heading: 'Practice Areas',
        list: [
          'Business & complex security valuations — 409A, Black-Scholes, Monte-Carlo models',
          'Real Estate Valuations — property, tangibles, and real estate',
          'Advanced financial modelling, M&A execution and red-flag due-diligence (USD 2m–50m range)',
          'Cross-border structuring, fractional-CFO insight and post-deal stewardship',
        ],
      },
      {
        heading: 'My Approach',
        text: `What sets me apart is a hands-on, senior-only model: every mandate is tailored to the deal thesis, executed swiftly and confidentially, and communicated in plain English so stakeholders stay in control.

If you advise, invest in, or lead privately held businesses in the Middle East — or anywhere your growth takes you — let's talk.`,
      },
    ],
  },
  {
    id: 2,
    name: 'Heewon Lee',
    initials: 'HL',
    position: 'Promotions, Distribution & Client Relationship Executive',
    tagline: 'Business Development & Operations',
    image: '/images/howlee.png',
    social: {
      linkedin: '',
      email: 'info@ydadvisory.com',
    },
    credentials: [
      { icon: <FiBriefcase />, label: 'Business Development · Promotions · Client Relations' },
      { icon: <FiGlobe />,     label: 'GCC & International Markets' },
      { icon: <FiUsers />,     label: 'Startup · Venture · Institutional Ecosystems' },
    ],
    bioSections: [
      {
        heading: 'About',
        text: `Heewon supports promotions, distribution, and client relationship initiatives, contributing to the coordination of internal processes, workflows, and client-facing engagements that underpin the firm's transaction advisory and capital markets activities.`,
      },
      {
        heading: 'Role',
        text: `Her work focuses on operational execution, project coordination, and strategic outreach that help identify opportunities, strengthen client relationships, and support the firm's growth across complex transaction environments.`,
      },
      {
        heading: 'Background',
        text: `She brings experience in market analysis, venture research, and business development across startup, venture, and institutional ecosystems — including market studies on international expansion strategies and competitive analysis to inform partnership development and client acquisition.`,
      },
    ],
  },
];

/* ═══════════════════════════════════════════════
   STYLED COMPONENTS
═══════════════════════════════════════════════ */

const Page = styled.div`
  min-height: 100vh;
  background: ${p => p.theme.colors.gray[50]};
  padding-top: 80px; /* fixed header height */
`;

/* ── Back nav bar (sits above hero, below fixed header) ── */
const BackBar = styled.div`
  background: ${p => p.theme.colors.primary[900]};
  padding: ${p => p.theme.spacing[3]} ${p => p.theme.spacing[6]};
`;

const BackBarInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

/* ── Hero banner ─────────────────────────────── */
const HeroBanner = styled.section`
  background: linear-gradient(
    135deg,
    ${p => p.theme.colors.primary[800]} 0%,
    ${p => p.theme.colors.primary[900]} 60%,
    #0a2a2a 100%
  );
  padding: ${p => p.theme.spacing[14]} 0 ${p => p.theme.spacing[16]};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -80px;
    width: 480px;
    height: 480px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(20, 184, 166, 0.11) 0%, transparent 70%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 48px;
    background: ${p => p.theme.colors.gray[50]};
    clip-path: ellipse(55% 100% at 50% 100%);
  }
`;

const HeroBannerInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing[6]};
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: ${p => p.theme.spacing[10]};

  @media (max-width: ${p => p.theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
    gap: ${p => p.theme.spacing[6]};
    padding: 0 ${p => p.theme.spacing[4]};
  }
`;

const HeroPhoto = styled.div`
  flex-shrink: 0;
  width: 160px;
  height: 160px;
  border-radius: 9999px;
  background: linear-gradient(135deg, ${p => p.theme.colors.primary[600]}, ${p => p.theme.colors.primary[800]});
  border: 4px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  span {
    color: white;
    font-size: 2.8rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    position: relative;
    z-index: 1;
  }

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    width: 130px;
    height: 130px;
  }
`;

const HeroText = styled.div`
  flex: 1;
`;

const HeroEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: ${p => p.theme.fontWeights.semibold};
  color: ${p => p.theme.colors.primary[300]};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: ${p => p.theme.spacing[3]};
  background: rgba(20, 184, 166, 0.12);
  border: 1px solid rgba(20, 184, 166, 0.3);
  padding: 5px 14px;
  border-radius: 999px;
`;

const HeroName = styled.h1`
  font-size: 2.6rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: ${p => p.theme.spacing[2]};
  line-height: 1.15;
  letter-spacing: -0.025em;
  font-family: ${p => p.theme.fonts.secondary};

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const HeroRole = styled.p`
  font-size: ${p => p.theme.fontSizes.lg};
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: ${p => p.theme.spacing[2]};
  font-weight: 500;
`;

const HeroTagline = styled.p`
  font-size: ${p => p.theme.fontSizes.base};
  color: ${p => p.theme.colors.primary[300]};
  font-style: italic;
`;

const HeroActions = styled.div`
  display: flex;
  gap: ${p => p.theme.spacing[3]};
  margin-top: ${p => p.theme.spacing[5]};

  @media (max-width: ${p => p.theme.breakpoints.md}) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const SocialBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border-radius: 999px;
  font-size: ${p => p.theme.fontSizes.sm};
  font-weight: 600;
  text-decoration: none;
  transition: all ${p => p.theme.transitions.fast};
  cursor: pointer;

  ${p => p.$variant === 'primary' ? `
    background: ${p.theme.colors.primary[500]};
    color: white;
    border: none;
    box-shadow: 0 4px 16px rgba(20, 184, 166, 0.35);
    &:hover {
      background: ${p.theme.colors.primary[400]};
      transform: translateY(-2px);
      color: white;
    }
  ` : `
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.25);
    &:hover {
      background: rgba(255, 255, 255, 0.18);
      transform: translateY(-2px);
      color: white;
    }
  `}
`;

/* ── Body layout ─────────────────────────────── */
const BodyWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: ${p => p.theme.spacing[10]} ${p => p.theme.spacing[6]} ${p => p.theme.spacing[16]};
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: ${p => p.theme.spacing[8]};
  align-items: start;

  @media (max-width: ${p => p.theme.breakpoints.lg}) {
    grid-template-columns: 270px 1fr;
    gap: ${p => p.theme.spacing[6]};
    padding: ${p => p.theme.spacing[8]} ${p => p.theme.spacing[5]} ${p => p.theme.spacing[12]};
  }

  @media (max-width: ${p => p.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${p => p.theme.spacing[6]};
    padding: ${p => p.theme.spacing[7]} ${p => p.theme.spacing[4]} ${p => p.theme.spacing[12]};
  }
`;

/* ── Left sidebar ────────────────────────────── */
const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing[6]};
`;

const SideCard = styled.div`
  background: ${p => p.theme.colors.white};
  border-radius: 18px;
  padding: ${p => p.theme.spacing[6]} ${p => p.theme.spacing[6]} ${p => p.theme.spacing[7]};
  border: 1px solid ${p => p.theme.colors.gray[100]};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const SideCardTitle = styled.h3`
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: 700;
  color: ${p => p.theme.colors.primary[600]};
  text-transform: uppercase;
  letter-spacing: 0.16em;
  margin-bottom: ${p => p.theme.spacing[4]};
  padding-bottom: ${p => p.theme.spacing[3]};
  border-bottom: 1.5px solid ${p => p.theme.colors.primary[50]};
`;

const CredentialItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${p => p.theme.spacing[3]};
  padding: ${p => p.theme.spacing[3]} 0 ${p => p.theme.spacing[3]};
  border-bottom: 1px solid ${p => p.theme.colors.gray[100]};

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  svg {
    color: ${p => p.theme.colors.primary[500]};
    font-size: 1.05rem;
    flex-shrink: 0;
    margin-top: 3px;
  }

  span {
    font-size: ${p => p.theme.fontSizes.sm};
    color: ${p => p.theme.colors.gray[600]};
    line-height: 1.6;
  }
`;

const ContactCard = styled(SideCard)`
  background: linear-gradient(
    135deg,
    ${p => p.theme.colors.primary[700]},
    ${p => p.theme.colors.primary[900]}
  );
  border: none;
`;

const ContactCardTitle = styled.h3`
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: 700;
  color: rgba(255, 255, 255, 0.55);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  margin-bottom: ${p => p.theme.spacing[3]};
`;

const ContactCardHeading = styled.p`
  font-size: ${p => p.theme.fontSizes.base};
  font-weight: 700;
  color: white;
  margin-bottom: ${p => p.theme.spacing[5]};
  line-height: 1.5;
`;

const ContactBtn = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 999px;
  border: none;
  background: white;
  color: ${p => p.theme.colors.primary[700]};
  font-weight: 700;
  font-size: ${p => p.theme.fontSizes.sm};
  cursor: pointer;
  transition: all ${p => p.theme.transitions.fast};

  &:hover {
    background: ${p => p.theme.colors.primary[50]};
    transform: translateY(-2px);
  }
`;

/* ── Main content ────────────────────────────── */
const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing[6]};
`;

const BioSection = styled.div`
  background: ${p => p.theme.colors.white};
  border-radius: 18px;
  padding: ${p => p.theme.spacing[8]};
  border: 1px solid ${p => p.theme.colors.gray[100]};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    padding: ${p => p.theme.spacing[6]};
  }
`;

const BioSectionTitle = styled.h2`
  font-size: ${p => p.theme.fontSizes.sm};
  font-weight: 700;
  color: ${p => p.theme.colors.primary[700]};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: ${p => p.theme.spacing[5]};
  padding-bottom: ${p => p.theme.spacing[4]};
  border-bottom: 1.5px solid ${p => p.theme.colors.primary[50]};
  display: flex;
  align-items: center;
  gap: ${p => p.theme.spacing[3]};

  &::before {
    content: '';
    display: inline-block;
    width: 4px;
    height: 16px;
    background: linear-gradient(180deg, ${p => p.theme.colors.primary[400]}, ${p => p.theme.colors.primary[700]});
    border-radius: 2px;
    flex-shrink: 0;
  }
`;

const BioText = styled.p`
  font-size: ${p => p.theme.fontSizes.base};
  color: ${p => p.theme.colors.gray[600]};
  line-height: 1.9;
  white-space: pre-line;

  & + & {
    margin-top: ${p => p.theme.spacing[4]};
  }
`;

const BioList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing[4]};
`;

const BioListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${p => p.theme.spacing[3]};
  font-size: ${p => p.theme.fontSizes.base};
  color: ${p => p.theme.colors.gray[600]};
  line-height: 1.7;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${p => p.theme.colors.primary[500]};
    flex-shrink: 0;
    margin-top: 8px;
  }
`;

/* ── Back nav ────────────────────────────────── */
const BackNav = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: ${p => p.theme.fontSizes.sm};
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: color ${p => p.theme.transitions.fast};

  svg { transition: transform ${p => p.theme.transitions.fast}; }

  &:hover {
    color: rgba(255, 255, 255, 0.95);
    svg { transform: translateX(-3px); }
  }
`;

/* ═══════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════ */
const TeamMemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const member = teamMembers.find(m => m.id === parseInt(id));

  if (!member) {
    return (
      <Page>
        <div style={{ textAlign: 'center', padding: '100px 24px' }}>
          <h2>Team member not found</h2>
          <button onClick={() => navigate('/team')}>Back to Team</button>
        </div>
      </Page>
    );
  }

  return (
    <Page>
      <SEO
        title={`${member.name} — YD Advisory`}
        description={`${member.position} at YD Advisory. ${member.tagline}`}
        url={`https://ydadvisory.ae/team/${member.id}`}
      />

      {/* ── Back bar ────────────────────────────────── */}
      <BackBar>
        <BackBarInner>
          <BackNav onClick={() => navigate('/team')}>
            <FiArrowLeft /> Back to Team
          </BackNav>
        </BackBarInner>
      </BackBar>

      {/* ── Hero Banner ─────────────────────────────── */}
      <HeroBanner>
        <HeroBannerInner>
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <HeroPhoto>
              {member.image && (
                <img src={member.image} alt={member.name} />
              )}
              {!member.image && <span>{member.initials}</span>}
            </HeroPhoto>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <HeroText>
              <HeroEyebrow>Our People</HeroEyebrow>
              <HeroName>{member.name}</HeroName>
              <HeroRole>{member.position}</HeroRole>
              <HeroTagline>{member.tagline}</HeroTagline>
              <HeroActions>
                {member.social.linkedin && (
                  <SocialBtn
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    $variant="primary"
                  >
                    <FiLinkedin /> LinkedIn
                  </SocialBtn>
                )}
                <SocialBtn
                  href={`mailto:${member.social.email}`}
                  $variant="outline"
                >
                  <FiMail /> Email
                </SocialBtn>
              </HeroActions>
            </HeroText>
          </motion.div>
        </HeroBannerInner>
      </HeroBanner>

      {/* ── Body ─────────────────────────────────────── */}
      <BodyWrapper>
        {/* Left Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Sidebar>
            {/* Credentials */}
            <SideCard>
              <SideCardTitle>Credentials</SideCardTitle>
              {member.credentials.map((c, i) => (
                <CredentialItem key={i}>
                  {c.icon}
                  <span>{c.label}</span>
                </CredentialItem>
              ))}
            </SideCard>

            {/* Contact CTA */}
            <ContactCard>
              <ContactCardTitle>Ready to work together?</ContactCardTitle>
              <ContactCardHeading>Start with a complimentary discovery call</ContactCardHeading>
              <ContactBtn onClick={() => navigate('/contact')}>
                Get in Touch
              </ContactBtn>
            </ContactCard>
          </Sidebar>
        </motion.div>

        {/* Main Bio Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <MainContent>
            {member.bioSections.map((section, i) => (
              <BioSection key={i}>
                <BioSectionTitle>{section.heading}</BioSectionTitle>
                {section.text && <BioText>{section.text}</BioText>}
                {section.list && (
                  <BioList>
                    {section.list.map((item, j) => (
                      <BioListItem key={j}>{item}</BioListItem>
                    ))}
                  </BioList>
                )}
              </BioSection>
            ))}
          </MainContent>
        </motion.div>
      </BodyWrapper>
    </Page>
  );
};

export default TeamMemberDetail;
