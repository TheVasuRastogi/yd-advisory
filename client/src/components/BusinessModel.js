import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const BUSINESS_MODEL_STAGES = [
  {
    number: 1,
    title: 'Originate',
    items: [
      'Deal origination',
      'Mandate qualification',
      'Sector-led sourcing',
      'Founding-network flow',
      'Engagement scoping',
    ],
  },
  {
    number: 2,
    title: 'Prepare',
    items: [
      'Financial modelling',
      'Business valuation (IVS)',
      '409A valuation',
      'Complex security valuation',
      'Investment memorandum',
      'Financial product creation',
      'Data room preparation',
    ],
  },
  {
    number: 3,
    title: 'Raise',
    items: [
      'Equity capital raise',
      'Debt advisory',
      'Private credit placement',
      'Structured finance',
      'Islamic finance (AAOIFI)',
      'Investor targeting',
      'Term-sheet negotiation',
    ],
  },
  {
    number: 4,
    title: 'Execute',
    items: [
      'Escrow coordination',
      'Legal coordination',
      'M&A execution',
      'Due diligence',
      'Closing management',
      'Conditions-precedent tracking',
      'Deal tombstone',
    ],
  },
  {
    number: 5,
    title: 'Sustain',
    items: [
      'Fractional CFO',
      'Board & investor reporting',
      'Covenant monitoring',
      'Ongoing valuation',
      '409A annual updates',
      'Follow-on mandates',
    ],
  },
];

const Section = styled.section`
  padding: clamp(3.5rem, 6vw, 5.5rem) 0;
  background:
    radial-gradient(ellipse 80% 60% at 10% 0%, rgba(20, 184, 166, 0.07) 0%, transparent 55%),
    radial-gradient(ellipse 70% 50% at 90% 100%, rgba(15, 118, 110, 0.06) 0%, transparent 50%),
    ${p => p.theme.colors.gray[50]};
  position: relative;
  overflow: hidden;
`;

const Inner = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing[4]};
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  text-align: center;
  margin: 0 auto ${p => p.theme.spacing[12]};
  max-width: 640px;

  h2 {
    font-family: ${p => p.theme.fonts.secondary};
    font-size: clamp(1.85rem, 3.5vw, 2.65rem);
    color: ${p => p.theme.colors.primary[900]};
    margin: 0 0 ${p => p.theme.spacing[4]} 0;
    font-weight: ${p => p.theme.fontWeights.bold};
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  p {
    font-family: ${p => p.theme.fonts.primary};
    font-size: clamp(1rem, 1.6vw, 1.125rem);
    color: ${p => p.theme.colors.gray[600]};
    margin: 0;
    line-height: 1.7;
  }
`;

const Divider = styled.div`
  width: 48px;
  height: 3px;
  margin: ${p => p.theme.spacing[5]} auto 0;
  border-radius: 2px;
  background: linear-gradient(
    90deg,
    ${p => p.theme.colors.primary[400]},
    ${p => p.theme.colors.primary[700]}
  );
`;

const StagesRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 1rem;
  align-items: stretch;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(5, minmax(200px, 1fr));
    overflow-x: auto;
    padding-bottom: ${p => p.theme.spacing[3]};
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${p => p.theme.colors.primary[300]};
      border-radius: 999px;
    }
  }

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    overflow-x: visible;
    scroll-snap-type: none;
    max-width: 400px;
    margin: 0 auto;
    gap: ${p => p.theme.spacing[5]};
  }
`;

const StageCard = styled.article`
  background: ${p => p.theme.colors.white};
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  border: 1px solid rgba(19, 78, 74, 0.08);
  box-shadow:
    0 1px 2px rgba(19, 78, 74, 0.04),
    0 12px 28px rgba(19, 78, 74, 0.07);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  scroll-snap-align: start;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 4px 8px rgba(19, 78, 74, 0.06),
      0 18px 36px rgba(19, 78, 74, 0.12);
  }

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    min-height: 0;
  }
`;

const StageHeader = styled.div`
  background: linear-gradient(
    145deg,
    ${p => p.theme.colors.primary[900]} 0%,
    ${p => p.theme.colors.primary[800]} 100%
  );
  padding: 0.95rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 62px;
`;

const StageNumber = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${p => p.theme.colors.white};
  color: ${p => p.theme.colors.primary[900]};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8125rem;
  font-weight: 700;
  font-family: ${p => p.theme.fonts.primary};
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
`;

const StageTitle = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  font-family: ${p => p.theme.fonts.primary};
  color: ${p => p.theme.colors.white};
  line-height: 1.2;
  letter-spacing: -0.01em;
`;

const StageList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1.15rem 1rem 1.35rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  background: ${p => p.theme.colors.white};

  li {
    position: relative;
    padding-left: 0.95rem;
    font-size: 0.8125rem;
    color: ${p => p.theme.colors.gray[700]};
    line-height: 1.45;
    font-family: ${p => p.theme.fonts.primary};
    font-weight: 500;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.42em;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: ${p => p.theme.colors.primary[400]};
    }
  }
`;

const StageMotion = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const BusinessModel = () => (
  <Section aria-labelledby="business-model-heading">
    <Inner>
      <Header>
        <motion.h2
          id="business-model-heading"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          The Business Model
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          viewport={{ once: true }}
        >
          Every capability a complex transaction needs, delivered under one roof
          across five stages.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scaleX: 0.6 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <Divider />
        </motion.div>
      </Header>

      <StagesRow>
        {BUSINESS_MODEL_STAGES.map((stage, index) => (
          <StageMotion
            key={stage.number}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.07 }}
            viewport={{ once: true }}
          >
            <StageCard>
              <StageHeader>
                <StageNumber>{stage.number}</StageNumber>
                <StageTitle>{stage.title}</StageTitle>
              </StageHeader>
              <StageList>
                {stage.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </StageList>
            </StageCard>
          </StageMotion>
        ))}
      </StagesRow>
    </Inner>
  </Section>
);

export default BusinessModel;
