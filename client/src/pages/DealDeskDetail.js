import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiDownload, FiArrowLeft, FiTrendingUp, FiTarget, FiFileText, FiClock, FiBell, FiX, FiMail, FiPhone, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import SEO from '../components/SEO';
import { innerPageHeroBackground } from '../styles/heroMixins';

/* ─── Data ─── */
const REPORT_PDF = '/documents/Geopolitical Finance_YD Deal Desk.pdf';

const reportData = {
  'geopolitical-finance': {
    icon: FiTrendingUp,
    title: 'Market Intelligence Report',
    tagline: 'Geopolitical Finance by YDDealDesk 2026',
    heroImage: '/images/about-hero.jpg',
    pdf: REPORT_PDF,
    intro:
      'YD Deal Desk — Market Intelligence is our flagship monthly report that synthesises geopolitical developments with transaction and capital-market intelligence, equipping decision-makers with the context they need to act with conviction.',
    sections: [
      {
        heading: 'What\u2019s Inside',
        bullets: [
          'Geopolitical risk analysis and its impact on cross-border deal flow',
          'Global macro and capital-market pulse — equities, credit, FX, and commodities',
          'Sector-specific M&A and IPO activity tracker',
          'Central-bank policy outlook and interest-rate trajectory',
          'Monthly deal league tables and valuation benchmarks',
          'Featured transaction case study with structure and pricing commentary',
        ],
      },
      {
        heading: 'Who It\u2019s For',
        text: 'CFOs, fund managers, corporate-development leads, investment-banking professionals, and board members who need a rapid yet rigorous geopolitical and financial read before making strategic decisions.',
      },
      {
        heading: 'Frequency & Format',
        text: 'Published monthly as a downloadable PDF. Subscribe via the Deal Desk page to receive each edition directly in your inbox.',
      },
    ],
  },
  'market-insights': {
    icon: FiTrendingUp,
    title: 'Market Insights',
    tagline: 'Macro trends & capital-market commentary',
    heroImage: '/images/about-hero.jpg',
    pdf: REPORT_PDF,
    intro:
      'Our Market Insights report distils global macro trends, sector performance, and capital-market movements into a concise monthly brief designed for busy decision-makers.',
    sections: [
      {
        heading: 'What\u2019s Inside',
        bullets: [
          'Global & regional GDP forecasts and their impact on deal flow',
          'Equity, credit, and commodity market pulse',
          'Sector-specific valuation multiples and trend analysis',
          'Central-bank policy outlook and interest-rate trajectory',
          'Geopolitical risk assessment for cross-border transactions',
        ],
      },
      {
        heading: 'Who It\u2019s For',
        text: 'CFOs, fund managers, corporate-development leads, and board members who need a rapid yet rigorous market read before making allocation or timing decisions.',
      },
      {
        heading: 'Frequency & Format',
        text: 'Published monthly as a downloadable PDF. Past editions are available on request for clients with an active advisory engagement.',
      },
    ],
  },
  'deal-spotlights': {
    icon: FiTarget,
    title: 'Deal Spotlights',
    tagline: 'Notable transactions decoded',
    heroImage: '/images/about-hero.jpg',
    pdf: REPORT_PDF,
    comingSoon: true,
    intro:
      'Deal Spotlights breaks down the most consequential transactions of the period \u2014 from mid-market M&A to marquee IPOs \u2014 unpacking the valuation rationale, deal structure, and strategic drivers.',
    sections: [
      {
        heading: 'What\u2019s Inside',
        bullets: [
          'Case-study teardowns of 3\u20135 headline deals per issue',
          'Implied valuation multiples and premium analysis',
          'Deal-structure commentary \u2014 earnouts, rollovers, seller notes',
          'Cross-border and regulatory considerations',
          'Lessons for founders and acquirers positioning for similar exits',
        ],
      },
      {
        heading: 'Who It\u2019s For',
        text: 'Founders evaluating exit timing, PE sponsors benchmarking entry multiples, and corporate-development teams tracking competitive deal activity.',
      },
      {
        heading: 'Frequency & Format',
        text: 'Published monthly as a downloadable PDF alongside a short executive summary email.',
      },
    ],
  },
  'advisory-briefs': {
    icon: FiFileText,
    title: 'Advisory Briefs',
    tagline: 'Regulation, methodology & best practices',
    heroImage: '/images/about-hero.jpg',
    pdf: REPORT_PDF,
    comingSoon: true,
    intro:
      'Advisory Briefs deliver concise primers on evolving regulations, valuation methodologies, and governance best practices that affect how deals get done.',
    sections: [
      {
        heading: 'What\u2019s Inside',
        bullets: [
          'Regulatory updates \u2014 IFRS, US GAAP, and cross-border tax changes',
          'Valuation methodology deep-dives (DCF, comparable transactions, option pricing)',
          'Corporate-governance and ESG reporting guidance',
          'Template checklists for due-diligence and board presentations',
          'Expert Q&A from the YD Advisory team',
        ],
      },
      {
        heading: 'Who It\u2019s For',
        text: 'In-house counsel, valuation analysts, compliance officers, and advisory professionals seeking a reliable reference point.',
      },
      {
        heading: 'Frequency & Format',
        text: 'Published monthly as a downloadable PDF. Selected briefs are also available as on-demand webinar recordings.',
      },
    ],
  },
};

