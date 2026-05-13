import React, { useState, useEffect, useLayoutEffect } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiTrendingUp, FiCheck, FiX } from 'react-icons/fi';
import SEO from '../components/SEO';
import { innerPageHeroBackground } from '../styles/heroMixins';
import { newsletterService } from '../services/api';

const PageWrap = styled.div`
  padding-top: 120px;
`;

const HeroSection = styled.section`
  ${innerPageHeroBackground()}
  position: relative;
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[20]} 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};

  h1 {
    font-size: ${props => props.theme.fontSizes['5xl']};
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.white};
    font-family: ${props => props.theme.fonts.secondary};
    font-weight: ${props => props.theme.fontWeights.extrabold};
    letter-spacing: -0.015em;

    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes['4xl']};
    }
  }

  p {
    font-size: ${props => props.theme.fontSizes.xl};
    color: ${props => props.theme.colors.gray[200]};
    line-height: 1.6;
    margin: 0;
  }
`;

const ContentSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.gray[50]};
`;

const SectionCard = styled(motion.article)`
  max-width: 720px;
  margin: 0 auto ${props => props.theme.spacing[10]};
  padding: 0 ${props => props.theme.spacing[4]};
  scroll-margin-top: 140px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const CardInner = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius['2xl']};
  padding: ${props => props.theme.spacing[8]};
  box-shadow: ${props => props.theme.shadows.sm};

  h2 {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[3]};
    font-size: ${props => props.theme.fontSizes['2xl']};
    color: ${props => props.theme.colors.primary[800]};
    margin: 0 0 ${props => props.theme.spacing[4]};
    font-family: ${props => props.theme.fonts.secondary};
    font-weight: ${props => props.theme.fontWeights.bold};

    svg {
      color: ${props => props.theme.colors.primary[600]};
    }
  }

  p {
    color: ${props => props.theme.colors.gray[700]};
    line-height: 1.7;
    margin: 0 0 ${props => props.theme.spacing[4]};

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[3]};
  margin-top: ${props => props.theme.spacing[6]};

  input {
    flex: 1 1 220px;
    padding: ${props => props.theme.spacing[3]};
    border: 1px solid ${props => props.theme.colors.gray[300]};
    border-radius: ${props => props.theme.borderRadius.md};
    font-size: ${props => props.theme.fontSizes.base};

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary[500]};
    }
  }

  button {
    background: linear-gradient(
      135deg,
      ${props => props.theme.colors.primary[600]},
      ${props => props.theme.colors.primary[700]}
    );
    color: ${props => props.theme.colors.white};
    border: none;
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
    border-radius: ${props => props.theme.borderRadius.md};
    font-weight: ${props => props.theme.fontWeights.semibold};
    cursor: pointer;
    transition: all ${props => props.theme.transitions.fast};
    white-space: nowrap;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(20, 184, 166, 0.35);
    }
  }
`;

const MessageBanner = styled.div`
  margin-top: ${props => props.theme.spacing[4]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border-radius: ${props => props.theme.borderRadius.md};
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  font-size: ${props => props.theme.fontSizes.sm};
  ${(props) =>
    props.$type === 'success'
      ? `background: ${props.theme.colors.primary[50]}; color: ${props.theme.colors.primary[900]}; border: 1px solid ${props.theme.colors.primary[200]};`
      : `background: #fef2f2; color: #991b1b; border: 1px solid #fecaca;`}
`;

const CTARow = styled.div`
  margin-top: ${props => props.theme.spacing[6]};
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[3]};
`;

const ctaAppearance = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing[3]} ${(props) => props.theme.spacing[6]};
  border-radius: ${(props) => props.theme.borderRadius.md};
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary[600]},
    ${(props) => props.theme.colors.primary[700]}
  );
  color: ${(props) => props.theme.colors.white};
  text-decoration: none;
  font-weight: ${(props) => props.theme.fontWeights.semibold};
  transition: all ${(props) => props.theme.transitions.fast};

  &:hover {
    color: ${(props) => props.theme.colors.white};
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(20, 184, 166, 0.35);
  }
`;

const PrimaryLink = styled(Link)`
  ${ctaAppearance}
`;

const MailCta = styled.a`
  ${ctaAppearance}
`;

const DealDesk = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useLayoutEffect(() => {
    const hash = location.hash;
    if (!hash) return;
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }
    if (!validateEmail(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }
    setIsLoading(true);
    setMessage(null);
    try {
      const response = await newsletterService.subscribe(email);
      setMessage({ type: 'success', text: response.message });
      setEmail('');
    } catch (error) {
      let errorMessage = 'Failed to subscribe to newsletter';
      if (error.message?.includes('Network Error') || error.message?.includes('ECONNREFUSED')) {
        errorMessage = 'Unable to connect to server. Please try again later.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const biweeklyMailto =
    'mailto:Yashaswi.das@ydadvisory.ae?subject=' +
    encodeURIComponent('YD Deal Desk — Biweekly Report subscription') +
    '&body=' +
    encodeURIComponent('Hello YD Advisory,\n\nI would like to receive the YD Deal Desk biweekly report.\n\n');

  return (
    <PageWrap>
      <SEO
        title="YD Deal Desk"
        description="Subscribe to the YD Advisory newsletter and request our biweekly deal desk report—insights for founders, investors, and transaction teams."
        keywords="deal desk, newsletter, biweekly report, M&A, valuation, YD Advisory"
      />
      <HeroSection>
        <HeroContent>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <h1>YD Deal Desk</h1>
            <p>
              Curated updates for our community: subscribe to the newsletter for firm-wide insights, or request our
              biweekly deal desk report for transaction-focused commentary.
            </p>
          </motion.div>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <SectionCard
          id="newsletter"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
        >
          <CardInner>
            <h2>
              <FiMail aria-hidden />
              Newsletter
            </h2>
            <p>
              Get financial tips, market perspectives, and YD Advisory updates delivered to your inbox. Same list as our
              site-wide newsletter—manage preferences anytime.
            </p>
            <NewsletterForm onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Your work email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                disabled={isLoading}
                required
                aria-label="Email for newsletter"
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Subscribing…' : 'Subscribe'}
              </button>
            </NewsletterForm>
            {message && (
              <MessageBanner $type={message.type} role="status">
                <span>{message.text}</span>
                <button
                  type="button"
                  aria-label="Dismiss message"
                  onClick={() => setMessage(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 4,
                    cursor: 'pointer',
                    color: 'inherit',
                    display: 'flex',
                  }}
                >
                  {message.type === 'success' ? <FiCheck /> : <FiX />}
                </button>
              </MessageBanner>
            )}
          </CardInner>
        </SectionCard>

        <SectionCard
          id="biweekly-report"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <CardInner>
            <h2>
              <FiTrendingUp aria-hidden />
              Biweekly Report
            </h2>
            <p>
              Our biweekly deal desk report highlights themes we are seeing in valuations, M&A, and capital markets—built
              for founders, investors, and advisors who want a concise pulse on deal activity.
            </p>
            <p>
              To join the distribution list, email us with your name, company, and role. We will confirm your subscription
              and send the report on our regular cadence.
            </p>
            <CTARow>
              <MailCta href={biweeklyMailto}>Request the biweekly report</MailCta>
              <PrimaryLink to="/contact">Contact the deal desk</PrimaryLink>
            </CTARow>
          </CardInner>
        </SectionCard>
      </ContentSection>
    </PageWrap>
  );
};

export default DealDesk;
