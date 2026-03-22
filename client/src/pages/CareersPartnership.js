import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import SEO from '../components/SEO';

/* Align with site theme — teal primary scale (see theme.js + PageHero) */

const Page = styled.div`
  padding-top: 120px;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${p => p.theme.colors.primary[50]} 0%,
    ${p => p.theme.colors.white} 55%
  );
`;

/* ═══ Hero ═══ */
const Hero = styled.section`
  position: relative;
  background:
    radial-gradient(ellipse 55% 120% at 50% 0%, rgba(255, 255, 255, 0.08) 0%, transparent 55%),
    linear-gradient(
      165deg,
      ${p => p.theme.colors.primary[900]} 0%,
      ${p => p.theme.colors.primary[800]} 45%,
      ${p => p.theme.colors.primary[700]} 100%
    );
  color: ${p => p.theme.colors.white};
  overflow: hidden;
  padding: ${p => p.theme.spacing[12]} ${p => p.theme.spacing[6]} ${p => p.theme.spacing[16]};
  padding-top: calc(${p => p.theme.spacing[12]} + env(safe-area-inset-top, 0px));

  @media (max-width: ${p => p.theme.breakpoints.md}) {
    padding: ${p => p.theme.spacing[10]} ${p => p.theme.spacing[4]} ${p => p.theme.spacing[14]};
  }

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    padding: ${p => p.theme.spacing[8]} ${p => p.theme.spacing[4]} ${p => p.theme.spacing[12]};
  }
`;

const HeroDecor = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  opacity: 0.4;
  background-image:
    radial-gradient(circle at 88% 18%, transparent 0%, transparent 42%, rgba(94, 234, 212, 0.14) 43%, rgba(94, 234, 212, 0.14) 44%, transparent 45%),
    radial-gradient(circle at 92% 35%, transparent 0%, transparent 38%, rgba(45, 212, 191, 0.1) 39%, rgba(45, 212, 191, 0.1) 40%, transparent 41%);
`;

const HeroInner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const HeroTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${p => p.theme.spacing[8]};
  margin-bottom: ${p => p.theme.spacing[5]};
  flex-wrap: wrap;
`;

/* Logo + partnership label stacked (matches reference layout) */
const HeroBrandCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${p => p.theme.spacing[4]};
  min-width: 0;
  flex: 1 1 260px;
`;

const BrandLockup = styled.div`
  font-family: ${p => p.theme.fonts.display};
  font-size: ${p => p.theme.fontSizes.lg};
  font-weight: ${p => p.theme.fontWeights.bold};
  letter-spacing: 0.02em;
  line-height: 1.25;

  span:first-child {
    color: ${p => p.theme.colors.white};
  }
  span:last-child {
    color: ${p => p.theme.colors.primary[300]};
    font-weight: ${p => p.theme.fontWeights.semibold};
  }
`;

const HeroEyebrow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${p => p.theme.spacing[2]};
`;

const HeroEyebrowLine = styled.span`
  width: 40px;
  height: 1px;
  background: ${p => p.theme.colors.primary[300]};
  border-radius: 1px;
`;

const HeroEyebrowText = styled.span`
  font-size: ${p => p.theme.fontSizes.xs};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.primary[300]};
  font-weight: ${p => p.theme.fontWeights.semibold};
`;

const HeroTagline = styled.p`
  margin: 0;
  font-size: ${p => p.theme.fontSizes.xs};
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.92);
  font-weight: ${p => p.theme.fontWeights.medium};
  text-align: right;
  max-width: min(340px, 46vw);
  line-height: 1.5;
  padding-top: 4px;
  flex: 0 1 auto;

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    text-align: left;
    max-width: none;
    flex: 1 1 100%;
    order: 3;
  }
`;