/* ─── Styled Components ─── */
const PageWrap = styled.div`
  padding-top: 120px;
`;

const HeroSection = styled.section`
  ${innerPageHeroBackground()}
  position: relative;
  color: ${(p) => p.theme.colors.white};
  padding: ${(p) => p.theme.spacing[20]} 0 ${(p) => p.theme.spacing[16]};
`;

const HeroInner = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${(p) => p.theme.spacing[4]};
  display: flex;
  flex-direction: column;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing[2]};
  color: ${(p) => p.theme.colors.primary[200]};
  text-decoration: none;
  font-size: ${(p) => p.theme.fontSizes.sm};
  font-weight: ${(p) => p.theme.fontWeights.medium};
  margin-bottom: ${(p) => p.theme.spacing[6]};
  width: fit-content;
  transition: color ${(p) => p.theme.transitions.fast};

  &:hover {
    color: ${(p) => p.theme.colors.white};
  }
`;

const HeroTag = styled.span`
  display: block;
  font-size: ${(p) => p.theme.fontSizes.xs};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${(p) => p.theme.colors.primary[300]};
  margin-bottom: ${(p) => p.theme.spacing[3]};
`;

const HeroTitle = styled.h1`
  font-family: ${(p) => p.theme.fonts.secondary};
  font-size: ${(p) => p.theme.fontSizes['5xl']};
  font-weight: ${(p) => p.theme.fontWeights.extrabold};
  color: ${(p) => p.theme.colors.white};
  margin: 0 0 ${(p) => p.theme.spacing[4]};
  letter-spacing: -0.015em;

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    font-size: ${(p) => p.theme.fontSizes['4xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${(p) => p.theme.fontSizes.xl};
  color: ${(p) => p.theme.colors.gray[200]};
  line-height: 1.6;
  margin: 0;
  max-width: 640px;
`;

/* Content */
const ContentSection = styled.section`
  padding: ${(p) => p.theme.spacing[16]} 0;
  background: ${(p) => p.theme.colors.white};

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    padding: ${(p) => p.theme.spacing[10]} 0;
  }
`;

const ContentInner = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${(p) => p.theme.spacing[4]};
`;

const Intro = styled.p`
  font-size: ${(p) => p.theme.fontSizes.lg};
  color: ${(p) => p.theme.colors.gray[700]};
  line-height: 1.8;
  margin: 0 0 ${(p) => p.theme.spacing[10]};
`;

const SectionBlock = styled.div`
  margin-bottom: ${(p) => p.theme.spacing[10]};

  &:last-child {
    margin-bottom: 0;
  }

  h2 {
    font-family: ${(p) => p.theme.fonts.secondary};
    font-size: ${(p) => p.theme.fontSizes['2xl']};
    font-weight: ${(p) => p.theme.fontWeights.bold};
    color: ${(p) => p.theme.colors.primary[800]};
    margin: 0 0 ${(p) => p.theme.spacing[4]};
  }

  p {
    font-size: ${(p) => p.theme.fontSizes.base};
    color: ${(p) => p.theme.colors.gray[600]};
    line-height: 1.7;
    margin: 0;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    position: relative;
    padding-left: ${(p) => p.theme.spacing[6]};
    margin-bottom: ${(p) => p.theme.spacing[3]};
    font-size: ${(p) => p.theme.fontSizes.base};
    color: ${(p) => p.theme.colors.gray[700]};
    line-height: 1.6;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 10px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${(p) => p.theme.colors.primary[500]};
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

/* Download CTA */
const DownloadSection = styled.section`
  padding: ${(p) => p.theme.spacing[12]} 0 ${(p) => p.theme.spacing[16]};
  background: ${(p) => p.theme.colors.gray[50]};
`;

const DownloadCard = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: ${(p) => p.theme.spacing[8]} ${(p) => p.theme.spacing[10]};
  background: ${(p) => p.theme.colors.white};
  border: 1px solid ${(p) => p.theme.colors.gray[200]};
  border-radius: ${(p) => p.theme.borderRadius['2xl']};
  box-shadow: ${(p) => p.theme.shadows.md};
  text-align: center;

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    padding: ${(p) => p.theme.spacing[6]} ${(p) => p.theme.spacing[4]};
    margin: 0 ${(p) => p.theme.spacing[4]};
  }

  h2 {
    font-family: ${(p) => p.theme.fonts.secondary};
    font-size: ${(p) => p.theme.fontSizes['2xl']};
    font-weight: ${(p) => p.theme.fontWeights.bold};
    color: ${(p) => p.theme.colors.primary[800]};
    margin: 0 0 ${(p) => p.theme.spacing[3]};
  }

  p {
    font-size: ${(p) => p.theme.fontSizes.base};
    color: ${(p) => p.theme.colors.gray[600]};
    line-height: 1.6;
    margin: 0 0 ${(p) => p.theme.spacing[6]};
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const DownloadButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing[2]};
  padding: ${(p) => p.theme.spacing[3]} ${(p) => p.theme.spacing[8]};
  border-radius: ${(p) => p.theme.borderRadius.lg};
  border: none;
  background: linear-gradient(
    135deg,
    ${(p) => p.theme.colors.primary[600]},
    ${(p) => p.theme.colors.primary[700]}
  );
  color: ${(p) => p.theme.colors.white};
  font-weight: ${(p) => p.theme.fontWeights.semibold};
  font-size: ${(p) => p.theme.fontSizes.base};
  transition: all ${(p) => p.theme.transitions.fast};
  cursor: pointer;

  &:hover {
    color: ${(p) => p.theme.colors.white};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(20, 184, 166, 0.35);
  }

  svg {
    font-size: 20px;
  }
`;

const ContactRow = styled.div`
  margin-top: ${(p) => p.theme.spacing[4]};
  font-size: ${(p) => p.theme.fontSizes.sm};
  color: ${(p) => p.theme.colors.gray[500]};

  a {
    color: ${(p) => p.theme.colors.primary[600]};
    font-weight: ${(p) => p.theme.fontWeights.semibold};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

/* ─── Coming Soon ─── */
const ComingSoonBadge = styled.span`
  display: flex;
  width: fit-content;
  align-items: center;
  gap: ${(p) => p.theme.spacing[2]};
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(6px);
  color: ${(p) => p.theme.colors.primary[200]};
  font-size: ${(p) => p.theme.fontSizes.sm};
  font-weight: ${(p) => p.theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: ${(p) => p.theme.spacing[2]} ${(p) => p.theme.spacing[4]};
  border-radius: ${(p) => p.theme.borderRadius.full};
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: ${(p) => p.theme.spacing[4]};
`;

const ComingSoonSection = styled.section`
  padding: ${(p) => p.theme.spacing[16]} 0;
  background: ${(p) => p.theme.colors.gray[50]};

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    padding: ${(p) => p.theme.spacing[10]} 0;
  }
`;

const ComingSoonCard = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: ${(p) => p.theme.spacing[10]};
  background: ${(p) => p.theme.colors.white};
  border: 1px solid ${(p) => p.theme.colors.gray[200]};
  border-radius: ${(p) => p.theme.borderRadius['2xl']};
  box-shadow: ${(p) => p.theme.shadows.md};
  text-align: center;

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    padding: ${(p) => p.theme.spacing[6]} ${(p) => p.theme.spacing[4]};
    margin: 0 ${(p) => p.theme.spacing[4]};
  }
`;

const ComingSoonIcon = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: ${(p) => p.theme.colors.primary[50]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${(p) => p.theme.spacing[5]};

  svg {
    font-size: 32px;
    color: ${(p) => p.theme.colors.primary[600]};
  }
`;

const ComingSoonTitle = styled.h2`
  font-family: ${(p) => p.theme.fonts.secondary};
  font-size: ${(p) => p.theme.fontSizes['3xl']};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  color: ${(p) => p.theme.colors.primary[800]};
  margin: 0 0 ${(p) => p.theme.spacing[3]};
`;

const ComingSoonText = styled.p`
  font-size: ${(p) => p.theme.fontSizes.lg};
  color: ${(p) => p.theme.colors.gray[600]};
  line-height: 1.7;
  margin: 0 0 ${(p) => p.theme.spacing[4]};
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;

  &:last-of-type {
    margin-bottom: ${(p) => p.theme.spacing[6]};
  }
`;

const NotifyButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing[2]};
  padding: ${(p) => p.theme.spacing[3]} ${(p) => p.theme.spacing[8]};
  border-radius: ${(p) => p.theme.borderRadius.lg};
  background: linear-gradient(
    135deg,
    ${(p) => p.theme.colors.primary[600]},
    ${(p) => p.theme.colors.primary[700]}
  );
  color: ${(p) => p.theme.colors.white};
  text-decoration: none;
  font-weight: ${(p) => p.theme.fontWeights.semibold};
  font-size: ${(p) => p.theme.fontSizes.base};
  transition: all ${(p) => p.theme.transitions.fast};

  &:hover {
    color: ${(p) => p.theme.colors.white};
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(20, 184, 166, 0.35);
  }

  svg {
    font-size: 18px;
  }
`;

/* ─── Download Modal (matches BrochureDownloadModal pattern) ─── */
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: ${(p) => p.theme.spacing[4]};
`;

const ModalContent = styled(motion.div)`
  background: ${(p) => p.theme.colors.white};
  border-radius: ${(p) => p.theme.borderRadius.xl};
  padding: ${(p) => p.theme.spacing[8]};
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: ${(p) => p.theme.shadows['2xl']};

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    padding: ${(p) => p.theme.spacing[6]};
    margin: ${(p) => p.theme.spacing[2]};
  }
`;

const ModalCloseBtn = styled.button`
  position: absolute;
  top: ${(p) => p.theme.spacing[4]};
  right: ${(p) => p.theme.spacing[4]};
  background: none;
  border: none;
  font-size: ${(p) => p.theme.fontSizes.xl};
  color: ${(p) => p.theme.colors.gray[500]};
  cursor: pointer;
  padding: ${(p) => p.theme.spacing[2]};
  border-radius: ${(p) => p.theme.borderRadius.md};
  transition: all ${(p) => p.theme.transitions.fast};

  &:hover {
    background: ${(p) => p.theme.colors.gray[100]};
    color: ${(p) => p.theme.colors.gray[700]};
  }
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: ${(p) => p.theme.spacing[6]};

  h2 {
    font-size: ${(p) => p.theme.fontSizes['2xl']};
    color: ${(p) => p.theme.colors.primary[800]};
    margin-bottom: ${(p) => p.theme.spacing[2]};
    font-weight: 700;
  }

  p {
    color: ${(p) => p.theme.colors.gray[600]};
    font-size: ${(p) => p.theme.fontSizes.base};
    line-height: 1.6;
  }
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing[4]};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.theme.spacing[2]};
`;

const FormLabel = styled.label`
  font-weight: ${(p) => p.theme.fontWeights.semibold};
  color: ${(p) => p.theme.colors.primary[700]};
  font-size: ${(p) => p.theme.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing[2]};
