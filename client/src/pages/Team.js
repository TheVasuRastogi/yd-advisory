import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import {
  FiLinkedin, FiMail, FiArrowRight,
} from 'react-icons/fi';
import SEO from '../components/SEO';
import InitialsAvatar from '../components/InitialsAvatar';
import portraitYashaswi from '../assets/team/yashaswi_das.png';
import portraitHeewon from '../assets/team/howlee.png';

/* ════════════════════════════════════════════════════════════════
   PAGE WRAPPER
════════════════════════════════════════════════════════════════ */

/* Inner green disc diameter; cream ring adds FOREST_GOLD_RING*2 in InitialsAvatar */
const AVATAR_SIZE = 148;
/** Photo frame outer size — aligned with InitialsAvatar forestGold outer */
const MEMBER_PHOTO_OUTER = AVATAR_SIZE + 10;
const STACK_SIZE = 44;
const STACK_OVERLAP = -14;

/** Shared look for team summary stack — theme primary teal (matches cards / +N chip) */
const teamStackCircleLook = css`
  background: ${p =>
    `linear-gradient(165deg, ${p.theme.colors.primary[900]} 0%, ${p.theme.colors.primary[800]} 100%)`};
  border: 2px solid ${p => p.theme.colors.white};
  color: ${p => p.theme.colors.primary[50]};
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.06),
    0 6px 16px ${p => p.theme.colors.primary[900]}33;
`;

const Page = styled.div`
  padding-top: 120px;
  min-height: 100vh;
  background: ${p => p.theme.colors.white};
`;

/* ════════════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════════════ */

const HeroSection = styled.section`
  background: transparent;
  padding: ${p => p.theme.spacing[12]} 0 ${p => p.theme.spacing[8]};
  text-align: center;
  position: relative;
`;

const HeroInner = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing[4]};
  position: relative;
  z-index: 1;

  h1 {
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    font-weight: ${p => p.theme.fontWeights.bold};
    color: ${p => p.theme.colors.primary[900]};
    margin-bottom: ${p => p.theme.spacing[5]};
    letter-spacing: -0.02em;
    line-height: 1.2;
    font-family: ${p => p.theme.fonts.secondary};
  }

  p {
    font-size: ${p => p.theme.fontSizes.lg};
    color: ${p => p.theme.colors.gray[600]};
    line-height: 1.7;
    max-width: 580px;
    margin: 0 auto;
    font-family: ${p => p.theme.fonts.primary};

    @media (max-width: ${p => p.theme.breakpoints.sm}) {
      font-size: ${p => p.theme.fontSizes.base};
    }
  }
`;

const Eyebrow = styled.div`
  display: inline-block;
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: ${p => p.theme.fontWeights.semibold};
  color: ${p => p.theme.colors.primary[700]};
  text-transform: uppercase;
  letter-spacing: 0.28em;
  margin-bottom: ${p => p.theme.spacing[4]};
`;

const HeroDivider = styled.div`
  width: 56px;
  height: 2px;
  background: linear-gradient(
    90deg,
    ${p => p.theme.colors.primary[400]},
    ${p => p.theme.colors.primary[600]}
  );
  border-radius: 2px;
  margin: ${p => p.theme.spacing[6]} auto 0;
`;

const TeamSection = styled.section`
  padding: ${p => p.theme.spacing[4]} 0 ${p => p.theme.spacing[16]};
  background: ${p => p.theme.colors.white};
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing[4]};
`;

/* Top row: two profile cards; bottom row: summary card spans full width */
const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${p => p.theme.spacing[8]};
  justify-items: stretch;
  max-width: 100%;
  margin: 0 auto;
  padding-top: ${p => p.theme.spacing[8]};

  @media (max-width: ${p => p.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    max-width: 520px;
    padding-top: ${p => p.theme.spacing[6]};
  }

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    gap: ${p => p.theme.spacing[10]};
    padding-top: ${p => p.theme.spacing[5]};
  }
`;

const TeamSummaryCard = styled.div`
  display: grid;
  grid-template-columns: minmax(140px, 200px) 1fr;
  gap: ${p => p.theme.spacing[8]};
  align-items: center;
  background: ${p => p.theme.colors.white};
  border: 1px solid ${p => p.theme.colors.gray[200]};
  border-radius: ${p => p.theme.borderRadius['2xl']};
  padding: ${p => p.theme.spacing[8]} ${p => p.theme.spacing[10]};
  box-shadow: 0 8px 32px rgba(27, 48, 34, 0.06);
  position: relative;
  overflow: hidden;

  @media (max-width: ${p => p.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
    padding: ${p => p.theme.spacing[8]};
  }
`;

