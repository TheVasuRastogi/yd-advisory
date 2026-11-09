import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import {
  howDealBoardWorks,
  dealBoardMeta,
  getSubmitDealMail,
  getInvestorAccessMail,
} from '../data/dealBoard';
import { openMailto, handleInteractiveLink } from '../utils/linkHelpers';

const Section = styled.section`
  padding: ${p => (p.$compact ? p.theme.spacing[10] : p.theme.spacing[16])} 0
    ${p => (p.$compact ? p.theme.spacing[4] : p.theme.spacing[12])};
  background: ${p => (p.$compact ? 'transparent' : p.theme.colors.white)};
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing[4]};

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    padding: 0 ${p => p.theme.spacing[3]};
  }
`;

const Header = styled.div`
  text-align: ${p => (p.$compact ? 'left' : 'center')};
  margin-bottom: ${p => (p.$compact ? p.theme.spacing[6] : p.theme.spacing[10])};
  max-width: ${p => (p.$compact ? '720px' : '760px')};
  margin-left: ${p => (p.$compact ? '0' : 'auto')};
  margin-right: ${p => (p.$compact ? '0' : 'auto')};
`;

const Title = styled.h2`
  margin: 0 0 ${p => p.theme.spacing[3]};
  font-size: ${p => (p.$compact ? 'clamp(1.35rem, 2.4vw, 1.75rem)' : 'clamp(1.75rem, 3vw, 2.4rem)')};
  color: ${p => p.theme.colors.primary[900]};
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  margin: 0;
  color: ${p => p.theme.colors.gray[600]};
  font-size: ${p => (p.$compact ? '0.98rem' : '1.1rem')};
  line-height: 1.6;
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${p => (p.$compact ? p.theme.spacing[4] : p.theme.spacing[6])};

  @media (max-width: ${p => p.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const AudienceCard = styled(motion.div)`
  background: ${p => (p.$compact ? p.theme.colors.gray[50] : p.theme.colors.white)};
  border: 1px solid ${p => p.theme.colors.gray[200]};
  border-radius: ${p => (p.$compact ? '14px' : '18px')};
  padding: ${p => (p.$compact ? '1.15rem 1.1rem 1.2rem' : '1.75rem 1.6rem 1.5rem')};
  box-shadow: ${p => (p.$compact ? 'none' : '0 12px 32px rgba(15, 23, 42, 0.04)')};
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const AudienceTitle = styled.h3`
  margin: 0 0 ${p => (p.$compact ? '0.85rem' : '1.25rem')};
  color: ${p => p.theme.colors.primary[800]};
  font-size: ${p => (p.$compact ? '1.05rem' : '1.35rem')};
  font-weight: 700;
`;

const Steps = styled.div`
  display: grid;
  gap: ${p => (p.$compact ? '0.7rem' : '1.1rem')};
  flex: 1;
  margin-bottom: ${p => (p.$compact ? '1rem' : '1.35rem')};
`;

const Step = styled.div`
  display: grid;
  grid-template-columns: ${p => (p.$compact ? '28px 1fr' : '36px 1fr')};
  gap: ${p => (p.$compact ? '0.65rem' : '0.9rem')};
  align-items: start;
`;

const StepNum = styled.span`
  width: ${p => (p.$compact ? '28px' : '36px')};
  height: ${p => (p.$compact ? '28px' : '36px')};
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${p => p.theme.colors.primary[800]};
  color: #fff;
  font-weight: 700;
  font-size: ${p => (p.$compact ? '0.78rem' : '0.9rem')};
  flex-shrink: 0;
`;

const StepBody = styled.div`
  min-width: 0;
`;

const StepTitle = styled.div`
  color: ${p => p.theme.colors.primary[900]};
  font-weight: 700;
  font-size: ${p => (p.$compact ? '0.92rem' : '1.05rem')};
  line-height: 1.3;
  margin-bottom: 0.2rem;
`;

const StepText = styled.p`
  margin: 0;
  color: ${p => p.theme.colors.gray[600]};
  font-size: ${p => (p.$compact ? '0.84rem' : '0.95rem')};
  line-height: 1.5;
`;

const CtaButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: ${p => (p.$compact ? '100%' : 'auto')};
  align-self: ${p => (p.$compact ? 'stretch' : 'flex-start')};
  padding: ${p => (p.$compact ? '0.7rem 0.9rem' : '0.85rem 1.2rem')};
  border-radius: 10px;
  border: 1.5px solid ${p => p.theme.colors.primary[700]};
  background: ${p => (p.$filled ? p.theme.colors.primary[700] : '#fff')};
  color: ${p => (p.$filled ? '#fff' : p.theme.colors.primary[800])};
  font-weight: 600;
  font-size: ${p => (p.$compact ? '0.86rem' : '0.95rem')};
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${p => p.theme.colors.primary[800]};
    border-color: ${p => p.theme.colors.primary[800]};
    color: #fff;
    transform: translateY(-1px);
  }
`;

const Disclaimer = styled.p`
  margin: ${p => p.theme.spacing[8]} auto 0;
  max-width: 860px;
  text-align: center;
  color: ${p => p.theme.colors.gray[500]};
  font-size: 0.85rem;
  line-height: 1.55;
`;

const openMail = (mail) => {
  openMailto(mail.email, { subject: mail.subject, body: mail.body });
};

const HowDealBoardWorks = ({ compact = false, showDisclaimer = !compact }) => {
  const submitMail = getSubmitDealMail();
  const investorMail = getInvestorAccessMail();

  return (
    <Section $compact={compact} aria-labelledby="how-deal-board-works">
      <Inner>
        <Header $compact={compact}>
          <Title $compact={compact} id="how-deal-board-works">
            {howDealBoardWorks.title}
          </Title>
          <Subtitle $compact={compact}>{howDealBoardWorks.subtitle}</Subtitle>
        </Header>

        <Columns $compact={compact}>
          {howDealBoardWorks.audiences.map((audience, index) => {
            const mail = audience.mailType === 'investor' ? investorMail : submitMail;
            const filled = audience.mailType === 'investor';

            return (
              <AudienceCard
                key={audience.id}
                $compact={compact}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1, margin: '60px 0px' }}
                transition={{ duration: 0.18, delay: index * 0.04, ease: 'easeOut' }}
              >
                <AudienceTitle $compact={compact}>{audience.title}</AudienceTitle>
                <Steps $compact={compact}>
                  {audience.steps.map((item) => (
                    <Step key={item.step} $compact={compact}>
                      <StepNum $compact={compact}>{item.step}</StepNum>
                      <StepBody>
                        <StepTitle $compact={compact}>{item.title}</StepTitle>
                        <StepText $compact={compact}>{item.text}</StepText>
                      </StepBody>
                    </Step>
                  ))}
                </Steps>
                <CtaButton
                  type="button"
                  $compact={compact}
                  $filled={filled}
                  onClick={(e) => handleInteractiveLink(e, () => openMail(mail))}
                  onKeyDown={(e) => handleInteractiveLink(e, () => openMail(mail))}
                >
                  {audience.cta} <FiArrowRight />
                </CtaButton>
              </AudienceCard>
            );
          })}
        </Columns>

        {showDisclaimer && <Disclaimer>{dealBoardMeta.disclaimer}</Disclaimer>}
      </Inner>
    </Section>
  );
};

export default HowDealBoardWorks;
