import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import {
  dealBoardMeta,
  getFeaturedDeals,
  getDealInterestMail,
  getSubmitDealMail,
  getInvestorAccessMail,
} from '../data/dealBoard';
import { openMailto, handleInteractiveLink } from '../utils/linkHelpers';

const Section = styled.section`
  padding: ${p => p.theme.spacing[16]} 0;
  background: ${p => p.theme.colors.gray[50]};
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing[4]};

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    padding: 0 ${p => p.theme.spacing[3]};
  }
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: ${p => (p.$centered ? '1fr' : 'minmax(0, 1.5fr) auto')};
  gap: ${p => p.theme.spacing[6]};
  align-items: ${p => (p.$centered ? 'center' : 'end')};
  justify-items: ${p => (p.$centered ? 'center' : 'stretch')};
  text-align: ${p => (p.$centered ? 'center' : 'left')};
  margin-bottom: ${p => p.theme.spacing[10]};

  @media (max-width: ${p => p.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    justify-items: ${p => (p.$centered ? 'center' : 'start')};
    text-align: ${p => (p.$centered ? 'center' : 'left')};
  }
`;

const HeaderCopy = styled.div`
  width: 100%;
  max-width: ${p => (p.$centered ? '1100px' : '100%')};
`;

const Eyebrow = styled.div`
  margin-bottom: ${p => p.theme.spacing[3]};
  color: ${p => p.theme.colors.primary[700]};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 0 0 ${p => p.theme.spacing[3]};
  font-size: clamp(1.85rem, 3.4vw, 2.75rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: ${p => p.theme.colors.primary[900]};
  font-weight: 700;
`;

const Intro = styled.div`
  margin: 0;
  max-width: ${p => (p.$centered ? '100%' : '640px')};
  margin-left: ${p => (p.$centered ? 'auto' : '0')};
  margin-right: ${p => (p.$centered ? 'auto' : '0')};
  color: ${p => p.theme.colors.gray[600]};
  font-size: ${p => p.theme.fontSizes.lg};
  line-height: 1.65;
`;

const IntroLine = styled.span`
  display: block;

  ${p =>
    p.$nowrap
      ? `
    white-space: nowrap;

    @media (max-width: ${p.theme.breakpoints.lg}) {
      white-space: normal;
    }
  `
      : ''}
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
  align-self: end;

  @media (max-width: ${p => p.theme.breakpoints.lg}) {
    justify-content: flex-start;
  }
`;

const PrimaryAction = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.25rem;
  border-radius: 10px;
  background: ${p => p.theme.colors.primary[800]};
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.92rem;
  letter-spacing: 0.02em;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${p => p.theme.colors.primary[900]};
    color: #fff;
    transform: translateY(-1px);
  }
`;

const SecondaryAction = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.25rem;
  border-radius: 10px;
  background: #fff;
  color: ${p => p.theme.colors.primary[900]};
  border: 1px solid ${p => p.theme.colors.gray[300]};
  font-weight: 600;
  font-size: 0.92rem;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: ${p => p.theme.colors.primary[400]};
    background: ${p => p.theme.colors.primary[50]};
    transform: translateY(-1px);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${p => p.theme.spacing[6]};

  @media (max-width: ${p => p.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${p => p.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.article)`
  background: #fff;
  border: 1px solid ${p => p.theme.colors.gray[200]};
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
  padding: 1.5rem 1.4rem 1.35rem;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const DealId = styled.div`
  color: ${p => p.theme.colors.primary[700]};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.7rem;
`;

const CardTitle = styled.h3`
  margin: 0 0 0.75rem;
  color: ${p => p.theme.colors.primary[900]};
  font-size: 1.15rem;
  line-height: 1.35;
  font-weight: 700;
`;

const Status = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 0.28rem 0.55rem;
  border: 1px solid ${p => p.theme.colors.gray[300]};
  border-radius: 6px;
  color: ${p => p.theme.colors.gray[600]};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 0.9rem;
`;

const Description = styled.p`
  margin: 0 0 1.25rem;
  color: ${p => p.theme.colors.gray[600]};
  font-size: 0.95rem;
  line-height: 1.6;
  flex: 1;
`;

const Meta = styled.dl`
  margin: 0 0 1.25rem;
  display: grid;
  gap: 0.65rem;
