import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiMail, FiUsers, FiTrendingUp, FiClock, FiMapPin, FiSend, FiBriefcase } from 'react-icons/fi';
import SEO from '../components/SEO';

const PageContainer = styled.div`
  padding-top: 120px;
  min-height: 100vh;
  background: ${props => props.theme.colors.gray[50]};
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[800]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[16]} 0;
`;

const HeroContent = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};

  h1 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    margin-bottom: ${props => props.theme.spacing[4]};
    font-weight: ${props => props.theme.fontWeights.extrabold};
    letter-spacing: -0.03em;
    color: ${props => props.theme.colors.white};
  }

  p {
    font-size: ${props => props.theme.fontSizes.lg};
    line-height: 1.8;
    max-width: 720px;
    color: ${props => props.theme.colors.gray[100]};
  }
`;

const HeroMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[4]};
  margin-top: ${props => props.theme.spacing[8]};

  div {
    display: inline-flex;
    align-items: center;
    gap: ${props => props.theme.spacing[2]};
    font-size: ${props => props.theme.fontSizes.sm};
    padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
    border-radius: 999px;
    background: rgba(15, 118, 110, 0.4);
  }
`;

const ContentSection = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[16]} ${props => props.theme.spacing[4]};
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[10]};

  h2 {
    font-size: ${props => props.theme.fontSizes['3xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[3]};
  }

  p {
    color: ${props => props.theme.colors.gray[600]};
    max-width: 640px;
    margin: 0 auto;
    line-height: 1.7;
  }
`;

const HighlightGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${props => props.theme.spacing[6]};
  margin-bottom: ${props => props.theme.spacing[16]};

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const CultureSection = styled.section`
  margin-bottom: ${props => props.theme.spacing[16]};
`;

const CultureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${props => props.theme.spacing[6]};

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const CultureCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${props => props.theme.borderRadius['2xl']};
  min-height: 220px;
  box-shadow: ${props => props.theme.shadows.lg};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform ${props => props.theme.transitions.base};
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const CultureOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(63, 59, 59, 0.4));
  display: flex;
  align-items: flex-end;
  padding: ${props => props.theme.spacing[5]};
`;

const CultureText = styled.div`
  h3 {
    font-size: ${props => props.theme.fontSizes.lg};
    margin-bottom: ${props => props.theme.spacing[1]};
    color: ${props => props.theme.colors.white};
    font-weight: ${props => props.theme.fontWeights.semibold};
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.75);
  }

  p {
    font-size: ${props => props.theme.fontSizes.sm};
    margin: 0;
    color: ${props => props.theme.colors.white};
    opacity: 0.96;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.75);
  }
`;

const HighlightCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[6]};
  box-shadow: ${props => props.theme.shadows.md};
  border: 1px solid ${props => props.theme.colors.gray[200]};

  h3 {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[2]};
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[3]};
  }

  p {
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.7;
    margin: 0;
  }
`;

const CareersLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[10]};
`;

const CareersColumn = styled.div``;

const CareersSectionTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const CareersText = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.7;
  margin-bottom: ${props => props.theme.spacing[5]};
`;

const JobTableWrapper = styled.div`
  /* Full-bleed table (edge-to-edge) while other content stays centered */
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  position: relative;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-gutter: stable both-edges;
  overscroll-behavior-x: contain;
  touch-action: pan-x;
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  margin-bottom: ${props => props.theme.spacing[8]};
  padding-right: ${props => props.theme.spacing[4]};
  padding-bottom: ${props => props.theme.spacing[4]};
  padding-left: ${props => props.theme.spacing[4]};
  -webkit-overflow-scrolling: touch;
  scrollbar-width: auto;
  scrollbar-color: ${props => props.theme.colors.gray[400]} ${props => props.theme.colors.gray[100]};

  /* Edge fades to hint horizontal scroll */
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 22px;
    pointer-events: none;
    z-index: 2;
    opacity: 1;
    transition: opacity ${props => props.theme.transitions.fast};
  }

  &::before {
    left: 0;
    background: linear-gradient(to right, ${props => props.theme.colors.white}, rgba(255, 255, 255, 0));
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, ${props => props.theme.colors.white}, rgba(255, 255, 255, 0));
  }

  /* Desktop: fit content without horizontal scroll */
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    overflow-x: visible;
    padding-left: 0;
    padding-right: 0;

    &::before,
    &::after {
      opacity: 0;
    }
  }

  /* Custom scrollbar for mobile friendliness */
  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.gray[100]};
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.gray[400]};
    border-radius: 999px;
    border: 2px solid ${props => props.theme.colors.gray[100]};
  }
