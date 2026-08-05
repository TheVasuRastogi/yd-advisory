import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SPECIALIST_INDUSTRIES = [
  'Fintech and Embedded Finance',
  'Tokenisation and Blockchain Infrastructure',
  'Digital Assets and Web3',
  'Real World Asset Tokenisation',
  'Biotechnology, Healthcare and Life Sciences',
  'Mining and Critical Minerals',
  'Metals and Commodities',
  'Renewable Energy and Sustainable Infrastructure',
];

const Section = styled.section`
  padding: clamp(3.5rem, 6vw, 5.5rem) 0;
  background: ${p =>
    p.$alt
      ? p.theme.colors.white
      : `linear-gradient(180deg, ${p.theme.colors.gray[50]} 0%, ${p.theme.colors.white} 100%)`};
`;

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing[4]};
`;

const Header = styled.div`
  text-align: center;
  margin: 0 auto ${p => p.theme.spacing[10]};
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem 1.5rem;

  @media (max-width: ${p => p.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 0.65rem;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem 1.15rem;
  background: ${p => p.theme.colors.gray[50]};
  border: 1px solid ${p => p.theme.colors.gray[200]};
  border-radius: 12px;
  font-family: ${p => p.theme.fonts.primary};
  font-size: 0.9375rem;
  color: ${p => p.theme.colors.primary[900]};
  line-height: 1.45;
  font-weight: 600;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: ${p => p.theme.colors.primary[200]};
    box-shadow: 0 8px 20px rgba(19, 78, 74, 0.08);
    transform: translateY(-2px);
  }
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${p => p.theme.colors.primary[500]};
  flex-shrink: 0;
  box-shadow: 0 0 0 4px ${p => p.theme.colors.primary[100]};
`;

/**
 * Specialist industry coverage — used on Home, Services, About.
 * @param {{ altBackground?: boolean }} props
 */
const SpecialistIndustryCoverage = ({ altBackground = false }) => (
  <Section $alt={altBackground} aria-labelledby="specialist-industry-heading">
    <Inner>
      <Header>
        <motion.h2
          id="specialist-industry-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          Specialist Industry Coverage
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          viewport={{ once: true }}
        >
          Deep sector expertise across digital finance, real assets, life sciences,
          and the energy transition — applied from origination through close.
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

      <Grid>
        {SPECIALIST_INDUSTRIES.map((industry, index) => (
          <motion.div
            key={industry}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            viewport={{ once: true }}
          >
            <Item>
              <Dot aria-hidden />
              {industry}
            </Item>
          </motion.div>
        ))}
      </Grid>
    </Inner>
  </Section>
);

export default SpecialistIndustryCoverage;