const SummaryStat = styled.div`
  text-align: center;
  padding-right: ${p => p.theme.spacing[6]};
  border-right: 1px solid ${p => p.theme.colors.gray[200]};

  @media (max-width: ${p => p.theme.breakpoints.md}) {
    border-right: none;
    padding-right: 0;
    padding-bottom: ${p => p.theme.spacing[6]};
    border-bottom: 1px solid ${p => p.theme.colors.gray[200]};
  }
`;

const SummaryNumber = styled.div`
  font-family: ${p => p.theme.fonts.secondary};
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: ${p => p.theme.fontWeights.bold};
  color: ${p => p.theme.colors.primary[700]};
  line-height: 1;
  margin-bottom: ${p => p.theme.spacing[2]};
`;

const SummaryLabel = styled.div`
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: ${p => p.theme.fontWeights.semibold};
  color: ${p => p.theme.colors.gray[600]};
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const SummaryBody = styled.div`
  position: relative;
  padding-right: 140px;
  min-height: 88px;

  @media (max-width: ${p => p.theme.breakpoints.md}) {
    padding-right: 0;
    min-height: 0;
  }

  h3 {
    font-family: ${p => p.theme.fonts.secondary};
    font-size: ${p => p.theme.fontSizes['2xl']};
    color: ${p => p.theme.colors.primary[900]};
    margin: 0 0 ${p => p.theme.spacing[4]} 0;
    font-weight: ${p => p.theme.fontWeights.bold};
  }

  p {
    margin: 0;
    font-size: ${p => p.theme.fontSizes.base};
    color: ${p => p.theme.colors.gray[600]};
    line-height: 1.7;
    font-family: ${p => p.theme.fonts.primary};
  }
`;

const AvatarStack = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  flex-direction: row;
  /* Later circles paint on top */
  isolation: isolate;

  @media (max-width: ${p => p.theme.breakpoints.md}) {
    position: relative;
    margin-top: ${p => p.theme.spacing[6]};
    justify-content: center;
    bottom: auto;
    right: auto;
  }
`;

const StackAvatar = styled(InitialsAvatar)`
  /* Override forest seal + compact so stack matches theme teal + +N chip */
  && {
    ${teamStackCircleLook}
  }

  position: relative;
  flex-shrink: 0;

  &:nth-child(1) {
    z-index: 1;
  }
  &:nth-child(2) {
    z-index: 2;
  }
  &:not(:first-child) {
    margin-left: ${STACK_OVERLAP}px;
  }
`;

const StackCircleMore = styled.span`
  ${teamStackCircleLook}
  width: ${STACK_SIZE}px;
  height: ${STACK_SIZE}px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${STACK_SIZE * 0.38}px;
  font-weight: ${p => p.theme.fontWeights.bold};
  font-family: ${p => p.theme.fonts.secondary};
  flex-shrink: 0;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-left: ${STACK_OVERLAP}px;
  position: relative;
  z-index: 3;
  font-variant-numeric: tabular-nums;
  -webkit-font-smoothing: antialiased;
`;

/* ─── Card ─────────────────────────────────────────────────── */

const Card = styled.div`
  width: 100%;
  background: ${p => p.theme.colors.white};
  border: 1px solid ${p => p.theme.colors.gray[200]};
  border-radius: ${p => p.theme.borderRadius['2xl']};
  box-shadow: 0 10px 30px rgba(20, 184, 166, 0.08);
  overflow: visible;
  position: relative;
  display: grid;
  grid-template-rows: 1fr auto;
  align-items: stretch;
  min-height: 400px;
  gap: ${p => p.theme.spacing[4]};
  padding: ${p => p.theme.spacing[6]} ${p => p.theme.spacing[5]} ${p => p.theme.spacing[6]};
  transition: box-shadow ${p => p.theme.transitions.base},
              transform ${p => p.theme.transitions.base};

  &:hover {
    box-shadow: ${p => p.theme.shadows.xl};
    transform: translateY(-6px);
  }

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    padding: ${p => p.theme.spacing[5]} ${p => p.theme.spacing[4]} ${p => p.theme.spacing[5]};
    min-height: 0;
    grid-template-rows: auto auto;
  }
`;

/* Forest + gold + white ring — centered in upper card area (grid row 1fr) */
const CardAvatarRow = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardAvatar = styled(InitialsAvatar)`
  display: flex;
  flex-shrink: 0;
`;