`;

const FormInput = styled.input`
  padding: ${(p) => p.theme.spacing[3]} ${(p) => p.theme.spacing[4]};
  border: 2px solid ${(p) => (p.$hasError ? '#ef4444' : p.theme.colors.gray[300])};
  border-radius: ${(p) => p.theme.borderRadius.md};
  font-size: ${(p) => p.theme.fontSizes.base};
  transition: all ${(p) => p.theme.transitions.fast};
  background: ${(p) => p.theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${(p) => p.theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${(p) => p.theme.colors.primary[100]};
  }

  &::placeholder {
    color: ${(p) => p.theme.colors.gray[400]};
  }
`;

const FieldError = styled.div`
  color: #ef4444;
  font-size: ${(p) => p.theme.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing[1]};
`;

const ModalSubmitBtn = styled.button`
  background: linear-gradient(135deg, ${(p) => p.theme.colors.primary[600]}, ${(p) => p.theme.colors.primary[700]});
  color: ${(p) => p.theme.colors.white};
  border: none;
  padding: ${(p) => p.theme.spacing[4]} ${(p) => p.theme.spacing[6]};
  border-radius: ${(p) => p.theme.borderRadius.lg};
  font-weight: ${(p) => p.theme.fontWeights.semibold};
  font-size: ${(p) => p.theme.fontSizes.lg};
  cursor: pointer;
  transition: all ${(p) => p.theme.transitions.base};
  box-shadow: 0 4px 15px rgba(20, 184, 166, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.spacing[2]};
  min-height: 56px;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4);
    background: linear-gradient(135deg, ${(p) => p.theme.colors.primary[700]}, ${(p) => p.theme.colors.primary[800]});
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ModalDownloadBtn = styled.a`
  background: linear-gradient(135deg, ${(p) => p.theme.colors.primary[600]}, ${(p) => p.theme.colors.primary[700]});
  color: ${(p) => p.theme.colors.white};
  text-decoration: none;
  padding: ${(p) => p.theme.spacing[4]} ${(p) => p.theme.spacing[6]};
  border-radius: ${(p) => p.theme.borderRadius.lg};
  font-weight: ${(p) => p.theme.fontWeights.semibold};
  font-size: ${(p) => p.theme.fontSizes.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.spacing[2]};
  transition: all ${(p) => p.theme.transitions.base};
  box-shadow: 0 4px 15px rgba(20, 184, 166, 0.3);
  min-height: 56px;
  cursor: pointer;
  border: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4);
    background: linear-gradient(135deg, ${(p) => p.theme.colors.primary[700]}, ${(p) => p.theme.colors.primary[800]});
    color: ${(p) => p.theme.colors.white};
  }
`;