const HeroTitle = styled.h1`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: ${p => p.theme.fontWeights.bold};
  line-height: 1;
  margin-bottom: ${p => p.theme.spacing[6]};
  max-width: 20ch;
  color: ${p => p.theme.colors.white};

  em {
    font-style: italic;
    color: ${p => p.theme.colors.primary[300]};
    font-weight: ${p => p.theme.fontWeights.normal};
    font-size: 0.72em;
  }

  .line2 {
    display: block;
    margin-top: 0.06em;
    line-height: 1;
  }
`;

const HeroBody = styled.p`
  font-size: clamp(1rem, 1.35vw, 1.125rem);
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.88);
  max-width: min(1040px, 100%);
  font-weight: ${p => p.theme.fontWeights.normal};
  margin: 0;
  text-wrap: balance;

  br {
    display: none;
  }

  @media (min-width: ${p => p.theme.breakpoints.md}) {
    br.hero-break {
      display: inline;
    }
  }
`;

/* ═══ Section shell ═══ */
const Section = styled.section`
  padding: ${p => p.theme.spacing[16]} ${p => p.theme.spacing[4]};

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    padding: ${p => p.theme.spacing[10]} ${p => p.theme.spacing[4]};
  }
`;

const SectionInner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
`;

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${p => p.theme.spacing[4]};
  margin-bottom: ${p => p.theme.spacing[8]};
`;

const SectionLabelText = styled.span`
  font-size: ${p => p.theme.fontSizes.xs};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.primary[700]};
  font-weight: ${p => p.theme.fontWeights.semibold};
  white-space: nowrap;
`;

const SectionLabelRule = styled.div`
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    ${p => p.theme.colors.primary[300]}55,
    ${p => p.theme.colors.primary[200]}18
  );
  min-width: 0;
`;

/* How it works — white card */
const StepsCard = styled.div`
  background: ${p => p.theme.colors.white};
  border: 1px solid ${p => p.theme.colors.gray[200]};
  border-radius: ${p => p.theme.borderRadius['2xl']};
  box-shadow: 0 4px 24px rgba(20, 184, 166, 0.08);
  overflow: hidden;
`;

const StepRow = styled.div`
  padding: ${p => p.theme.spacing[8]} ${p => p.theme.spacing[8]};

  &:not(:last-child) {
    border-bottom: 1px solid ${p => p.theme.colors.gray[200]};
  }

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    padding: ${p => p.theme.spacing[6]};
  }
`;

const StepMeta = styled.div`
  font-size: ${p => p.theme.fontSizes.xs};
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.primary[700]};
  font-weight: ${p => p.theme.fontWeights.semibold};
  margin-bottom: ${p => p.theme.spacing[3]};
`;

const StepTitle = styled.h3`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes['2xl']};
  color: ${p => p.theme.colors.gray[900]};
  margin-bottom: ${p => p.theme.spacing[3]};
  font-weight: ${p => p.theme.fontWeights.bold};
`;

const StepBody = styled.p`
  font-size: ${p => p.theme.fontSizes.base};
  color: ${p => p.theme.colors.gray[600]};
  line-height: 1.65;
  max-width: 52rem;
`;

/* What we bring — dark card */
const DarkValueCard = styled.div`
  background: linear-gradient(
    145deg,
    ${p => p.theme.colors.primary[900]} 0%,
    ${p => p.theme.colors.primary[800]} 100%
  );
  border-radius: 20px;
  padding: ${p => p.theme.spacing[10]} ${p => p.theme.spacing[8]};
  border: 1px solid rgba(45, 212, 191, 0.22);

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    padding: ${p => p.theme.spacing[8]} ${p => p.theme.spacing[5]};
  }
`;

const ValueList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing[8]};
`;

const ValueItem = styled.li`
  display: flex;
  gap: ${p => p.theme.spacing[5]};
  align-items: flex-start;