const CardPhotoFrame = styled.div`
  width: ${MEMBER_PHOTO_OUTER}px;
  height: ${MEMBER_PHOTO_OUTER}px;
  border-radius: 50%;
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 0;
  /* Ring sits on the outside only — no inner gap between photo and border */
  border: 2px solid ${p => p.theme.colors.primary[300]};
  box-shadow:
    0 0 0 1px ${p => p.theme.colors.primary[100]},
    0 12px 32px rgba(20, 184, 166, 0.16);
  overflow: hidden;
  background: ${p => p.theme.colors.white};
`;

const CardPhoto = styled.img`
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  border-radius: 50%;
  object-fit: cover;
  /* Anchor to top so hair/head aren’t cropped; cover still fills the circle edge-to-edge */
  object-position: center top;
  display: block;
  /* Crisp circular clip (avoids faint gaps at the rim in some browsers) */
  transform: translateZ(0);
`;

/* card content */
const CardBody = styled.div`
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  text-align: center;

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    padding: 0;
  }
`;

const RoleBadge = styled.span`
  display: inline-block;
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: ${p => p.theme.fontWeights.semibold};
  color: ${p => p.theme.colors.primary[700]};
  background: none;
  border: none;
  border-radius: ${p => p.theme.borderRadius.full};
  padding: 0;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: ${p => p.theme.spacing[3]};
`;

const Name = styled.h3`
  font-size: ${p => p.theme.fontSizes['2xl']};
  font-weight: ${p => p.theme.fontWeights.bold};
  color: ${p => p.theme.colors.gray[900]};
  line-height: 1.2;
  margin-bottom: ${p => p.theme.spacing[3]};
  font-family: ${p => p.theme.fonts.secondary};

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    font-size: ${p => p.theme.fontSizes.xl};
  }
`;

/* Credential / region tags (small caps) — from profile detail */
const MemberTags = styled.p`
  font-size: ${p => p.theme.fontSizes.xs};
  color: ${p => p.theme.colors.gray[600]};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin: 0 0 ${p => p.theme.spacing[5]} 0;
  font-family: ${p => p.theme.fonts.primary};
`;

const CardDivider = styled.hr`
  display: block;
  width: 100%;
  max-width: 280px;
  border: none;
  border-top: 1px solid ${p => p.theme.colors.gray[200]};
  margin: 0 0 ${p => p.theme.spacing[5]} 0;
`;

const Bio = styled.p`
  font-size: ${p => p.theme.fontSizes.sm};
  color: ${p => p.theme.colors.gray[700]};
  line-height: 1.75;
  margin-bottom: ${p => p.theme.spacing[6]};
  flex: 1;
  max-width: 380px;

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    font-size: ${p => p.theme.fontSizes.base};
    line-height: 1.65;
  }
`;

/* card footer with social/action buttons */
const CardFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${p => p.theme.spacing[3]};
  align-items: center;
  justify-content: center;
  padding-top: ${p => p.theme.spacing[2]};
  margin-top: auto;
  width: 100%;

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    gap: ${p => p.theme.spacing[3]};
  }
`;

const IconBtn = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${p => p.theme.borderRadius.lg};
  background: ${p => p.theme.colors.primary[50]};
  border: 1px solid ${p => p.theme.colors.primary[200]};
  color: ${p => p.theme.colors.primary[600]};
  font-size: 1rem;
  text-decoration: none;
  transition: all ${p => p.theme.transitions.base};
  flex-shrink: 0;

  &:hover {
    background: ${p => p.theme.colors.primary[600]};
    border-color: ${p => p.theme.colors.primary[600]};
    color: ${p => p.theme.colors.white};
    transform: translateY(-2px);
    box-shadow: ${p => p.theme.shadows.md};
  }
`;

const ProfileBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: ${p => p.theme.colors.primary[600]};
  font-size: ${p => p.theme.fontSizes.sm};
  font-weight: ${p => p.theme.fontWeights.semibold};
  cursor: pointer;
  padding: 0;
  transition: all ${p => p.theme.transitions.base};

  svg {
    font-size: 0.8rem;
    transition: transform ${p => p.theme.transitions.fast};
  }

  &:hover {
    color: ${p => p.theme.colors.primary[800]};

    svg { transform: translateX(3px); }
  }
`;

const CardFooterInner = styled.div`
  display: flex;
  width: 100%;
  max-width: 360px;
  align-items: center;
  justify-content: space-between;
  gap: ${p => p.theme.spacing[4]};

  @media (max-width: 400px) {
    flex-direction: column;
    gap: ${p => p.theme.spacing[4]};
  }
`;

const IconGroup = styled.div`
  display: flex;
  gap: ${p => p.theme.spacing[2]};
  align-items: center;
