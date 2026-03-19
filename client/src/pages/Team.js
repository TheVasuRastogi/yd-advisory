import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FiLinkedin, FiMail, FiArrowRight,
} from 'react-icons/fi';
import SEO from '../components/SEO';

/* ════════════════════════════════════════════════════════════════
   PAGE WRAPPER
════════════════════════════════════════════════════════════════ */

const Page = styled.div`
  padding-top: 120px;
  min-height: 100vh;
`;

/* ════════════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════════════ */

const HeroSection = styled.section`
  background: linear-gradient(
    135deg,
    ${p => p.theme.colors.primary[800]} 0%,
    ${p => p.theme.colors.primary[900]} 60%,
    #0a2a2a 100%
  );
  padding: ${p => p.theme.spacing[20]} 0 ${p => p.theme.spacing[16]};
  text-align: center;
  position: relative;
  overflow: hidden;

  /* subtle radial glow */
  &::before {
    content: '';
    position: absolute;
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 600px;
    background: radial-gradient(ellipse, rgba(20, 184, 166, 0.18) 0%, transparent 70%);
    pointer-events: none;
  }

  /* decorative arc at bottom */
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 56px;
    background: ${p => p.theme.colors.gray[50]};
    clip-path: ellipse(55% 100% at 50% 100%);
  }
`;

const HeroInner = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing[4]};
  position: relative;
  z-index: 1;

  h1 {
    font-size: 3rem;
    font-weight: ${p => p.theme.fontWeights.extrabold};
    color: ${p => p.theme.colors.white};
    margin-bottom: ${p => p.theme.spacing[5]};
    letter-spacing: -0.025em;
    line-height: 1.2;
    font-family: ${p => p.theme.fonts.secondary};

    @media (max-width: ${p => p.theme.breakpoints.md}) {
      font-size: 2.4rem;
    }

    @media (max-width: ${p => p.theme.breakpoints.sm}) {
      font-size: ${p => p.theme.fontSizes['3xl']};
    }
  }

  p {
    font-size: ${p => p.theme.fontSizes.lg};
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.7;
    max-width: 580px;
    margin: 0 auto;

    @media (max-width: ${p => p.theme.breakpoints.sm}) {
      font-size: ${p => p.theme.fontSizes.base};
    }
  }
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: ${p => p.theme.fontSizes.xs};
  font-weight: ${p => p.theme.fontWeights.semibold};
  color: ${p => p.theme.colors.primary[300]};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  margin-bottom: ${p => p.theme.spacing[5]};
  background: rgba(20, 184, 166, 0.12);
  border: 1px solid rgba(20, 184, 166, 0.3);
  padding: 6px 16px;
  border-radius: 999px;
`;

const HeroDivider = styled.div`
  width: 52px;
  height: 3px;
  background: linear-gradient(90deg, ${p => p.theme.colors.primary[400]}, ${p => p.theme.colors.primary[600]});
  border-radius: 2px;
  margin: ${p => p.theme.spacing[6]} auto 0;
`;

const TeamSection = styled.section`
  padding: ${p => p.theme.spacing[10]} 0 ${p => p.theme.spacing[6]};
  background: ${p => p.theme.colors.gray[50]};
`;

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing[4]};
`;
const SectionHead = styled.div`
  display: none;
  text-align: center;
  margin-bottom: ${p => p.theme.spacing[12]};

  h2 {
    font-size: ${p => p.theme.fontSizes['4xl']};
    font-weight: ${p => p.theme.fontWeights.bold};
    color: ${p => p.theme.colors.primary[800]};
    margin-bottom: ${p => p.theme.spacing[4]};

    @media (max-width: ${p => p.theme.breakpoints.sm}) {
      font-size: ${p => p.theme.fontSizes['2xl']};
    }
  }

  p {
    font-size: ${p => p.theme.fontSizes.xl};
    color: ${p => p.theme.colors.gray[600]};
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;

    @media (max-width: ${p => p.theme.breakpoints.sm}) {
      font-size: ${p => p.theme.fontSizes.base};
    }
  }
`;