`;

const JobTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${props => props.theme.fontSizes.base};
  background: ${props => props.theme.colors.white};

  /* Desktop default: let columns size naturally to fit */
  min-width: 0;
  table-layout: auto;

  thead {
    background: ${props => props.theme.colors.gray[100]};

    th {
      text-align: left;
      padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[5]};
      font-weight: ${props => props.theme.fontWeights.semibold};
      color: ${props => props.theme.colors.gray[700]};
      white-space: nowrap;
      vertical-align: bottom;
    }
  }

  /* Tablet/mobile: enforce widths + horizontal scrolling */
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    min-width: 1240px;
    table-layout: fixed;

    /* Column sizing for consistent alignment */
    th:nth-child(1), td:nth-child(1) { width: 220px; }
    th:nth-child(2), td:nth-child(2) { width: 130px; }
    th:nth-child(3), td:nth-child(3) { width: 210px; }
    th:nth-child(4), td:nth-child(4) { width: 250px; }
    th:nth-child(5), td:nth-child(5) { width: 170px; }
    th:nth-child(6), td:nth-child(6) { width: 330px; }
    th:nth-child(7), td:nth-child(7) { width: 260px; }

    /* Make the last (CTC) column wider and fully visible on scroll */
    th:last-child,
    td:last-child {
      min-width: 270px;
    }

    td:last-child {
      padding-right: ${props => props.theme.spacing[7]};
    }
  }

  tbody tr:nth-child(even) {
    background: ${props => props.theme.colors.gray[50]};
  }

  td {
    padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[5]};
    vertical-align: top !important;
    color: ${props => props.theme.colors.gray[700]};
    /* Prefer clean wrapping (avoid syllable hyphenation) */
    word-break: normal;
    overflow-wrap: break-word;
    hyphens: none;
    line-height: 1.6;
  }

  /* CTC column: never split words like "Competitive" */
  td:last-child {
    word-break: normal;
    overflow-wrap: normal;
    white-space: normal;
  }
`;

const AfterTableCardsSection = styled.section`
  /* Standalone section (not visually tied to the table) */
  margin-top: ${props => props.theme.spacing[14]};
`;

const AfterTableCardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${props => props.theme.spacing[6]};
  align-items: stretch;

  /* Mobile: 1 column. Tablet + Desktop: 2 columns (2x2 for 4 cards). */
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const InfoCard = styled.article`
  position: relative;
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  padding: 0;
  box-shadow: 0 14px 40px rgba(2, 44, 34, 0.08);
  border: 1px solid ${props => props.theme.colors.gray[200]};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 280px;
  height: 100%;
  transition: transform ${props => props.theme.transitions.fast}, box-shadow ${props => props.theme.transitions.fast}, border-color ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 55px rgba(2, 44, 34, 0.12);
    border-color: ${props => props.theme.colors.gray[300]};
  }

  &:focus-within {
    border-color: ${props => props.theme.colors.primary[300]};
    box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.18), 0 20px 55px rgba(2, 44, 34, 0.12);
  }
`;

const InfoCardHeader = styled.div`
  position: relative;
  padding: ${props => props.theme.spacing[6]} ${props => props.theme.spacing[6]} ${props => props.theme.spacing[4]};
  background:
    radial-gradient(circle at 15% 0%, rgba(20, 184, 166, 0.18) 0%, rgba(20, 184, 166, 0.05) 35%, transparent 65%),
    linear-gradient(180deg, rgba(15, 118, 110, 0.08), rgba(255, 255, 255, 0));
  border-bottom: 1px solid ${props => props.theme.colors.gray[200]};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[5]} ${props => props.theme.spacing[5]} ${props => props.theme.spacing[3]};
  }
`;

const InfoCardHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[4]};
  min-width: 0;

  /* Mobile: allow badge to wrap under title */
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-wrap: wrap;
    align-items: flex-start;
    row-gap: ${props => props.theme.spacing[3]};
  }
`;

const InfoCardTitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  min-width: 0;
`;

const InfoCardIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  background: rgba(15, 118, 110, 0.14);
  color: ${props => props.theme.colors.primary[800]};
  border: 1px solid rgba(15, 118, 110, 0.18);

  svg {
    width: 18px;
    height: 18px;
  }
`;

const InfoCardTitle = styled.h4`
  margin: 0;
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.gray[900]};
  letter-spacing: -0.015em;
  line-height: 1.25;
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

const InfoCardBadge = styled.div`
  font-size: ${props => props.theme.fontSizes.xs};
  color: ${props => props.theme.colors.primary[800]};
  font-weight: ${props => props.theme.fontWeights.semibold};
  background: rgba(15, 118, 110, 0.10);
  border: 1px solid rgba(15, 118, 110, 0.18);
  padding: 6px 10px;
  border-radius: 999px;
  white-space: nowrap;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-left: auto;
  }
`;

const InfoCardBody = styled.div`
  position: relative;
  padding: ${props => props.theme.spacing[5]} ${props => props.theme.spacing[6]} ${props => props.theme.spacing[4]};
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};

  p {
    color: ${props => props.theme.colors.gray[600]};
    line-height: 1.7;
    margin: 0;
    max-width: 54ch;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[5]} ${props => props.theme.spacing[4]};
    gap: ${props => props.theme.spacing[3]};
  }
`;

const ContactHighlight = styled.div`
  background: ${props => props.theme.colors.gray[50]};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing[4]};
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
  min-width: 0;

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

  &:focus-visible {
    outline: 2px solid rgba(20, 184, 166, 0.55);
    outline-offset: 3px;
    border-radius: 8px;
  }
`;

const CompactContactList = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing[3]};
`;

const CompactContactItem = styled.div`
  display: grid;
  gap: 6px;
`;

const CompactContactTitle = styled.div`
  color: ${props => props.theme.colors.gray[800]};
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${props => props.theme.fontSizes.sm};
`;

const CompactContactNote = styled.div`
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.sm};
  line-height: 1.55;