`;

const MetaRow = styled.div`
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: 0.75rem;
  align-items: start;

  dt {
    margin: 0;
    color: ${p => p.theme.colors.gray[500]};
    font-size: 0.85rem;
  }

  dd {
    margin: 0;
    color: ${p => p.theme.colors.primary[900]};
    font-size: 0.9rem;
    font-weight: 600;
    line-height: 1.35;
  }
`;

const InterestButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  width: 100%;
  padding: 0.85rem 1rem;
  border: none;
  border-radius: 10px;
  background: ${p => p.theme.colors.primary[700]};
  color: #fff;
  font-weight: 600;
  font-size: 0.92rem;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${p => p.theme.colors.primary[800]};
    transform: translateY(-1px);
  }
`;

const FooterNote = styled.p`
  margin: ${p => p.theme.spacing[8]} auto 0;
  color: ${p => p.theme.colors.gray[500]};
  font-size: 0.85rem;
  line-height: 1.55;
  max-width: 860px;
  text-align: ${p => (p.$centered ? 'center' : 'left')};
`;

const openMail = (mail) => {
  openMailto(mail.email, { subject: mail.subject, body: mail.body });
};

const DealCard = ({ deal, index }) => {
  const mail = getDealInterestMail(deal);

  return (
    <Card
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: '80px 0px' }}
      transition={{ duration: 0.18, delay: Math.min(index, 2) * 0.03, ease: 'easeOut' }}
    >
      <DealId>{deal.id}</DealId>
      <CardTitle>{deal.title}</CardTitle>
      <Status>{deal.status}</Status>
      <Description>{deal.description}</Description>
      <Meta>
        <MetaRow>
          <dt>Category</dt>
          <dd>{deal.category}</dd>
        </MetaRow>
        <MetaRow>
          <dt>Sector</dt>
          <dd>{deal.sector}</dd>
        </MetaRow>
      </Meta>
      <InterestButton
        type="button"
        onClick={(e) => handleInteractiveLink(e, () => openMail(mail))}
        onKeyDown={(e) => handleInteractiveLink(e, () => openMail(mail))}
      >
        Register Interest <FiArrowRight />
      </InterestButton>
    </Card>
  );
};

const DealBoardSection = ({
  deals: dealsProp,
  showActions = true,
  showDisclaimer = true,
  exploreTo = '/deal-board',
  title = dealBoardMeta.title,
  intro = dealBoardMeta.intro,
}) => {
  const items = dealsProp || getFeaturedDeals();
  const submitMail = getSubmitDealMail();
  const investorMail = getInvestorAccessMail();
  const centered = !showActions;

  return (
    <Section aria-labelledby="deal-board-heading">
      <Inner>
        <HeaderRow $centered={centered}>
          <HeaderCopy $centered={centered}>
            <Eyebrow>{dealBoardMeta.eyebrow}</Eyebrow>
            <Title id="deal-board-heading">{title}</Title>
            <Intro $centered={centered}>
              {Array.isArray(intro) ? (
                intro.map((line, i) => (
                  <IntroLine key={i} $nowrap={centered}>
                    {line}
                  </IntroLine>
                ))
              ) : (
                intro
              )}
            </Intro>
          </HeaderCopy>

          {showActions && (
            <Actions>
              <PrimaryAction to={exploreTo}>
                Explore Deals <FiArrowRight />
              </PrimaryAction>
              <SecondaryAction
                type="button"
                onClick={(e) => handleInteractiveLink(e, () => openMail(submitMail))}
                onKeyDown={(e) => handleInteractiveLink(e, () => openMail(submitMail))}
              >
                Submit a Deal <FiArrowRight />
              </SecondaryAction>
              <SecondaryAction
                type="button"
                onClick={(e) => handleInteractiveLink(e, () => openMail(investorMail))}
                onKeyDown={(e) => handleInteractiveLink(e, () => openMail(investorMail))}
              >
                Request Access <FiArrowRight />
              </SecondaryAction>
            </Actions>
          )}
        </HeaderRow>

        <Grid>
          {items.map((deal, index) => (
            <DealCard key={deal.id} deal={deal} index={index} />
          ))}
        </Grid>

        {showDisclaimer && (
          <FooterNote $centered={centered}>{dealBoardMeta.disclaimer}</FooterNote>
        )}
      </Inner>
    </Section>
  );
};

export default DealBoardSection;