/* Centered grid: 2 equal columns, centered if fewer cards than columns */
const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${p => p.theme.spacing[6]};
  justify-items: center;
  max-width: 980px;
  margin: 0 auto;
  padding-top: 110px;

  @media (max-width: ${p => p.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    max-width: 520px;
    margin: 0 auto;
  }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 120px;
  transition: box-shadow ${p => p.theme.transitions.base},
              transform ${p => p.theme.transitions.base};

  &:hover {
    box-shadow: ${p => p.theme.shadows.xl};
    transform: translateY(-6px);
  }
`;

/* avatar — circular badge */
const PhotoWrap = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 9999px;
  background: #ffffff;
  border: 4px solid ${p => p.theme.colors.primary[200]};
  box-shadow: 0 4px 20px rgba(20, 184, 166, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  z-index: 2;
`;

const Photo = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  opacity: 1;
  pointer-events: none;
  z-index: 2;
`;

const PhotoGradient = styled.div`
  display: none;
`;

const AvatarInitials = styled.div`
  position: relative;
  z-index: 1;
  color: ${p => p.theme.colors.white};
  font-family: ${p => p.theme.fonts.display};
  font-size: ${p => p.theme.fontSizes['2xl']};
  font-weight: ${p => p.theme.fontWeights.extrabold};
  letter-spacing: -0.02em;
  display: none;
`;

/* card content */
const CardBody = styled.div`
  padding: ${p => p.theme.spacing[3]} ${p => p.theme.spacing[6]} ${p => p.theme.spacing[8]};
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  text-align: center;

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    padding: ${p => p.theme.spacing[6]} ${p => p.theme.spacing[6]};
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
  font-size: ${p => p.theme.fontSizes.xl};
  font-weight: ${p => p.theme.fontWeights.bold};
  color: ${p => p.theme.colors.primary[900]};
  line-height: 1.2;
  margin-bottom: ${p => p.theme.spacing[1]};
  font-family: ${p => p.theme.fonts.secondary};

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    font-size: ${p => p.theme.fontSizes.xl};
  }
`;

const Tagline = styled.p`
  font-size: ${p => p.theme.fontSizes.sm};
  color: ${p => p.theme.colors.gray[500]};
  font-style: italic;
  margin-bottom: ${p => p.theme.spacing[5]};
  display: none;
`;

const CardDivider = styled.hr`
  display: none;
`;

const Bio = styled.p`
  font-size: ${p => p.theme.fontSizes.sm};
  color: ${p => p.theme.colors.gray[600]};
  line-height: 1.75;
  margin-bottom: ${p => p.theme.spacing[4]};
  flex: 1;
  max-width: 340px;
`;

const Credentials = styled.ul`
  display: none;
  padding-left: ${p => p.theme.spacing[4]};
  margin: 0 0 ${p => p.theme.spacing[5]} 0;
  color: ${p => p.theme.colors.gray[600]};
  font-size: ${p => p.theme.fontSizes.xs};
  line-height: 1.7;

  li + li {
    margin-top: 4px;
  }
`;

/* card footer with social/action buttons */
const CardFooter = styled.div`
  display: none;
  display: flex;
  flex-wrap: wrap;
  gap: ${p => p.theme.spacing[2]};
  align-items: center;
  padding-top: ${p => p.theme.spacing[5]};
  border-top: 1px solid ${p => p.theme.colors.gray[100]};
  margin-top: auto;
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
  margin-left: auto;
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

/* ════════════════════════════════════════════════════════════════
   HOW WE WORK — white bg, mirrors About.js PrincipleCard
════════════════════════════════════════════════════════════════ */