const SuccessMessage = styled(motion.div)`
  background: ${(p) => p.theme.colors.success}20;
  border: 1px solid ${(p) => p.theme.colors.success};
  color: ${(p) => p.theme.colors.success};
  padding: ${(p) => p.theme.spacing[4]};
  border-radius: ${(p) => p.theme.borderRadius.md};
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing[2]};
  margin-bottom: ${(p) => p.theme.spacing[4]};
  font-weight: 600;
`;

/* ─── Component ─── */
const DealDeskDetail = () => {
  const { slug } = useParams();
  const data = reportData[slug];

  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showDownload, setShowDownload] = useState(false);

  const { register, handleSubmit: rhfSubmit, formState: { errors }, reset } = useForm();

  const handleDownloadClick = (e) => {
    e.preventDefault();
    setShowModal(true);
    setShowDownload(false);
    setSubmitStatus(null);
    reset();
  };

  const onFormSubmit = async (formValues) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const body = new FormData();
      body.append('access_key', '4d97b7da-7130-49e4-897a-50bd925206fe');
      body.append('email', formValues.email);
      body.append('phone', formValues.phone || '');
      body.append('formType', 'Deal Desk Report Download');
      body.append('subject', `Report Download Request — ${data?.title || 'Deal Desk'}`);
      body.append(
        'message',
        `User requested "${data?.title}" report download.\nEmail: ${formValues.email}\nPhone: ${formValues.phone || 'Not provided'}`
      );

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body,
      });
      const result = await res.json();

      if (result.success) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you! Your information has been submitted successfully.');
        setShowDownload(true);
        reset();
      } else {
        setSubmitStatus('error');
        setSubmitMessage('Failed to submit information. Please try again.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setSubmitMessage(err.message || 'Failed to submit information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinalDownload = () => {
    if (!data) return;
    const link = document.createElement('a');
    link.href = data.pdf;
    link.download = data.pdf.split('/').pop() || 'report.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      setShowModal(false);
      setShowDownload(false);
      setSubmitStatus(null);
    }, 1000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowDownload(false);
    setSubmitStatus(null);
    reset();
  };

  if (!data) return <Navigate to="/deal-desk" replace />;

  return (
    <PageWrap>
      <SEO
        title={`${data.title} — YD Deal Desk`}
        description={data.intro}
        keywords={`${data.title}, deal desk, YD Advisory, report, finance intelligence`}
      />

      {/* Hero */}
      <HeroSection>
        <HeroInner>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <BackLink to="/deal-desk">
              <FiArrowLeft /> Back to Deal Desk
            </BackLink>
            {data.comingSoon && (
              <ComingSoonBadge>
                <FiClock /> Coming Soon
              </ComingSoonBadge>
            )}
            <HeroTag>YDDealDesk</HeroTag>
            <HeroTitle>{data.title}</HeroTitle>
            <HeroSubtitle>{data.tagline}</HeroSubtitle>
          </motion.div>
        </HeroInner>
      </HeroSection>

      {data.comingSoon ? (
        <>
          {/* Coming Soon content */}
          <ContentSection>
            <ContentInner>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4 }}
              >
                <Intro>{data.intro}</Intro>

                {data.sections.map((sec, i) => (
                  <SectionBlock key={i}>
                    <h2>{sec.heading}</h2>
                    {sec.bullets ? (
                      <ul>
                        {sec.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{sec.text}</p>
                    )}
                  </SectionBlock>
                ))}
              </motion.div>
            </ContentInner>
          </ContentSection>

          <ComingSoonSection>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4 }}
            >
              <ComingSoonCard>
                <ComingSoonIcon>
                  <FiClock />
                </ComingSoonIcon>
                <ComingSoonTitle>Coming Soon</ComingSoonTitle>
                <ComingSoonText>
                  We are preparing the first edition of <strong>{data.title}</strong>.
                  Our team is gathering the latest data and expert analysis to
                  deliver a report that meets the YD Advisory standard.
                </ComingSoonText>
                <ComingSoonText>
                  Want to be the first to receive it? Sign up and we will notify
                  you as soon as it is published.
                </ComingSoonText>
                <NotifyButton to="/deal-desk#newsletter">
                  <FiBell /> Notify Me
                </NotifyButton>
              </ComingSoonCard>
            </motion.div>
          </ComingSoonSection>
        </>
      ) : (
        <>
          {/* Full content */}
          <ContentSection>
            <ContentInner>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4 }}
              >
                <Intro>{data.intro}</Intro>

                {data.sections.map((sec, i) => (
                  <SectionBlock key={i}>
                    <h2>{sec.heading}</h2>
                    {sec.bullets ? (
                      <ul>
                        {sec.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{sec.text}</p>
                    )}
                  </SectionBlock>
                ))}
              </motion.div>
            </ContentInner>
          </ContentSection>

          {/* Download CTA */}
          <DownloadSection>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4 }}
            >
              <DownloadCard>
                <h2>Download the Geopolitical Finance Report</h2>
                <p>
                  Get the latest edition of our Geopolitical Finance report by YD Deal Desk as a PDF — free to download.
                </p>
                <DownloadButton type="button" onClick={handleDownloadClick}>
                  <FiDownload /> Download Report
                </DownloadButton>
                <ContactRow>
                  Questions? <Link to="/contact">Contact the deal desk</Link>
                </ContactRow>
              </DownloadCard>
            </motion.div>
          </DownloadSection>
        </>
      )}

      {/* Download Form Modal */}
      <AnimatePresence>
        {showModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <ModalContent
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalCloseBtn onClick={handleCloseModal}>
                <FiX />
              </ModalCloseBtn>

              <ModalHeader>
                <h2>Download Geopolitical Finance Report</h2>
                <p>
                  Get the Geopolitical Finance report with detailed market
                  intelligence and analysis by YD Deal Desk.
                </p>
              </ModalHeader>

              {submitStatus === 'success' && (
                <SuccessMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiCheckCircle />
                  {submitMessage}
                </SuccessMessage>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: '#ef444420',
                    border: '1px solid #ef4444',
                    color: '#ef4444',
                    padding: '16px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px',
                  }}
                >
                  <FiAlertCircle />
                  {submitMessage}
                </motion.div>
              )}

              {!showDownload ? (
                <ModalForm onSubmit={rhfSubmit(onFormSubmit)}>
                  <FormGroup>
                    <FormLabel htmlFor="dd-email">
                      <FiMail /> Email Address *
                    </FormLabel>
                    <FormInput
                      id="dd-email"
                      type="email"
                      placeholder="Enter your email address"
                      $hasError={!!errors.email}
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                    />
                    {errors.email && (
                      <FieldError>
                        <FiAlertCircle /> {errors.email.message}
                      </FieldError>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <FormLabel htmlFor="dd-phone">
                      <FiPhone /> Phone Number *
                    </FormLabel>
                    <FormInput
                      id="dd-phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      $hasError={!!errors.phone}
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[+]?[1-9][\d]{0,15}$/,
                          message: 'Invalid phone number',
                        },
                      })}
                    />
                    {errors.phone && (
                      <FieldError>
                        <FiAlertCircle /> {errors.phone.message}
                      </FieldError>
                    )}
                  </FormGroup>

                  <ModalSubmitBtn type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Information'}
                  </ModalSubmitBtn>
                </ModalForm>
              ) : (
                <ModalDownloadBtn as="button" onClick={handleFinalDownload}>
                  <FiDownload /> Download Report Now
                </ModalDownloadBtn>
              )}
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </PageWrap>
  );
};

export default DealDeskDetail;
