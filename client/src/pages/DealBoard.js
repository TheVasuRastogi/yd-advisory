import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import SEO from '../components/SEO';
import DealBoardSection from '../components/DealBoardSection';
import HowDealBoardWorks from '../components/HowDealBoardWorks';
import {
  deals,
  dealBoardMeta,
  getSubmitDealMail,
  getInvestorAccessMail,
} from '../data/dealBoard';
import { openMailto, handleInteractiveLink } from '../utils/linkHelpers';
import { innerPageHeroBackground } from '../styles/heroMixins';

const Page = styled.div`
  padding-top: 120px;
`;

const Hero = styled.section`
  ${innerPageHeroBackground()}
  position: relative;
  color: ${p => p.theme.colors.white};
  padding: ${p => p.theme.spacing[16]} 0 ${p => p.theme.spacing[14]};
`;

const HeroInner = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing[4]};
`;

const HeroEyebrow = styled.div`
  margin-bottom: 1rem;
  color: ${p => p.theme.colors.primary[200]};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  margin: 0 0 1rem;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.15;
  color: ${p => p.theme.colors.white};
`;

const HeroIntro = styled.p`
  margin: 0 0 1.5rem;
  max-width: 720px;
  color: rgba(255, 255, 255, 0.88);
  font-size: 1.1rem;
  line-height: 1.65;
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const HeroButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.25rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
`;

const HeroPrimary = styled(HeroButton)`
  background: #fff;
  color: ${p => p.theme.colors.primary[900]};
  border-color: #fff;

  &:hover {
    background: ${p => p.theme.colors.primary[50]};
    color: ${p => p.theme.colors.primary[900]};
  }
`;

const openMail = (mail) => {
  openMailto(mail.email, { subject: mail.subject, body: mail.body });
};

const DealBoard = () => {
  const submitMail = getSubmitDealMail();
  const investorMail = getInvestorAccessMail();

  return (
    <Page>
      <SEO
        title="YD Deal Board: Curated Private-Market Mandates"
        description={dealBoardMeta.intro}
        keywords="YD Deal Board, private market deals, capital raising, M&A mandates, investor access, YD Advisory"
        url="https://ydadvisory.ae/deal-board"
      />

      <Hero>
        <HeroInner>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <HeroEyebrow>{dealBoardMeta.eyebrow}</HeroEyebrow>
            <HeroTitle>YD Deal Board</HeroTitle>
            <HeroIntro>{dealBoardMeta.intro}</HeroIntro>
            <HeroActions>
              <HeroPrimary
                type="button"
                onClick={(e) => handleInteractiveLink(e, () => openMail(submitMail))}
                onKeyDown={(e) => handleInteractiveLink(e, () => openMail(submitMail))}
              >
                Submit a Deal <FiArrowRight />
              </HeroPrimary>
              <HeroButton
                type="button"
                onClick={(e) => handleInteractiveLink(e, () => openMail(investorMail))}
                onKeyDown={(e) => handleInteractiveLink(e, () => openMail(investorMail))}
              >
                Request Investor Access <FiArrowRight />
              </HeroButton>
            </HeroActions>
          </motion.div>
        </HeroInner>
      </Hero>

      <HowDealBoardWorks />

      <DealBoardSection
        deals={deals}
        showActions={false}
        title="All active mandates"
        intro={[
          'Browse curated opportunities across valuation, credit, capital raising, project finance and M&A.',
          'Register interest on any card to email YD Advisory, then attach your pitch deck and send.',
        ]}
      />
    </Page>
  );
};

export default DealBoard;