`;

const InfoCardFooter = styled.div`
  margin-top: auto;
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[6]} ${props => props.theme.spacing[6]};
  border-top: 1px solid ${props => props.theme.colors.gray[200]};
  background: linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(15, 118, 110, 0.03));

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[5]} ${props => props.theme.spacing[5]};
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
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${props => props.theme.fontSizes.sm};
  align-self: flex-start;
  width: fit-content;
  transition: transform ${props => props.theme.transitions.fast}, box-shadow ${props => props.theme.transitions.fast}, filter ${props => props.theme.transitions.fast};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 25px rgba(20, 184, 166, 0.4);
    filter: saturate(1.05);
  }

  &:focus-visible {
    outline: 2px solid rgba(20, 184, 166, 0.55);
    outline-offset: 3px;
    border-radius: ${props => props.theme.borderRadius.xl};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const Careers = () => {
  const careersEmail = 'Yashaswi.das@ydadvisory.ae';

  return (
    <PageContainer>
      <SEO
        title="Careers at YD Advisory"
        description="Join YD Advisory and work on complex valuations, transaction advisory, and strategic finance projects across the Middle East and beyond."
        url="https://ydadvisory.ae/careers"
      />

      <HeroSection>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Join the Team Shaping Modern Valuation & Advisory
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            At YD Advisory, you work on real deals and real numbers from day one – across 409A, complex
            valuations, transaction advisory and strategic finance projects for high‑growth companies and investors.
          </motion.p>

          <HeroMeta>
            <div>
              <FiTrendingUp /> Steep learning curve & ownership
            </div>
            <div>
              <FiUsers /> Inclusive, founder‑led culture
            </div>
            <div>
              <FiClock /> Hybrid, outcomes‑driven workstyle
            </div>
          </HeroMeta>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <SectionHeader>
          <h2>Why Build Your Career at YD Advisory?</h2>
          <p>
            We are a specialist valuation and advisory boutique. That means lean teams, direct client exposure and
            meaningful work – not time spent navigating layers of hierarchy. You will see the impact of your work on
            real transactions, real valuations and real boardroom conversations.
          </p>
        </SectionHeader>

        <HighlightGrid>
          <HighlightCard as={motion.div} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
            <h3><FiTrendingUp /> Steep Learning Curve</h3>
            <p>
              Work directly with founders, CFOs and investors on live mandates. You will build models, write decks and
              speak to clients – not just make slides in the background.
            </p>
          </HighlightCard>

          <HighlightCard as={motion.div} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} viewport={{ once: true }}>
            <h3><FiUsers /> Equal Opportunity</h3>
            <p>
              YD Advisory is committed to diversity and meritocracy. We actively support women in leadership and hire
              purely on skills, attitude and potential.
            </p>
          </HighlightCard>

          <HighlightCard as={motion.div} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
            <h3><FiMapPin /> Hybrid & Global</h3>
            <p>
              Our work is anchored in Dubai with clients across the GCC, India and beyond. We combine in‑person time
              for collaboration with flexible, hybrid work.
            </p>
          </HighlightCard>

          <HighlightCard as={motion.div} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} viewport={{ once: true }}>
            <h3><FiArrowRight /> High Impact Work</h3>
            <p>
              From fund‑raises and M&A to structuring and board reporting, your analysis directly informs decisions –
              you see your work implemented in the real world.
            </p>
          </HighlightCard>

          <HighlightCard as={motion.div} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}>
            <h3><FiClock /> Balance & Wellness</h3>
            <p>
              We believe great work happens when people are at their best. We plan workloads sensibly, respect time
              off and encourage long‑term, sustainable careers.
            </p>
          </HighlightCard>

          <HighlightCard as={motion.div} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} viewport={{ once: true }}>
            <h3><FiMail /> Direct Access to Leadership</h3>
            <p>
              Work closely with the founder and senior team. If you have ideas on how to improve a model, process or
              client experience, you will be heard.
            </p>
          </HighlightCard>
        </HighlightGrid>

        <CultureSection>
          <CareersSectionTitle>Life at YD Advisory</CareersSectionTitle>
          <CareersText>
            Our team is built around curiosity, accountability and trust. We keep teams small so everyone in the room
            adds value – from interns to senior managers. Offsites, team dinners and working sessions at client
            offices are all part of how we stay connected.
          </CareersText>

          <CultureGrid>
            <CultureCard as={motion.div} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <img
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80"
                alt="YD Advisory team collaborating in a meeting room"
              />
              <CultureOverlay>
                <CultureText>
                  <h3>Deal Room Energy</h3>
                  <p>Whiteboards, models and strategy discussions with founders and investors.</p>
                </CultureText>
              </CultureOverlay>
            </CultureCard>

            <CultureCard as={motion.div} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }} viewport={{ once: true }}>
              <img
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80"
                alt="YD Advisory hybrid work and flexible workspace"
              />
              <CultureOverlay>
                <CultureText>
                  <h3>Hybrid & Flexible</h3>
                  <p>Structured in-office time for collaboration, flexibility for deep work and life outside work.</p>
                </CultureText>
              </CultureOverlay>
            </CultureCard>

            <CultureCard as={motion.div} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80"
                alt="YD Advisory team social event"
              />
              <CultureOverlay>
                <CultureText>
                  <h3>Team First</h3>
                  <p>We celebrate wins together and support each other through tough deadlines and big milestones.</p>
                </CultureText>
              </CultureOverlay>
            </CultureCard>
          </CultureGrid>
        </CultureSection>

        <CareersLayout>
          <CareersColumn>
            <CareersSectionTitle>Open Roles</CareersSectionTitle>
            <CareersText>
              We regularly hire across valuation, transaction advisory, financial modeling and operations. Below is a
              snapshot of current roles – if you do not see an exact match, you can still write to us.
            </CareersText>

            <JobTableWrapper>
              <JobTable>
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
                  <tr>
                    <td>Manager – Investment Research</td>
                    <td>Full‑time</td>
                    <td>MBA/PGDM in Finance or Analytics</td>
                    <td>
                      Strong DCF/LBO fundamentals, valuation and cash‑flow analysis; advanced Excel; clear communication.
                    </td>
                    <td>4–7 years of relevant experience</td>
                    <td>
                      Lead valuations and due diligence; build LBO/DCF models; run scenarios and risk analysis; own client-ready outputs (CIMs, decks).
                    </td>
                    <td>Competitive, based on experience</td>
                  </tr>
                  <tr>
                    <td>Project Leader – Marketing &amp; Business Development</td>
                    <td>Full‑time</td>
                    <td>MBA</td>
                    <td>
                      SEO/SEM + performance marketing; strong analytics; sales alignment; campaign ownership.
                    </td>
                    <td>5+ years in B2B marketing</td>
                    <td>
                      Drive digital growth (SEO/SEM, paid, content); track funnels; optimise CAC/ROI; handle market/competitor analysis; travel as needed.
                    </td>
                    <td>Competitive, with performance incentives</td>
                  </tr>
                  <tr>
                    <td>Summer Interns – Remote</td>
                    <td>2 months</td>
                    <td>MBA Batch 2026</td>
                    <td>MBA in Marketing, Finance or Operations</td>
                    <td>0</td>
                    <td>
                      Remote 2‑month internship for MBA students. Strong performers may be considered for PPOs.
                    </td>
                    <td>Unpaid (with PPO consideration)</td>
                  </tr>
                  <tr>
                    <td>Summer Interns – On‑site (Dubai)</td>
                    <td>2 months</td>
                    <td>MBA Batch 2026</td>
                    <td>MBA in Marketing, Finance or Operations</td>
                    <td>0</td>
                    <td>
                      Full‑time, on‑site internship in Dubai. Stipend/benefits depend on college ranking. PPOs for top performers.
                    </td>
                    <td>Stipend based on college ranking</td>
                  </tr>
                </tbody>
              </JobTable>
            </JobTableWrapper>
          </CareersColumn>
        </CareersLayout>

        <AfterTableCardsSection>
          <CareersSectionTitle>Careers Contact & Applications</CareersSectionTitle>
          <CareersText>
            Apply in minutes, or reach out directly and we’ll route your profile to the right opportunity.
          </CareersText>
          <AfterTableCardsGrid>
            <InfoCard as={motion.div} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} viewport={{ once: true }}>
              <InfoCardHeader>
                <InfoCardHeaderRow>
                  <InfoCardTitleWrap>
                    <InfoCardIcon aria-hidden="true">
                      <FiSend />
                    </InfoCardIcon>
                    <InfoCardTitle>How to Apply</InfoCardTitle>
                  </InfoCardTitleWrap>
                  <InfoCardBadge>Fast track</InfoCardBadge>
                </InfoCardHeaderRow>
              </InfoCardHeader>
              <InfoCardBody>
                <p>Share your CV plus a short note on why YD Advisory. If relevant, include examples of models, decks or writing you’re proud of.</p>
                <ContactHighlight>
                  <ContactHighlightLabel>Careers email</ContactHighlightLabel>
                  <ContactHighlightRow>
                    <FiMail aria-hidden="true" />
                    <EmailLink href={`mailto:${careersEmail}`}>{careersEmail}</EmailLink>
                  </ContactHighlightRow>
                </ContactHighlight>
              </InfoCardBody>
              <InfoCardFooter>
                <CTAButton to="/contact">
                  Talk to our team <FiArrowRight />
                </CTAButton>
              </InfoCardFooter>
            </InfoCard>

            <InfoCard as={motion.div} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }} viewport={{ once: true }}>
              <InfoCardHeader>
                <InfoCardHeaderRow>
                  <InfoCardTitleWrap>
                    <InfoCardIcon aria-hidden="true">
                      <FiUsers />
                    </InfoCardIcon>
                    <InfoCardTitle>Campus &amp; Early Careers</InfoCardTitle>
                  </InfoCardTitleWrap>
                  <InfoCardBadge>Internships</InfoCardBadge>
                </InfoCardHeaderRow>
              </InfoCardHeader>
              <InfoCardBody>
                <p>We partner with leading universities for internships and analyst roles. For campus programs, reach out to the careers desk.</p>
                <ContactHighlight>
                  <ContactHighlightLabel>Campus contact</ContactHighlightLabel>
                  <ContactHighlightRow>
                    <FiMail aria-hidden="true" />
                    <EmailLink href={`mailto:${careersEmail}`}>{careersEmail}</EmailLink>
                  </ContactHighlightRow>
                </ContactHighlight>
              </InfoCardBody>
              <InfoCardFooter>
                <CTAButton to="/contact">
                  Explore early roles <FiArrowRight />
                </CTAButton>
              </InfoCardFooter>
            </InfoCard>

            <InfoCard as={motion.div} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }} viewport={{ once: true }}>
              <InfoCardHeader>
                <InfoCardHeaderRow>
                  <InfoCardTitleWrap>
                    <InfoCardIcon aria-hidden="true">
                      <FiBriefcase />
                    </InfoCardIcon>
                    <InfoCardTitle>Experienced Hires</InfoCardTitle>
                  </InfoCardTitleWrap>
                  <InfoCardBadge>Always open</InfoCardBadge>
                </InfoCardHeaderRow>
              </InfoCardHeader>
              <InfoCardBody>
                <p>If you have experience in valuations, investment banking, transaction advisory, Big‑4 deals or high‑growth finance teams, we’d love to hear from you.</p>
                <ContactHighlight>
                  <ContactHighlightLabel>Send your profile</ContactHighlightLabel>
                  <ContactHighlightRow>
                    <FiMail aria-hidden="true" />
                    <EmailLink href={`mailto:${careersEmail}`}>{careersEmail}</EmailLink>
                  </ContactHighlightRow>
                  <CompactContactNote>Include a short note on the work you enjoy plus your latest CV (or deal sheet).</CompactContactNote>
                </ContactHighlight>
              </InfoCardBody>
              <InfoCardFooter>
                <CTAButton to="/contact">
                  Connect with us <FiArrowRight />
                </CTAButton>
              </InfoCardFooter>
            </InfoCard>

            <InfoCard as={motion.div} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.15 }} viewport={{ once: true }}>
              <InfoCardHeader>
                <InfoCardHeaderRow>
                  <InfoCardTitleWrap>
                    <InfoCardIcon aria-hidden="true">
                      <FiMapPin />
                    </InfoCardIcon>
                    <InfoCardTitle>Careers Contact Overview</InfoCardTitle>
                  </InfoCardTitleWrap>
                  <InfoCardBadge>Get routed</InfoCardBadge>
                </InfoCardHeaderRow>
              </InfoCardHeader>
              <InfoCardBody>
                <p>Not sure which role fits you best? Reach out and we’ll route your profile to the right opportunity.</p>
                <ContactHighlight>
                  <ContactHighlightLabel>Contacts</ContactHighlightLabel>
                  <CompactContactList>
                    <CompactContactItem>
                      <CompactContactTitle>General careers &amp; experienced hires</CompactContactTitle>
                      <ContactHighlightRow>
                        <FiMail aria-hidden="true" />
                        <EmailLink href={`mailto:${careersEmail}`}>{careersEmail}</EmailLink>
                      </ContactHighlightRow>
                      <CompactContactNote>Full‑time roles across valuation, transaction advisory, modelling and operations.</CompactContactNote>
                    </CompactContactItem>
                    <CompactContactItem>
                      <CompactContactTitle>Campus &amp; early careers</CompactContactTitle>
                      <ContactHighlightRow>
                        <FiMail aria-hidden="true" />
                        <EmailLink href={`mailto:${careersEmail}`}>{careersEmail}</EmailLink>
                      </ContactHighlightRow>
                      <CompactContactNote>Internships, analyst programs and campus partnerships.</CompactContactNote>
                    </CompactContactItem>
                  </CompactContactList>
                </ContactHighlight>
              </InfoCardBody>
              <InfoCardFooter>
                <CTAButton to="/contact">
                  Contact careers team <FiArrowRight />
                </CTAButton>
              </InfoCardFooter>
            </InfoCard>
          </AfterTableCardsGrid>
        </AfterTableCardsSection>
      </ContentSection>
    </PageContainer>
  );
};

export default Careers;