`;

const ValueIcon = styled.span`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.5px solid ${p => p.theme.colors.primary[300]};
  color: ${p => p.theme.colors.primary[300]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;

  svg {
    width: 14px;
    height: 14px;
    stroke-width: 2.5;
  }
`;

const ValueItemTitle = styled.h4`
  font-size: ${p => p.theme.fontSizes.lg};
  font-weight: ${p => p.theme.fontWeights.bold};
  color: ${p => p.theme.colors.white};
  margin-bottom: ${p => p.theme.spacing[2]};
`;

const ValueItemText = styled.p`
  font-size: ${p => p.theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.6;
  max-width: 40rem;
`;

/* Built for — pills */
const BuiltGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${p => p.theme.spacing[4]};

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Pill = styled.div`
  background: ${p => p.theme.colors.white};
  border: 1px solid ${p => p.theme.colors.gray[200]};
  border-radius: 999px;
  padding: ${p => p.theme.spacing[5]} ${p => p.theme.spacing[6]};
  text-align: center;
  font-size: ${p => p.theme.fontSizes.sm};
  font-weight: ${p => p.theme.fontWeights.bold};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.gray[700]};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: ${p => p.theme.colors.primary[300]};
    box-shadow: 0 4px 16px rgba(20, 184, 166, 0.12);
  }
`;

/* Referral card */
const ReferralCard = styled.div`
  background: ${p => p.theme.colors.primary[50]};
  border: 1px solid ${p => p.theme.colors.primary[200]};
  border-radius: ${p => p.theme.borderRadius['2xl']};
  padding: ${p => p.theme.spacing[10]} ${p => p.theme.spacing[8]};
  max-width: 800px;
  margin: 0 auto;
`;

const ReferralStat = styled.div`
  text-align: center;
  margin-bottom: ${p => p.theme.spacing[8]};
`;

const ReferralBig = styled.div`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: clamp(3rem, 8vw, 4.5rem);
  font-weight: ${p => p.theme.fontWeights.bold};
  color: ${p => p.theme.colors.primary[900]};
  line-height: 1;

  sup {
    font-size: 0.45em;
    vertical-align: super;
    font-weight: ${p => p.theme.fontWeights.semibold};
  }
`;

const ReferralSub = styled.div`
  font-size: ${p => p.theme.fontSizes.xs};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.primary[700]};
  margin-top: ${p => p.theme.spacing[3]};
  font-weight: ${p => p.theme.fontWeights.semibold};
`;

const ReferralDivider = styled.div`
  width: 48px;
  height: 1px;
  background: ${p => p.theme.colors.primary[400]};
  margin: ${p => p.theme.spacing[5]} auto 0;
  opacity: 0.85;
`;

const ReferralHeading = styled.h3`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes.xl};
  color: ${p => p.theme.colors.gray[900]};
  margin-bottom: ${p => p.theme.spacing[4]};
  font-weight: ${p => p.theme.fontWeights.bold};
`;

const ReferralBody = styled.p`
  font-size: ${p => p.theme.fontSizes.base};
  color: ${p => p.theme.colors.gray[600]};
  line-height: 1.75;
`;

/* Commitments grid */
const CommitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${p => p.theme.spacing[6]};
  align-items: stretch;

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

/* Top accent strip — avoids border-top + border-radius glitches */
const CommitAccent = styled.div`
  height: 3px;
  width: 100%;
  flex-shrink: 0;
  background: ${p =>
    p.$goldAccent ? p.theme.colors.primary[500] : p.theme.colors.primary[800]};
`;

const CommitCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: ${p => p.theme.colors.white};
  border-radius: ${p => p.theme.borderRadius['2xl']};
  border: 1px solid ${p => p.theme.colors.gray[200]};
  box-shadow: 0 4px 18px rgba(20, 184, 166, 0.08);
  overflow: hidden;
`;

const CommitCardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${p => p.theme.spacing[6]} ${p => p.theme.spacing[7]} ${p => p.theme.spacing[8]};
  min-height: 0;
