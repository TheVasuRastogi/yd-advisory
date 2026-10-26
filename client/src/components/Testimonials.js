import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import testimonials from '../data/testimonials';

const Section = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: #f3f5f5;
`;

const Inner = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.spacing[3]};
  }
`;

const Header = styled.div`
  margin-bottom: ${props => props.theme.spacing[12]};

  h2 {
    position: relative;
    display: inline-block;
    font-size: ${props => props.theme.fontSizes['4xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin: 0;
    font-weight: ${props => props.theme.fontWeights.semibold};
    letter-spacing: -0.02em;
    padding-bottom: 0.85rem;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 72px;
      height: 3px;
      border-radius: 999px;
      background: #146b63;
    }

    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes['3xl']};
    }
  }

  p {
    margin: 1.15rem 0 0;
    color: ${props => props.theme.colors.gray[600]};
    font-size: ${props => props.theme.fontSizes.lg};
    line-height: 1.6;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 4.5rem;
  row-gap: 3.25rem;
  align-items: stretch;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    row-gap: 2.75rem;
  }
`;

const Quote = styled.figure`
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-width: 0;
`;

const Mark = styled.span`
  display: block;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 2.75rem;
  line-height: 1;
  font-weight: 600;
  color: #146b63;
  margin: 0 0 0.85rem;
`;

const Text = styled.blockquote`
  margin: 0;
  padding: 0;
  border: 0;
  quotes: none;
  flex: 1 1 auto;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.02em;
  color: #1c2b2a;

  &::before,
  &::after {
    content: none;
  }

  p {
    margin: 0;
  }

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 1.2rem;
  }
`;

const Rule = styled.span`
  display: block;
  width: 48px;
  height: 3px;
  margin: 1.15rem 0 0.9rem;
  background: #146b63;
  border-radius: 999px;
  flex-shrink: 0;
`;

const Byline = styled.figcaption`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.65rem;
`;

const Name = styled.cite`
  font-style: normal;
  font-weight: 600;
  font-size: 0.98rem;
  color: #146b63;
`;

const Role = styled.span`
  font-size: 0.98rem;
  color: #8a9390;
  font-weight: 400;
`;

const CaseStudyRow = styled.div`
  margin-top: 3rem;
`;

const CaseStudyButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.4rem;
  background: #146b63;
  color: #ffffff;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  line-height: 1;
  transition: background 0.2s ease, transform 0.2s ease;

  svg {
    font-size: 1.05rem;
  }

  &:hover {
    background: #0f574f;
    color: #ffffff;
    transform: translateY(-1px);
  }
`;

const QuoteBlock = ({ quote, name, role }) => (
  <Quote>
    <Mark aria-hidden="true">“</Mark>
    <Text>
      <p>{quote}</p>
    </Text>
    <Rule aria-hidden="true" />
    <Byline>
      <Name>{name}</Name>
      <Role>{role}</Role>
    </Byline>
  </Quote>
);

const Testimonials = ({
  items = testimonials,
  title = 'What clients say',
  intro = 'From finance leaders, boards, and transaction teams.',
}) => {
  if (!items.length) return null;

  return (
    <Section aria-labelledby="client-testimonials-heading">
      <Inner>
        <Header>
          <h2 id="client-testimonials-heading">{title}</h2>
          {intro ? <p>{intro}</p> : null}
        </Header>

        <Grid>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: (index % 2) * 0.06 }}
              viewport={{ once: true }}
              style={{ height: '100%', display: 'flex' }}
            >
              <QuoteBlock quote={item.quote} name={item.name} role={item.role} />
            </motion.div>
          ))}
        </Grid>

        <CaseStudyRow>
          <CaseStudyButton to="/deal-desk/deal-spotlights#case-studies">
            Read case study <FiArrowRight />
          </CaseStudyButton>
        </CaseStudyRow>
      </Inner>
    </Section>
  );
};

export default Testimonials;