`;

/* ════════════════════════════════════════════════════════════════
   CTA — exact match to About.js
════════════════════════════════════════════════════════════════ */

const CtaSection = styled.section`
  background: linear-gradient(
    135deg,
    ${p => p.theme.colors.primary[700]},
    ${p => p.theme.colors.primary[800]}
  );
  color: ${p => p.theme.colors.white};
  padding: ${p => p.theme.spacing[16]} 0;
  text-align: center;
`;

const CtaInner = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing[4]};

  h2 {
    font-size: ${p => p.theme.fontSizes['4xl']};
    font-weight: ${p => p.theme.fontWeights.bold};
    color: ${p => p.theme.colors.white};
    margin-bottom: ${p => p.theme.spacing[6]};

    @media (max-width: ${p => p.theme.breakpoints.sm}) {
      font-size: ${p => p.theme.fontSizes['2xl']};
    }
  }

  p {
    font-size: ${p => p.theme.fontSizes.xl};
    color: ${p => p.theme.colors.gray[200]};
    margin-bottom: ${p => p.theme.spacing[8]};
    line-height: 1.6;

    @media (max-width: ${p => p.theme.breakpoints.sm}) {
      font-size: ${p => p.theme.fontSizes.base};
    }
  }
`;

const CtaButton = styled.button`
  background: linear-gradient(
    135deg,
    ${p => p.theme.colors.primary[600]},
    ${p => p.theme.colors.primary[700]}
  );
  color: ${p => p.theme.colors.white};
  padding: ${p => p.theme.spacing[4]} ${p => p.theme.spacing[8]};
  border: none;
  border-radius: ${p => p.theme.borderRadius.lg};
  font-size: ${p => p.theme.fontSizes.lg};
  font-weight: ${p => p.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${p => p.theme.transitions.base};
  box-shadow: ${p => p.theme.shadows.lg};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${p => p.theme.shadows.xl};
    background: linear-gradient(
      135deg,
      ${p => p.theme.colors.primary[700]},
      ${p => p.theme.colors.primary[800]}
    );
  }
`;

/* ════════════════════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════════════════════ */

/* ════════════════════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════════════════════ */

/** First letter of first name + first letter of last name (e.g. "Jane Doe" → "JD") */
function getInitials(displayName) {
  const parts = displayName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '—';
  if (parts.length === 1) {
    const w = parts[0];
    return w.slice(0, 2).toUpperCase();
  }
  const first = parts[0][0] || '';
  const last = parts[parts.length - 1][0] || '';
  return `${first}${last}`.toUpperCase();
}

/** Same paths as TeamMemberDetail — photo with teal frame, fallback to initials */
function MemberAvatar({ image, displayName, name }) {
  const [failed, setFailed] = useState(false);
  const initials = getInitials(displayName);
  if (!image || failed) {
    return (
      <CardAvatar
        initials={initials}
        variant="forestGold"
        size={AVATAR_SIZE}
        aria-label={`${name} — initials`}
      />
    );
  }
  return (
    <CardPhotoFrame>
      <CardPhoto
        src={image}
        alt={`${name}, portrait`}
        onError={() => setFailed(true)}
        loading="lazy"
        decoding="async"
      />
    </CardPhotoFrame>
  );
}

/* ════════════════════════════════════════════════════════════════
   COMPONENT
════════════════════════════════════════════════════════════════ */