// eslint-disable-next-line no-unused-vars
const WorkCard = styled.div`
  background: ${p => p.theme.colors.white};
  border: 1px solid ${p => p.theme.colors.gray[200]};
  border-radius: ${p => p.theme.borderRadius.lg};
  padding: ${p => p.theme.spacing[6]};
  box-shadow: ${p => p.theme.shadows.sm};
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing[3]};
  transition: box-shadow ${p => p.theme.transitions.base},
              transform ${p => p.theme.transitions.base};

  &:hover {
    box-shadow: ${p => p.theme.shadows.md};
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.75rem;
    color: ${p => p.theme.colors.primary[600]};
  }

  h3 {
    font-size: ${p => p.theme.fontSizes.lg};
    font-weight: ${p => p.theme.fontWeights.semibold};
    color: ${p => p.theme.colors.primary[800]};
    margin: 0;
  }

  p {
    font-size: ${p => p.theme.fontSizes.base};
    color: ${p => p.theme.colors.gray[600]};
    line-height: 1.65;
    margin: 0;
  }
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
   COMPONENT
════════════════════════════════════════════════════════════════ */

const Team = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <SEO
        title="Our Team — YD Advisory"
        description="Meet the team behind YD Advisory — a lean, founder-led practice delivering investment-bank-grade advisory with boutique execution across valuation, M&A, and transactions."
        keywords="YD Advisory team, Yashaswi Das, Heewon Lee, valuation advisory Dubai, boutique advisory UAE"
        url="https://ydadvisory.ae/team"
      />

      {/* ── Hero ─────────────────────────────────────────────────── */}
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

      {/* ── Team cards ───────────────────────────────────────────── */}
      <TeamSection>
        <Container>
          <SectionHead>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Meet the People Behind YD Advisory
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
            >
              Every mandate is handled with senior attention — from origination
              through delivery.
            </motion.p>
          </SectionHead>

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
                <PhotoWrap>
                  <Photo
                    src="/images/team/yashaswi_das.png"
                    alt="Yashaswi Das — Founder & Principal"
                  />
                  <PhotoGradient />
                  <AvatarInitials>YD</AvatarInitials>
                </PhotoWrap>

                <CardBody>
                  <RoleBadge>FOUNDER &amp; PRINCIPAL</RoleBadge>
                  <Name>Yashaswi D.</Name>
                  <Tagline>Bespoke transaction &amp; valuation advisory</Tagline>
                  <CardDivider />

                  <Bio>
                    Leads all M&amp;A advisory, valuations, IPO readiness, and
                    capital-raise mandates — delivering Big-4 rigour at boutique
                    speed across the Gulf, South Asia &amp; the US.
                  </Bio>

                  <Credentials>
                    <li>8+ years — JPMorgan, Dubai Holding, and leading advisory mandates</li>
                    <li>50+ clients across 10+ geographies and 15+ sectors</li>
                    <li>$100M+ in value raised, structured, or unlocked</li>
                    <li>Licensed practice based in Dubai, UAE</li>
                  </Credentials>

                  <CardFooter>
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
                    <ProfileBtn onClick={() => navigate('/team/1')}>
                      Full Profile <FiArrowRight />
                    </ProfileBtn>
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
                <PhotoWrap>
                  <Photo
                    src="/images/howlee.png"
                    alt="Heewon Lee — Promotions, Distribution & Client Relationship"
                  />
                  <PhotoGradient />
                  <AvatarInitials>HL</AvatarInitials>
                </PhotoWrap>

                <CardBody>
                  <RoleBadge>BUSINESS DEVELOPMENT</RoleBadge>
                  <Name>Heewon Lee</Name>
                  <Tagline>Business Development &amp; Operations</Tagline>
                  <CardDivider />

                  <Bio>
                    Drives strategic relationships and deal origination across the
                    GCC — connecting YD Advisory mandates with the right capital,
                    counterparties &amp; investors.
                  </Bio>

                  <CardFooter>
                    <IconBtn
                      href="mailto:info@ydadvisory.com?subject=Business Inquiry — YD Advisory"
                      title="Email"
                    >
                      <FiMail />
                    </IconBtn>
                    <ProfileBtn onClick={() => navigate('/team/2')}>
                      Full Profile <FiArrowRight />
                    </ProfileBtn>
                  </CardFooter>
                </CardBody>
              </Card>
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
