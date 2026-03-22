import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

/**
 * Shared image hero for inner pages (not Home).
 * Uses a teal gradient overlay on top of `image` for readability.
 */
const Section = styled.section`
  position: relative;
  color: ${p => p.theme.colors.white};
  padding: ${p => p.theme.spacing[16]} 0;
  text-align: center;
  overflow: hidden;
  background: linear-gradient(
      135deg,
      ${p => p.theme.colors.primary[900]}cc 0%,
      ${p => p.theme.colors.primary[800]}b3 50%,
      #0a2a2ae6 100%
    ),
    url(${p => p.$image}) center center / cover no-repeat;

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    padding: ${p => p.theme.spacing[12]} 0;
  }
`;

const Inner = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing[4]};
  position: relative;
  z-index: 1;

  h1 {
    font-size: ${p => p.theme.fontSizes['4xl']};
    margin: 0 0 ${p => p.theme.spacing[3]};
    color: ${p => p.theme.colors.white};
    font-weight: ${p => p.theme.fontWeights.extrabold};
    font-family: ${p => p.theme.fonts.secondary};
    line-height: 1.15;
    letter-spacing: -0.02em;

    @media (max-width: ${p => p.theme.breakpoints.md}) {
      font-size: ${p => p.theme.fontSizes['3xl']};
    }
  }
`;

const Subtitle = styled.p`
  font-size: ${p => p.theme.fontSizes.lg};
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.55;
  margin: 0 auto;
  max-width: 40rem;
  font-weight: ${p => p.theme.fontWeights.medium};

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    font-size: ${p => p.theme.fontSizes.base};
  }
`;

const PageHero = ({
  title,
  subtitle,
  image = '/images/about-hero.jpg',
  className,
}) => (
  <Section $image={image} className={className} aria-label={title}>
    <Inner>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h1>
      {subtitle ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          <Subtitle>{subtitle}</Subtitle>
        </motion.div>
      ) : null}
    </Inner>
  </Section>
);

export default PageHero;