const Team = () => {
  const navigate = useNavigate();

  const memberYashaswi = 'Yashaswi Das';
  const memberHeewon = 'Heewon Lee';
  /** Bundled URLs so portraits always resolve (fallback: initials on error) */
  const imageYashaswi = portraitYashaswi;
  const imageHeewon = portraitHeewon;

  return (
    <Page>
      <SEO
        title="Our Team — YD Advisory"
        description="Meet the team behind YD Advisory — a lean, founder-led practice delivering investment-bank-grade advisory with boutique execution across valuation, M&A, and transactions."
        keywords="YD Advisory team, Yashaswi Das, Heewon Lee, valuation advisory Dubai, boutique advisory UAE"
        url="https://ydadvisory.ae/team"
      />

      {/* ── Intro (cream band — “Our People” reference) ─────────── */}
      <HeroSection>
        <HeroInner>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow>Our People</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            The Minds Behind the Mandate
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            Institutional-grade thinking with founder-led execution — every
            valuation and transaction decision stays crisp, defensible, and
            deal-ready.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <HeroDivider />
          </motion.div>
        </HeroInner>
      </HeroSection>

      {/* ── Team cards + summary ─────────────────────────────────── */}
      <TeamSection>
        <Container>
          <CardsGrid>
            {/* ── Yashaswi Das ─────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{ width: '100%' }}
            >
              <Card>
                <CardAvatarRow>
                  <MemberAvatar
                    image={imageYashaswi}
                    displayName={memberYashaswi}
                    name={memberYashaswi}
                  />
                </CardAvatarRow>

                <CardBody>
                  <RoleBadge>FOUNDER &amp; PRINCIPAL</RoleBadge>
                  <Name>{memberYashaswi}</Name>
                  <MemberTags>CA · CFA · Valuation</MemberTags>

                  <Bio>
                    Leads all M&amp;A advisory, valuations, IPO readiness, and
                    capital-raise mandates — delivering Big-4 rigour at boutique
                    speed across the Gulf, South Asia &amp; the US.
                  </Bio>

                  <CardDivider />

                  <CardFooter>
                    <CardFooterInner>
                      <IconGroup>
                        <IconBtn
                          href="https://www.linkedin.com/in/yashaswi-das/"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="LinkedIn"
                        >
                          <FiLinkedin />
                        </IconBtn>
                        <IconBtn
                          href="mailto:Yashaswi.das@ydadvisory.ae?subject=Business Inquiry — YD Advisory"
                          title="Email"
                        >
                          <FiMail />
                        </IconBtn>
                      </IconGroup>
                      <ProfileBtn type="button" onClick={() => navigate('/team/1')}>
                        Full Profile <FiArrowRight />
                      </ProfileBtn>
                    </CardFooterInner>
                  </CardFooter>
                </CardBody>
              </Card>
            </motion.div>

            {/* ── Heewon Lee ───────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              style={{ width: '100%' }}
            >
              <Card>
                <CardAvatarRow>
                  <MemberAvatar
                    image={imageHeewon}
                    displayName={memberHeewon}
                    name={memberHeewon}
                  />
                </CardAvatarRow>

                <CardBody>
                  <RoleBadge>BUSINESS DEVELOPMENT</RoleBadge>
                  <Name>{memberHeewon}</Name>
                  <MemberTags>GCC · Venture · Institutional</MemberTags>

                  <Bio>
                    Drives strategic relationships and deal origination across the
                    GCC — connecting YD Advisory mandates with the right capital,
                    counterparties &amp; investors.
                  </Bio>

                  <CardDivider />

                  <CardFooter>
                    <CardFooterInner>
                      <IconGroup>
                        <IconBtn
                          href="mailto:info@ydadvisory.com?subject=Business Inquiry — YD Advisory"
                          title="Email"
                        >
                          <FiMail />
                        </IconBtn>
                      </IconGroup>
                      <ProfileBtn type="button" onClick={() => navigate('/team/2')}>
                        Full Profile <FiArrowRight />
                      </ProfileBtn>
                    </CardFooterInner>
                  </CardFooter>
                </CardBody>
              </Card>
            </motion.div>

            {/* ── Team depth summary (existing site metrics) ───────── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              style={{ gridColumn: '1 / -1' }}
            >
              <TeamSummaryCard>
                <SummaryStat>
                  <SummaryNumber>50+</SummaryNumber>
                  <SummaryLabel>Clients</SummaryLabel>
                </SummaryStat>
                <SummaryBody>
                  <h3>Senior attention on every mandate</h3>
                  <p>
                    Every mandate is handled with senior attention — from origination
                    through delivery. Our track record includes 50+ clients across
                    10+ geographies and 15+ sectors, with $100M+ in value raised,
                    structured, or unlocked — led by principals with 8+ years of
                    frontline experience at institutions such as JPMorgan and Dubai
                    Holding.
                  </p>
                  <AvatarStack aria-hidden>
                    <StackAvatar
                      initials={getInitials(memberYashaswi)}
                      variant="seal"
                      size={STACK_SIZE}
                      compact
                    />
                    <StackAvatar
                      initials={getInitials(memberHeewon)}
                      variant="seal"
                      size={STACK_SIZE}
                      compact
                    />
                    <StackCircleMore>+2</StackCircleMore>
                  </AvatarStack>
                </SummaryBody>
              </TeamSummaryCard>
            </motion.div>
          </CardsGrid>
        </Container>
      </TeamSection>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <CtaSection>
        <CtaInner>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Work with YD Advisory?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Whether you need a valuation, transaction support, or a trusted
            advisory partner — we are ready to engage.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <CtaButton onClick={() => navigate('/contact')}>
              Get in Touch
            </CtaButton>
          </motion.div>
        </CtaInner>
      </CtaSection>
    </Page>
  );
};

export default Team;
