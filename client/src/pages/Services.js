import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiArrowRight, 
  FiTrendingUp, 
  FiTarget, 
  FiDollarSign, 
  FiBriefcase,
  FiUsers,
  FiBarChart,
  FiGlobe,
  FiSearch
} from 'react-icons/fi';
import SEO from '../components/SEO';
import { serviceSchema } from '../utils/structuredData';
import ValuationRequestForm from '../components/ValuationRequestForm';
import SpecialistIndustryCoverage from '../components/SpecialistIndustryCoverage';
import BusinessModel from '../components/BusinessModel';
import { innerPageHeroBackground } from '../styles/heroMixins';

const ServicesContainer = styled.div`
  padding-top: 120px;
  font-family: ${props => props.theme.fonts.primary};
`;

const HeroSection = styled.section`
  ${innerPageHeroBackground()}
  position: relative;
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[16]} 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  position: relative;
  z-index: 1;

  h1 {
    font-size: ${props => props.theme.fontSizes['5xl']};
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.white};

    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes['4xl']};
    }
  }
`;

const HeroLine = styled.span`
  display: block;
  &:not(:last-child) {
    margin-bottom: 0.35em;
  }
`;

const HeroParagraph = styled(motion.p)`
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.gray[200]};
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto ${props => props.theme.spacing[8]};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.lg};
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.base};
    line-height: 1.65;
  }
`;

const CategorySection = styled.section`
  padding: ${props => props.theme.spacing[20]} 0;
  background: ${props => props.isEven ? props.theme.colors.gray[50] : props.theme.colors.white};
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing[16]} 0;
  }
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const CategoryHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[20]};
  
  h2 {
    font-family: ${props => props.theme.fonts.display};
    font-size: clamp(2.5rem, 4vw, 3.5rem);
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[6]};
    font-weight: 800;
    line-height: 1.2;
    letter-spacing: -0.02em;
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: clamp(2rem, 6vw, 2.5rem);
    }
  }
  
  p {
    font-family: ${props => props.theme.fonts.primary};
    font-size: clamp(1.125rem, 2vw, 1.25rem);
    color: ${props => props.theme.colors.gray[600]};
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.7;
    letter-spacing: 0.01em;
    line-height: 1.6;
    
    @media (max-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.fontSizes.lg};
    }
  }
`;


const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 360px);
  justify-content: center;
  gap: ${props => props.theme.spacing[10]};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 360px);
    justify-content: center;
    gap: ${props => props.theme.spacing[8]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    justify-content: stretch;
    gap: ${props => props.theme.spacing[6]};
  }
`;

const ServiceCard = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[100]};
  border-radius: 24px;
  padding: 0;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  animation: float 6s ease-in-out infinite;
  
  &:nth-child(2n) {
    animation-delay: -2s;
  }
  
  &:nth-child(3n) {
    animation-delay: -4s;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
    border-color: ${props => props.theme.colors.primary[200]};
    animation: none;
  }
`;

const ServiceImage = styled.div`
  width: 100%;
  aspect-ratio: 16/6;
  min-height: 220px;
  max-height: 280px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 4px 24px rgba(20, 184, 166, 0.08);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(20, 184, 166, 0.32), rgba(15, 118, 110, 0.22));
    z-index: 1;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    aspect-ratio: unset;
    min-height: unset;
    max-height: unset;
    height: 140px;
    width: 100%;
  }
`;

const ServiceContent = styled.div`
  padding: ${props => props.theme.spacing[8]};
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    font-family: ${props => props.theme.fonts.display};
    font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[4]};
  line-height: 1.3;
    font-weight: 700;
    letter-spacing: -0.01em;
  }

  p {
    font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.7;
  margin-bottom: ${props => props.theme.spacing[6]};
    font-size: ${props => props.theme.fontSizes.base};
  flex: 1;
    letter-spacing: 0.01em;
  }
`;

const ToolsSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.gray[50]};
`;

const ToolsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.spacing[8]};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ToolCard = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[6]};
  text-align: center;
  box-shadow: ${props => props.theme.shadows.sm};
  
  h3 {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
    font-weight: ${props => props.theme.fontWeights.semibold};
  }
  
  ul {
  list-style: none;
  padding: 0;
    margin: 0;
    text-align: left;
    
    li {
      color: ${props => props.theme.colors.gray[600]};
      font-size: ${props => props.theme.fontSizes.sm};
      line-height: 1.6;
      margin-bottom: ${props => props.theme.spacing[2]};
      padding-left: ${props => props.theme.spacing[4]};
  position: relative;
  
  &::before {
        content: '•';
    color: ${props => props.theme.colors.primary[500]};
        font-weight: bold;
    position: absolute;
    left: 0;
      }
    }
  }
`;

const ServiceLink = styled(Link)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
  border-radius: 12px;
  font-size: ${props => props.theme.fontSizes.sm};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(20, 184, 166, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4);
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const CtaSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[16]} 0;
  text-align: center;
`;

const CtaContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
  
  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
    margin-bottom: ${props => props.theme.spacing[6]};
    color: ${props => props.theme.colors.white};
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.xl};
    margin-bottom: ${props => props.theme.spacing[8]};
    color: ${props => props.theme.colors.gray[200]};
  }
`;

const CtaButton = styled(Link)`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.primary[700]};
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.semibold};
  font-size: ${props => props.theme.fontSizes.lg};
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  transition: all ${props => props.theme.transitions.base};
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
    background: ${props => props.theme.colors.gray[100]};
  }
`;

const ServiceFormSection = styled.section`
  padding: ${props => props.theme.spacing[16]} 0;
  background: ${props => props.theme.colors.white};
`;

const FormContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const ServiceFormHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[12]};
  
  h2 {
    font-size: ${props => props.theme.fontSizes['4xl']};
  color: ${props => props.theme.colors.primary[800]};
    margin-bottom: ${props => props.theme.spacing[4]};
  font-weight: 700;
  }
  p {
    font-size: ${props => props.theme.fontSizes.lg};
    color: ${props => props.theme.colors.gray[600]};
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;


const Services = () => {
  // Comprehensive Services Data
  const services = [
    {
      id: 1,
      title: '409A Valuation',
      description: 'Independent, audit-ready valuations for fundraises, ESOPs, and compliance.',
      icon: FiDollarSign,
      slug: 'business-valuations-409a',
      image: 'https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvcnBvcmF0ZXxlbnwwfHwwfHx8MA%3D%3D',
      deliverables: [
        'DCF, market and precedent analysis',
        '409A compliance documentation',
        'Board-ready valuation report'
      ],
      useCases: 'Fundraising · ESOPs · M&A · Financial reporting',
    },
    {
      id: 2,
      title: 'Financial Modelling & Forecasting',
      description: 'Investor-grade models and scenario analysis for capital raises, budgeting, and M&A.',
      icon: FiBarChart,
      slug: 'financial-modelling-forecasting',
      image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      deliverables: [
        'Linked model with clear inputs/outputs',
        'Scenario & sensitivity packs',
        'Board/IC memo with takeaways'
      ],
      useCases: 'Fundraising · Budgeting · M&A',
    },
    {
      id: 3,
      title: 'Fractional CFO & Board Support',
      description: 'On-demand senior finance leadership - KPI dashboards, capital strategy, and board packs.',
      icon: FiUsers,
      slug: 'fractional-cfo-board-support',
      image: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      deliverables: [
        'KPI & cash dashboards',
        'Investor update pack',
        '"Hotline" support'
      ],
      useCases: 'Growth-stage companies · Board reporting · Capital strategy',
    },
    {
      id: 4,
      title: 'M&A Advisory (Buy- & Sell-Side)',
      description: 'End-to-end support target screening, red-flag diligence, working-capital reviews, SPA/PPA modelling. We help you articulate value drivers and negotiate with confidence.',
      icon: FiBriefcase,
      slug: 'ma-advisory',
      image: 'https://media.istockphoto.com/id/1457878227/photo/business-people-having-a-meeting-in-a-tech-company.jpg?s=612x612&w=0&k=20&c=G15Z82qB7v1BVzqZ9eu_wrnDQPrxUEatXyb_TGKdu_s=',
      deliverables: [
        'Diligence issue list & mitigation plan',
        'WC and net-debt bridges; SPA schedules & PPA models',
        'Integration workplan and day-1/100 priorities'
      ],
      useCases: 'Acquisitions, carve-outs, divestitures · Sell-side readiness'
    },
    {
      id: 5,
      title: 'Transaction Advisory & Due Diligence',
      description: 'Tight, focused QoE-style reviews and data-room prep to keep timelines on track and surprises low.',
      icon: FiSearch,
      slug: 'transaction-advisory-due-diligence',
      image: 'https://media.istockphoto.com/id/1434742171/photo/laptop-ppt-presentation-business-meeting-and-team-working-on-review-for-new-digital-website.jpg?s=612x612&w=0&k=20&c=MA7DEVo4nFIJPXgERQQx-W5srlaMThr_aFtDRaHeB00=',
      deliverables: [
        'Financial sweeps (revenue quality, margins, WC)',
        'Red flags, adjustments, and SPA implications',
        'Vendor/confirmatory DD support'
      ],
      useCases: 'Pre-acquisition analysis · Vendor due diligence · Quality of Earnings reviews'
    },
    {
      id: 6,
      title: 'Corporate Finance & Cross-Border Structuring',
      description: 'Entity maps and holding structures aligned with governance and tax considerations for expansions and cross-border deals.',
      icon: FiGlobe,
      slug: 'corporate-finance-cross-border',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      deliverables: [
        'Structure options, pros/cons, and cost/benefit',
        'Flow-of-funds & substance checklist',
        'Implementation roadmap'
      ],
      useCases: 'International expansion · Tax optimization · Holding company structures'
    },
    {
      id: 6.5,
      title: 'Private Equity & Fund Administration',
      description: 'End-to-end support for PE/VC and family offices: deal screening, diligence and value-creation planning, investor reporting and compliance across globally.',
      icon: FiBriefcase,
      slug: 'private-equity-fund-administration',
      image: '/images/services/img-6.jpg',
      deliverables: [
        'Deal screening and due diligence support',
        'Value-creation planning and portfolio monitoring',
        'NAV calculation and investor reporting',
        'Capital calls and distributions processing',
        'Compliance and audit support'
      ],
      useCases: 'PE/VC funds · Family offices · Fund administrators'
    },
    {
      id: 7,
      title: 'Feasibility & Option Papers',
      description: 'Market-driven go/no-go analysis with ROI scenarios and risk flags - so decisions are quick, transparent, and defensible.',
      icon: FiTarget,
      slug: 'feasibility-option-papers',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      deliverables: [
        'TAM/SAM/SOM & competitor scan',
        'Economics, scenarios, and sensitivities',
        'Decision memo for board/IC'
      ],
      useCases: 'New market entry · Product launches · Strategic pivots · Investment decisions'
    },
    {
      id: 8,
      title: 'Specialized Valuation',
      description: 'Targeted workstreams including IP/intangibles, Purchase Price Allocation (PPA), and digital assets where relevant - always with clear assumptions and defensible methods.',
      icon: FiDollarSign,
      slug: 'specialized-valuation',
      image: 'https://media.istockphoto.com/id/2189621574/photo/multiethnic-group-of-businesspeople-brainstorming-and-strategizing-in-a-meeting.jpg?s=612x612&w=0&k=20&c=ox0Wc_K_Tbg7A_KjUaohH5ZtpdRi3LCq5VXXDrpv8oA=',
      deliverables: [
        'IP and intangible asset valuations',
        'Purchase Price Allocation (PPA) models',
        'Digital asset and crypto valuations',
        'Fair value assessments for financial reporting'
      ],
      useCases: 'M&A transactions · Financial reporting · IP monetization · Digital asset portfolios'
    },
    {
      id: 9,
      title: 'SPAC Merger & Advisory',
      description: 'End-to-end SPAC merger & advisory services including de-SPAC transaction support, valuation, due diligence, and capital market execution for going public via SPAC.',
      icon: FiTrendingUp,
      slug: 'spac-advisory',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0b2NrJTIwbWFya2V0fGVufDB8fHwwfHx8MA%3D%3D',
      deliverables: [
        'SPAC formation, merger & IPO support',
        'Target identification and valuation',
        'De-SPAC transaction execution',
        'Due diligence and regulatory compliance',
        'Post-merger integration planning'
      ],
      useCases: 'SPAC sponsors · Target companies · Going public via SPAC · De-SPAC transactions'
    },
    {
      id: 10,
      title: 'Capital Market Advisory',
      description: 'Strategic capital markets guidance including IPO readiness, equity and debt capital raising, investor relations, and market positioning for public and private companies.',
      icon: FiBarChart,
      slug: 'capital-market-advisory',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcGl0YWwlMjBtYXJrZXR8ZW58MHx8MHx8fHww',
      deliverables: [
        'IPO readiness assessment and planning',
        'Equity and debt capital raising strategies',
        'Investor relations and communications',
        'Market positioning and valuation',
        'Regulatory compliance and reporting'
      ],
      useCases: 'IPO preparation · Capital raising · Investor relations · Public company advisory'
    },
    {
      id: 11,
      title: 'Comprehensive Business Valuation & Advisory Services',
      description: 'End-to-end business valuation and strategic advisory - from fairness opinions and M&A support to restructuring and dispute resolution, with clear, defensible reports.',
      icon: FiDollarSign,
      slug: 'comprehensive-business-valuation-advisory',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=60',
      deliverables: [
        'Fairness opinions and valuation reports',
        'M&A and restructuring advisory',
        'Dispute resolution and litigation support',
        'Strategic value assessment and recommendations'
      ],
      useCases: 'M&A · Restructuring · Disputes · Strategic planning · Board decisions'
    }
  ];

  // Priority: 409A Valuation, Financial Modeling & Forecasting, Fractional CFO & Board Support, M&A Advisory
  const priorityOrder = [
    '409a valuation',
    'financial modeling & forecasting',
    'fractional cfo & board support',
    'm&a advisory'
  ];
  const titleAliases = {
    '409a valuation': '409a valuation',
    'specialized valuation': 'business valuation',
    'financial modelling & forecasting': 'financial modeling & forecasting',
    'fractional cfo & board support': 'fractional cfo & board support',
    'm&a advisory (buy- & sell-side)': 'm&a advisory'
  };
  const prioritizedServices = [...services].sort((a, b) => {
    const aKey = (titleAliases[a.title.toLowerCase()] || a.title.toLowerCase());
    const bKey = (titleAliases[b.title.toLowerCase()] || b.title.toLowerCase());
    const aIdx = priorityOrder.indexOf(aKey);
    const bIdx = priorityOrder.indexOf(bKey);
    const aPriority = aIdx === -1 ? Number.MAX_SAFE_INTEGER : aIdx;
    const bPriority = bIdx === -1 ? Number.MAX_SAFE_INTEGER : bIdx;
    if (aPriority !== bPriority) return aPriority - bPriority;
    return a.id - b.id;
  });

  return (
    <ServicesContainer>
      <SEO
        title="Financial Services - YD Advisory Dubai"
        description="Comprehensive financial services including 409A Valuation, Financial Modelling & Forecasting, M&A Advisory, Transaction Advisory & Due Diligence, Fractional CFO & Board Support, Corporate Finance & Cross-Border Structuring, Feasibility & Option Papers, and Specialized Valuation. Expert guidance across UAE, India, Singapore, and more."
        keywords="business valuation Dubai, 409A valuation UAE, financial services Dubai, financial modeling Dubai, M&A advisory Dubai, transaction advisory UAE, fractional CFO Dubai, corporate finance UAE, feasibility studies Dubai, specialized valuation UAE"
        url="https://ydadvisory.ae/services"
        structuredData={services.map(service => serviceSchema(service))}
      />

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            YD Advisory Services
          </motion.h1>
          <HeroParagraph
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <HeroLine>
              From valuation and modelling to M&amp;A and CFO support, we translate complex numbers into decisions your stakeholders can rely on.
            </HeroLine>
           
          </HeroParagraph>
        </HeroContent>
      </HeroSection>

      {/* Services Section */}
      <CategorySection isEven={false}>
        <SectionContent>
          <CategoryHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Our Services
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Comprehensive financial advisory services designed to support your business growth, strategic decisions, and investment objectives.
            </motion.p>
          </CategoryHeader>

          <ServicesGrid>
            {prioritizedServices.map((service, index) => (
              <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
              >
                <ServiceCard>
                  <ServiceImage image={service.image} />
                  <ServiceContent>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    
                    <ServiceLink to={`/services/${service.slug}`}>
                      Learn More <FiArrowRight />
                    </ServiceLink>
                  </ServiceContent>
                </ServiceCard>
              </motion.div>
            ))}
          </ServicesGrid>
        </SectionContent>
      </CategorySection>

      <BusinessModel />

      <SpecialistIndustryCoverage altBackground />

      {/* Embedded Valuation Form (from Contact page) */}
      <ServiceFormSection id="service-form">
        <FormContent>
          <ServiceFormHeader>
            <h2>Request A Valuation</h2>
            <p>Submit your details and we’ll follow up within 48 hours with next steps or a complimentary valuation.</p>
          </ServiceFormHeader>
          <ValuationRequestForm />
        </FormContent>
      </ServiceFormSection>

      {/* Tools, Standards & Assurance Section */}
      <ToolsSection>
        <ToolsContent>
          <CategoryHeader>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Tools, Standards & Assurance
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              We maintain the highest standards of quality and use industry-leading tools to deliver exceptional results.
            </motion.p>
          </CategoryHeader>

          <ToolsGrid>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <ToolCard>
                <h3>Standards</h3>
                <ul>
                  <li>IVSC methodologies</li>
                  <li>Audit-ready documentation</li>
                  <li>Industry best practices</li>
                  <li>Regulatory compliance</li>
                </ul>
              </ToolCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <ToolCard>
                <h3>Tooling</h3>
                <ul>
                  <li>S&P Capital IQ</li>
                  <li>ValuSource</li>
                  <li>Factiva</li>
                  <li>@Risk/Monte-Carlo simulations</li>
                </ul>
              </ToolCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ToolCard>
                <h3>Style</h3>
                <ul>
                  <li>Tailored, not templated</li>
                  <li>Senior-led approach</li>
                  <li>Boutique speed</li>
                  <li>Clear assumptions & sensitivities</li>
                </ul>
              </ToolCard>
            </motion.div>
          </ToolsGrid>
        </ToolsContent>
      </ToolsSection>


      {/* CTA Section */}
      <CtaSection>
        <CtaContent>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Schedule a free consultation with our expert advisors and discover how 
            our services can help you achieve your financial goals.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <CtaButton to="/contact">
              Schedule Free Consultation <FiArrowRight />
            </CtaButton>
          </motion.div>
        </CtaContent>
      </CtaSection>
    </ServicesContainer>
  );
};

export default Services;