`;

const CommitLabel = styled.div`
  font-size: ${p => p.theme.fontSizes.xs};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.primary[700]};
  font-weight: ${p => p.theme.fontWeights.semibold};
  margin-bottom: ${p => p.theme.spacing[3]};
  line-height: 1.35;
`;

const CommitTitle = styled.h4`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: ${p => p.theme.fontSizes.xl};
  color: ${p => p.theme.colors.gray[900]};
  margin: 0 0 ${p => p.theme.spacing[3]};
  font-weight: ${p => p.theme.fontWeights.bold};
  line-height: 1.25;
`;

const CommitText = styled.p`
  font-size: ${p => p.theme.fontSizes.sm};
  color: ${p => p.theme.colors.gray[600]};
  line-height: 1.6;
  margin: 0;
  flex: 1;
  text-wrap: balance;

  @supports not (text-wrap: balance) {
    max-width: 52ch;
  }
`;

/* White label */
const WLCard = styled.div`
  background: ${p => p.theme.colors.white};
  border-radius: 18px;
  padding: ${p => p.theme.spacing[10]} ${p => p.theme.spacing[8]};
  box-shadow: 0 8px 32px rgba(20, 184, 166, 0.1);
  border: 1px solid ${p => p.theme.colors.gray[200]};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${p => p.theme.spacing[12]};

  @media (max-width: ${p => p.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${p => p.theme.spacing[8]};
  }
`;

const WLTitle = styled.h3`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  color: ${p => p.theme.colors.gray[900]};
  margin-bottom: ${p => p.theme.spacing[5]};
  font-weight: ${p => p.theme.fontWeights.bold};
  line-height: 1.2;
`;

const WLBody = styled.p`
  font-size: ${p => p.theme.fontSizes.base};
  color: ${p => p.theme.colors.gray[600]};
  line-height: 1.75;
`;

const WLList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing[6]};
`;

const WLItem = styled.li`
  display: flex;
  gap: ${p => p.theme.spacing[3]};
  align-items: flex-start;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${p => p.theme.colors.primary[500]};
    margin-top: 0.45rem;
    flex-shrink: 0;
  }
`;

const WLItemTitle = styled.strong`
  display: block;
  font-size: ${p => p.theme.fontSizes.base};
  color: ${p => p.theme.colors.gray[800]};
  margin-bottom: ${p => p.theme.spacing[1]};
  font-weight: ${p => p.theme.fontWeights.bold};
`;

const WLItemText = styled.span`
  font-size: ${p => p.theme.fontSizes.sm};
  color: ${p => p.theme.colors.gray[600]};
  line-height: 1.55;
`;

/* Final CTA */
const CtaBand = styled.section`
  padding: ${p => p.theme.spacing[16]} ${p => p.theme.spacing[4]} ${p => p.theme.spacing[20]};
`;

const CtaCard = styled.div`
  position: relative;
  max-width: 1120px;
  margin: 0 auto;
  background: linear-gradient(
    135deg,
    ${p => p.theme.colors.primary[900]} 0%,
    ${p => p.theme.colors.primary[800]} 100%
  );
  border-radius: 24px;
  padding: ${p => p.theme.spacing[12]} ${p => p.theme.spacing[10]};
  overflow: hidden;
  border: 1px solid rgba(45, 212, 191, 0.25);

  &::after {
    content: '';
    position: absolute;
    right: -80px;
    top: -100px;
    width: 320px;
    height: 320px;
    border: 1px solid rgba(94, 234, 212, 0.15);
    border-radius: 50%;
    pointer-events: none;
  }

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    padding: ${p => p.theme.spacing[10]} ${p => p.theme.spacing[6]};
  }
`;

const CtaInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 36rem;
`;

const CtaEyebrow = styled.div`
  font-size: ${p => p.theme.fontSizes.xs};
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: ${p => p.theme.colors.primary[300]};
  font-weight: ${p => p.theme.fontWeights.semibold};
  margin-bottom: ${p => p.theme.spacing[4]};
`;

const CtaTitle = styled.h2`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  color: ${p => p.theme.colors.white};
  margin-bottom: ${p => p.theme.spacing[5]};
  font-weight: ${p => p.theme.fontWeights.bold};
  line-height: 1.2;
`;

const CtaBody = styled.p`
  font-size: ${p => p.theme.fontSizes.base};
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.7;
  margin-bottom: ${p => p.theme.spacing[8]};
`;

const ApplyBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${p => p.theme.spacing[2]};
  background: ${p => p.theme.colors.white};
  color: ${p => p.theme.colors.primary[800]};
  padding: ${p => p.theme.spacing[3]} ${p => p.theme.spacing[8]};
  border-radius: 999px;
  font-weight: ${p => p.theme.fontWeights.bold};
  font-size: ${p => p.theme.fontSizes.sm};
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.2);
    background: ${p => p.theme.colors.primary[50]};
    color: ${p => p.theme.colors.primary[900]};
  }
`;

const CtaFoot = styled.div`
  margin-top: ${p => p.theme.spacing[8]};
  font-size: ${p => p.theme.fontSizes.sm};
  color: rgba(255, 255, 255, 0.45);
`;

const FooterContactLink = styled(Link)`
  display: inline-block;
  margin-top: 2rem;
  text-align: center;
  color: ${p => p.theme.colors.primary[700]};
  font-weight: ${p => p.theme.fontWeights.semibold};
  text-decoration: none;
  border-bottom: 1px solid ${p => p.theme.colors.primary[300]};
  transition: color ${p => p.theme.transitions.fast},
    border-color ${p => p.theme.transitions.fast};

  &:hover {
    color: ${p => p.theme.colors.primary[800]};
    border-bottom-color: ${p => p.theme.colors.primary[500]};
  }
`;

const BUILT_FOR = ['Bankers', 'Advisors', 'Consultants', 'Trusted professionals'];

const CareersPartnership = () => {
  const careersEmail = 'Yashaswi.das@ydadvisory.ae';

  return (
    <Page>
      <SEO
        title="Become a Partner — YD Advisory Partnership Programme"
        description="Join YD Advisory as a referral partner or white-label collaborator. Trusted professionals introduce deal flow; we execute M&A end-to-end. Success-linked commissions."
        keywords="YD Advisory partner, referral partner Dubai, M&A partnership UAE, white label advisory"
        url="https://ydadvisory.ae/careers/partnership"
      />

      <Hero>
        <HeroDecor aria-hidden="true" />
        <HeroInner>
          <HeroTop>
            <HeroBrandCol>
              <BrandLockup>
                <span>YD</span> <span>Advisory</span>
              </BrandLockup>
              <HeroEyebrow>
                <HeroEyebrowLine aria-hidden />
                <HeroEyebrowText>Partnership programme</HeroEyebrowText>
              </HeroEyebrow>
            </HeroBrandCol>
            <HeroTagline>Your network · Our execution</HeroTagline>
          </HeroTop>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <HeroTitle>
              Join Us <em>as a</em>
              <span className="line2">Partner</span>
            </HeroTitle>
            <HeroBody>
              We are selectively onboarding trusted professionals who can introduce business owners, investors, and deal
              opportunities into our network — and earn meaningful success fees when transactions close.
              <br className="hero-break" /> We also offer full white label advisory support for firms who want to extend
              their M&amp;A capability under their own brand.
            </HeroBody>
          </motion.div>
        </HeroInner>
      </Hero>

      <Section>
        <SectionInner>
          <SectionLabel>
            <SectionLabelText>How it works</SectionLabelText>
            <SectionLabelRule />
          </SectionLabel>
          <StepsCard>
            <StepRow>
              <StepMeta>Step 01</StepMeta>
              <StepTitle>You make the introduction</StepTitle>
              <StepBody>
                Introduce a business owner or investor from your network to YD Advisory — that is your entire role in the
                origination.
              </StepBody>
            </StepRow>
            <StepRow>
              <StepMeta>Step 02</StepMeta>
              <StepTitle>We handle full execution</StepTitle>
              <StepBody>
                YD Advisory runs all negotiation, due diligence, structuring, and deal execution. No further effort required
                from you.
              </StepBody>
            </StepRow>
            <StepRow>
              <StepMeta>Step 03</StepMeta>
              <StepTitle>You earn on close</StepTitle>
              <StepBody>
                When the deal successfully closes, you receive a referral commission — paid on completion, structured
                transparently.
              </StepBody>
            </StepRow>
          </StepsCard>
        </SectionInner>
      </Section>

      <Section style={{ paddingTop: 0 }}>
        <SectionInner>
          <SectionLabel>
            <SectionLabelText>What we bring to every deal</SectionLabelText>
            <SectionLabelRule />
          </SectionLabel>
          <DarkValueCard>
            <ValueList>
              {[
                {
                  t: 'Qualified buyers',
                  d: 'Pre-screened acquirers and investors matched to each mandate with precision.',
                },
                {
                  t: 'Vetted deal pipeline',
                  d: 'Transactions are assessed for credibility and commercial substance before we engage.',
                },
                {
                  t: 'Full M&A execution',
                  d: 'Valuation, structuring, negotiation, and closing — managed end to end by our team.',
                },
                {
                  t: 'No close, no fee',
                  d: 'If we cannot execute, neither you nor we earn. Performance-linked throughout.',
                },
              ].map((item) => (
                <ValueItem key={item.t}>
                  <ValueIcon>
                    <FiCheck aria-hidden />
                  </ValueIcon>
                  <div>
                    <ValueItemTitle>{item.t}</ValueItemTitle>
                    <ValueItemText>{item.d}</ValueItemText>
                  </div>
                </ValueItem>
              ))}
            </ValueList>
          </DarkValueCard>
        </SectionInner>
      </Section>

      <Section>
        <SectionInner>
          <SectionLabel>
            <SectionLabelText>Built for</SectionLabelText>
            <SectionLabelRule />
          </SectionLabel>
          <BuiltGrid>
            {BUILT_FOR.map((label) => (
              <Pill key={label}>{label}</Pill>
            ))}
          </BuiltGrid>
        </SectionInner>
      </Section>

      <Section>
        <SectionInner>
          <SectionLabel>
            <SectionLabelText>Referral commission</SectionLabelText>
            <SectionLabelRule />
          </SectionLabel>
          <ReferralCard>
            <ReferralStat>
              <ReferralBig>
                10–15<sup>%</sup>
              </ReferralBig>
              <ReferralSub>Of advisory fee</ReferralSub>
              <ReferralDivider />
            </ReferralStat>
            <ReferralHeading>You earn when deals close</ReferralHeading>
            <ReferralBody>
              Partners receive 10–15% of YD Advisory&apos;s advisory fee upon successful transaction close. The arrangement is
              confidential, selective, and entirely performance-linked — no retainer, no upfront commitment.
            </ReferralBody>
          </ReferralCard>
        </SectionInner>
      </Section>

      <Section>
        <SectionInner>
          <SectionLabel>
            <SectionLabelText>Our commitments to partners</SectionLabelText>
            <SectionLabelRule />
          </SectionLabel>
          <CommitGrid>
            <CommitCard>
              <CommitAccent />
              <CommitCardBody>
                <CommitLabel>Confidential</CommitLabel>
                <CommitTitle>Strict NDA framework</CommitTitle>
                <CommitText>
                  All introductions and deal information are treated with full professional confidentiality at every stage.
                </CommitText>
              </CommitCardBody>
            </CommitCard>
            <CommitCard>
              <CommitAccent />
              <CommitCardBody>
                <CommitLabel>Selective</CommitLabel>
                <CommitTitle>Application-based</CommitTitle>
                <CommitText>
                  We onboard a limited number of partners to maintain deal quality and the integrity of our network.
                </CommitText>
              </CommitCardBody>
            </CommitCard>
            <CommitCard>
              <CommitAccent />
              <CommitCardBody>
                <CommitLabel>Success-only</CommitLabel>
                <CommitTitle>No close, no fee</CommitTitle>
                <CommitText>
                  Fees — including partner commissions — are payable exclusively upon successful transaction close.
                </CommitText>
              </CommitCardBody>
            </CommitCard>
            <CommitCard>
              <CommitAccent $goldAccent />
              <CommitCardBody>
                <CommitLabel>White label</CommitLabel>
                <CommitTitle>Your brand. Our work.</CommitTitle>
                <CommitText>
                  Full advisory under your brand — for firms extending M&amp;A without building internal capacity.
                </CommitText>
              </CommitCardBody>
            </CommitCard>
          </CommitGrid>
        </SectionInner>
      </Section>

      <Section>
        <SectionInner>
          <SectionLabel>
            <SectionLabelText>White label support</SectionLabelText>
            <SectionLabelRule />
          </SectionLabel>
          <WLCard>
            <div>
              <WLTitle>Your brand. Our execution.</WLTitle>
              <WLBody>
                For advisory firms, banks, and consultancies who want to deliver transaction advisory to their clients without
                building an in-house M&amp;A team — YD Advisory operates entirely behind the scenes under your brand.
              </WLBody>
            </div>
            <WLList>
              <WLItem>
                <div>
                  <WLItemTitle>Fully unbranded deliverables</WLItemTitle>
                  <WLItemText>
                    All reports, models, and advisory outputs are produced in your firm&apos;s name and brand identity.
                  </WLItemText>
                </div>
              </WLItem>
              <WLItem>
                <div>
                  <WLItemTitle>Complete confidentiality</WLItemTitle>
                  <WLItemText>
                    YD Advisory&apos;s involvement is never disclosed to your client. Strict NDA in place at all times.
                  </WLItemText>
                </div>
              </WLItem>
              <WLItem>
                <div>
                  <WLItemTitle>Full M&amp;A scope available</WLItemTitle>
                  <WLItemText>
                    Valuation, financial due diligence, deal structuring, negotiation support — any or all, on demand.
                  </WLItemText>
                </div>
              </WLItem>
              <WLItem>
                <div>
                  <WLItemTitle>Flexible engagement model</WLItemTitle>
                  <WLItemText>
                    Engage us per transaction or on a standing arrangement — structured around your client pipeline.
                  </WLItemText>
                </div>
              </WLItem>
            </WLList>
          </WLCard>
        </SectionInner>
      </Section>

      <CtaBand>
        <CtaCard>
          <CtaInner>
            <CtaEyebrow>Apply now</CtaEyebrow>
            <CtaTitle>Become a YD Advisory Partner</CtaTitle>
            <CtaBody>
              If you work with business owners, investors, or deal-flow across the Middle East and beyond, we would like to hear
              from you. Applications are reviewed on a selective basis.
            </CtaBody>
            <ApplyBtn
              href={`mailto:${careersEmail}?subject=${encodeURIComponent('Partner application — YD Advisory')}&body=${encodeURIComponent(
                'Hello YD Advisory,\n\nI would like to apply to the partnership programme.\n\nBackground:\n\nProposed collaboration:\n\n'
              )}`}
            >
              Apply now <FiArrowRight aria-hidden />
            </ApplyBtn>
            <CtaFoot>ydadvisory.ae</CtaFoot>
          </CtaInner>
        </CtaCard>
        <SectionInner style={{ textAlign: 'center' }}>
          <FooterContactLink to="/contact">
            Or speak to our team via Contact
          </FooterContactLink>
        </SectionInner>
      </CtaBand>
    </Page>
  );
};

export default CareersPartnership;
