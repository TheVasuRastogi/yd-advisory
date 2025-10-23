import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiPieChart, FiTrendingUp, FiDollarSign, FiPercent, FiCalendar, FiMail, FiPhone, FiUser, FiShield, FiTarget, FiZap, FiX, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const CalculatorContainer = styled.div`
  min-height: 100vh;
  padding-top: 120px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[50]}, ${props => props.theme.colors.white});
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[4]};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  color: ${props => props.theme.colors.primary[600]};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.primary[700]};
    transform: translateX(-2px);
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary[800]};
  margin: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing[8]};
  max-width: 800px;
`;

const CalculatorTabs = styled.div`
  display: flex;
  background: ${props => props.theme.colors.white};
  border-radius: 12px;
  padding: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: ${props => props.theme.spacing[8]};
  border: 1px solid ${props => props.theme.colors.gray[200]};
`;

const Tab = styled.button`
  flex: 1;
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[6]};
  border: none;
  background: ${props => props.active ? props.theme.colors.primary[600] : 'transparent'};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.gray[600]};
  border-radius: 8px;
  font-weight: ${props => props.theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primary[700] : props.theme.colors.gray[50]};
  }
`;

const CalculatorCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid ${props => props.theme.colors.gray[100]};
  overflow: hidden;
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const CalculatorHeader = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[6]};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
`;

const CalculatorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.white};
  margin: 0;
`;

const CalculatorBody = styled.div`
  padding: ${props => props.theme.spacing[8]};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing[6]};
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[2]};
`;

const Label = styled.label`
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.primary[700]};
  font-size: ${props => props.theme.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing[4]};
  border: 2px solid ${props => props.hasError ? props.theme.colors.error : props.theme.colors.gray[300]};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.base};
  transition: all ${props => props.theme.transitions.fast};
  background: ${props => props.theme.colors.white};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary[100]};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.gray[400]};
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing[4]};
  border: 2px solid ${props => props.hasError ? props.theme.colors.error : props.theme.colors.gray[300]};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.base};
  transition: all ${props => props.theme.transitions.fast};
  background: ${props => props.theme.colors.white};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary[500]};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary[100]};
  }
`;

const CalculateButton = styled.button`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  border: none;
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: 1.1rem;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  width: 100%;
  min-height: 60px;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4);
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultsCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid ${props => props.theme.colors.gray[100]};
  overflow: hidden;
  margin-top: ${props => props.theme.spacing[8]};
`;

const ResultsHeader = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[6]};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
`;

const ResultsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.white};
  margin: 0;
`;

const ResultsBody = styled.div`
  padding: ${props => props.theme.spacing[8]};
`;

const ResultsTable = styled.div`
  overflow-x: auto;
  margin-bottom: ${props => props.theme.spacing[6]};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${props => props.theme.fontSizes.sm};
`;

const TableHeader = styled.th`
  background: ${props => props.theme.colors.primary[50]};
  color: ${props => props.theme.colors.primary[800]};
  padding: ${props => props.theme.spacing[3]};
  text-align: center;
  font-weight: ${props => props.theme.fontWeights.semibold};
  border: 1px solid ${props => props.theme.colors.gray[200]};
`;

const TableCell = styled.td`
  padding: ${props => props.theme.spacing[3]};
  text-align: center;
  border: 1px solid ${props => props.theme.colors.gray[200]};
  background: ${props => props.highlighted ? props.theme.colors.primary[50] : props.theme.colors.white};
  font-weight: ${props => props.bold ? props.theme.fontWeights.bold : props.theme.fontWeights.normal};
  color: ${props => props.negative ? props.theme.colors.error : props.theme.colors.gray[800]};
`;

const SummaryCard = styled.div`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[50]}, ${props => props.theme.colors.primary[100]});
  border: 2px solid ${props => props.theme.colors.primary[200]};
  border-radius: 12px;
  padding: ${props => props.theme.spacing[6]};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[6]};
`;

const SummaryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const SummaryValue = styled.div`
  font-size: 2.5rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.negative ? props.theme.colors.error : props.theme.colors.primary[700]};
  margin-bottom: ${props => props.theme.spacing[2]};
`;

const SummaryLabel = styled.div`
  color: ${props => props.theme.colors.gray[600]};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.medium};
`;

const Disclaimer = styled.div`
  background: ${props => props.theme.colors.gray[50]};
  border: 1px solid ${props => props.theme.colors.gray[200]};
  border-radius: 8px;
  padding: ${props => props.theme.spacing[4]};
  margin-top: ${props => props.theme.spacing[6]};
  font-size: ${props => props.theme.fontSizes.sm};
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.5;
`;

// Contact Modal Styles
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
  padding: ${props => props.theme.spacing[4]};
  backdrop-filter: blur(4px);
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: 20px;
  padding: ${props => props.theme.spacing[8]};
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  position: relative;
  border: 1px solid ${props => props.theme.colors.gray[200]};
  max-height: 90vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing[4]};
  right: ${props => props.theme.spacing[4]};
  background: ${props => props.theme.colors.gray[100]};
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.gray[600]};
  font-size: 1.2rem;
  padding: ${props => props.theme.spacing[2]};
  border-radius: 50%;
  transition: all ${props => props.theme.transitions.fast};
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${props => props.theme.colors.gray[200]};
    color: ${props => props.theme.colors.gray[800]};
    transform: scale(1.1);
  }
`;

const ModalIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[500]}, ${props => props.theme.colors.primary[600]});
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${props => props.theme.spacing[6]};
  
  svg {
    color: ${props => props.theme.colors.white};
    font-size: 32px;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const ModalDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing[6]};
  font-size: 1.1rem;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
  text-align: left;
`;

const ModalButton = styled.button`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  border: none;
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fontWeights.bold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  font-size: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  min-height: 48px;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4);
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const IPValuationCalculator = () => {
  const [activeTab, setActiveTab] = useState('basic');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPersonalizedPopup, setShowPersonalizedPopup] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [formData, setFormData] = useState({
    // Basic IP Valuation
    royaltyRate: '',
    corporateTaxRate: '',
    discountRate: '',
    growthRateForecast: '',
    growthRateResidual: '',
    salesYear1: '',
    // Earning Multiples
    industry: '',
    country: '',
    // R&D Calculator
    rdSales: ''
  });

  // Get calculator type from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const calculatorType = urlParams.get('type');
  
  useEffect(() => {
    if (calculatorType === 'advanced') {
      setActiveTab('earning');
    } else {
      setActiveTab('basic');
    }
  }, [calculatorType]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field, value) => {
    setContactData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getCompaniesByIndustryAndCountry = (industry, country) => {
    const companyDatabase = {
      'Technology': {
        'United States': [
          { name: 'Apple Inc.', pe: '28.5', evEbit: '22.1', evEbitda: '18.3' },
          { name: 'Microsoft Corp.', pe: '32.1', evEbit: '25.4', evEbitda: '21.7' },
          { name: 'Google (Alphabet)', pe: '24.8', evEbit: '19.6', evEbitda: '16.2' }
        ],
        'Germany': [
          { name: 'SAP SE', pe: '26.3', evEbit: '20.8', evEbitda: '17.1' },
          { name: 'Siemens AG', pe: '18.7', evEbit: '14.2', evEbitda: '11.9' },
          { name: 'Software AG', pe: '22.1', evEbit: '17.5', evEbitda: '14.3' }
        ],
        'China': [
          { name: 'Alibaba Group', pe: '15.2', evEbit: '12.8', evEbitda: '10.4' },
          { name: 'Tencent Holdings', pe: '19.6', evEbit: '16.3', evEbitda: '13.7' },
          { name: 'Baidu Inc.', pe: '13.4', evEbit: '10.9', evEbitda: '8.7' }
        ]
      },
      'Healthcare': {
        'United States': [
          { name: 'Johnson & Johnson', pe: '16.8', evEbit: '13.2', evEbitda: '11.5' },
          { name: 'Pfizer Inc.', pe: '14.3', evEbit: '11.7', evEbitda: '9.8' },
          { name: 'Merck & Co.', pe: '18.9', evEbit: '15.1', evEbitda: '12.6' }
        ],
        'Germany': [
          { name: 'Bayer AG', pe: '12.4', evEbit: '9.8', evEbitda: '8.2' },
          { name: 'Fresenius SE', pe: '15.7', evEbit: '12.3', evEbitda: '10.1' },
          { name: 'Sartorius AG', pe: '22.6', evEbit: '18.9', evEbitda: '15.7' }
        ],
        'Switzerland': [
          { name: 'Roche Holding', pe: '17.2', evEbit: '14.1', evEbitda: '11.8' },
          { name: 'Novartis AG', pe: '19.5', evEbit: '16.3', evEbitda: '13.4' },
          { name: 'Lonza Group', pe: '24.1', evEbit: '20.7', evEbitda: '17.2' }
        ]
      },
      'Automotive': {
        'United States': [
          { name: 'Tesla Inc.', pe: '45.2', evEbit: '38.7', evEbitda: '32.1' },
          { name: 'Ford Motor Co.', pe: '8.3', evEbit: '6.7', evEbitda: '5.4' },
          { name: 'General Motors', pe: '7.9', evEbit: '6.2', evEbitda: '5.1' }
        ],
        'Germany': [
          { name: 'BMW AG', pe: '6.8', evEbit: '5.4', evEbitda: '4.7' },
          { name: 'Mercedes-Benz', pe: '7.2', evEbit: '5.8', evEbitda: '4.9' },
          { name: 'Volkswagen AG', pe: '5.9', evEbit: '4.6', evEbitda: '3.8' }
        ],
        'Japan': [
          { name: 'Toyota Motor', pe: '9.1', evEbit: '7.3', evEbitda: '6.2' },
          { name: 'Honda Motor', pe: '8.7', evEbit: '6.9', evEbitda: '5.8' },
          { name: 'Nissan Motor', pe: '6.4', evEbit: '5.1', evEbitda: '4.3' }
        ]
      },
      'Banking': {
        'United States': [
          { name: 'JPMorgan Chase', pe: '11.2', evEbit: '8.9', evEbitda: '7.4' },
          { name: 'Bank of America', pe: '10.8', evEbit: '8.5', evEbitda: '7.1' },
          { name: 'Wells Fargo', pe: '9.7', evEbit: '7.6', evEbitda: '6.3' }
        ],
        'United Kingdom': [
          { name: 'HSBC Holdings', pe: '8.9', evEbit: '7.1', evEbitda: '5.9' },
          { name: 'Barclays PLC', pe: '7.3', evEbit: '5.8', evEbitda: '4.7' },
          { name: 'Lloyds Banking', pe: '6.8', evEbit: '5.4', evEbitda: '4.2' }
        ],
        'Germany': [
          { name: 'Deutsche Bank', pe: '5.2', evEbit: '4.1', evEbitda: '3.3' },
          { name: 'Commerzbank', pe: '4.8', evEbit: '3.7', evEbitda: '2.9' },
          { name: 'DZ Bank', pe: '6.1', evEbit: '4.8', evEbitda: '3.9' }
        ]
      },
      'Pharmaceuticals': {
        'United States': [
          { name: 'Eli Lilly', pe: '35.2', evEbit: '28.7', evEbitda: '24.1' },
          { name: 'AbbVie Inc.', pe: '18.6', evEbit: '15.3', evEbitda: '12.8' },
          { name: 'Bristol Myers', pe: '22.4', evEbit: '18.7', evEbitda: '15.6' }
        ],
        'Switzerland': [
          { name: 'Roche Holding', pe: '17.2', evEbit: '14.1', evEbitda: '11.8' },
          { name: 'Novartis AG', pe: '19.5', evEbit: '16.3', evEbitda: '13.4' },
          { name: 'Lonza Group', pe: '24.1', evEbit: '20.7', evEbitda: '17.2' }
        ],
        'Germany': [
          { name: 'Bayer AG', pe: '12.4', evEbit: '9.8', evEbitda: '8.2' },
          { name: 'Fresenius SE', pe: '15.7', evEbit: '12.3', evEbitda: '10.1' },
          { name: 'Sartorius AG', pe: '22.6', evEbit: '18.9', evEbitda: '15.7' }
        ]
      }
    };

    // Get companies for specific industry and country, or use default
    const industryData = companyDatabase[industry];
    if (industryData && industryData[country]) {
      return industryData[country];
    }

    // Fallback to generic companies if specific combination not found
    return [
      { name: `${industry} Corp.`, pe: (Math.random() * 20 + 5).toFixed(1), evEbit: (Math.random() * 15 + 3).toFixed(1), evEbitda: (Math.random() * 12 + 2).toFixed(1) },
      { name: `${industry} Ltd.`, pe: (Math.random() * 20 + 5).toFixed(1), evEbit: (Math.random() * 15 + 3).toFixed(1), evEbitda: (Math.random() * 12 + 2).toFixed(1) },
      { name: `${industry} Inc.`, pe: (Math.random() * 20 + 5).toFixed(1), evEbit: (Math.random() * 15 + 3).toFixed(1), evEbitda: (Math.random() * 12 + 2).toFixed(1) }
    ];
  };

  const calculateResults = () => {
    // Check if contact info is provided
    if (!contactData.name || !contactData.email || !contactData.phone) {
      setShowContactModal(true);
      return;
    }

    if (activeTab === 'basic') {
      calculateBasicIPValuation();
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {
      let calculatedResults = {};
      
      if (activeTab === 'earning') {
        // Get companies based on selected industry and country
        const companies = getCompaniesByIndustryAndCountry(formData.industry, formData.country);
        
        // Calculate average multiples
        const avgPe = companies.reduce((sum, company) => sum + parseFloat(company.pe), 0) / companies.length;
        const avgEvEbit = companies.reduce((sum, company) => sum + parseFloat(company.evEbit), 0) / companies.length;
        const avgEvEbitda = companies.reduce((sum, company) => sum + parseFloat(company.evEbitda), 0) / companies.length;
        
        calculatedResults = {
          pe: avgPe.toFixed(2),
          evEbit: avgEvEbit.toFixed(2),
          evEbitda: avgEvEbitda.toFixed(2),
          companies: companies
        };
      } else if (activeTab === 'rd') {
        // R&D Calculator - industry and country specific
        const industryMultiplier = getIndustryRDFactor(formData.industry);
        const countryMultiplier = getCountryRDFactor(formData.country);
        const rdSales = parseFloat(formData.rdSales) || 0;
        const baseRatio = rdSales * 0.1;
        const adjustedRatio = baseRatio * industryMultiplier * countryMultiplier;
        
        calculatedResults = {
          rdSalesRatio: adjustedRatio.toFixed(2),
          industry: formData.industry,
          country: formData.country
        };
      } else if (activeTab === 'royalty') {
        // Royalty Rate Calculator - industry and country specific
        const industryRate = getIndustryRoyaltyRate(formData.industry);
        const countryRate = getCountryRoyaltyRate(formData.country);
        const baseRate = (industryRate + countryRate) / 2;
        const variation = (Math.random() - 0.5) * 4; // ±2% variation
        const finalRate = Math.max(1, baseRate + variation);
        
        calculatedResults = {
          royaltyRate: finalRate.toFixed(2),
          industry: formData.industry,
          country: formData.country
        };
      }
      
      setResults(calculatedResults);
      setIsCalculating(false);
      
      // Show personalized popup after results
      setTimeout(() => {
        setShowPersonalizedPopup(true);
      }, 500);
    }, 1500);
  };

  // Original IP Valuation Calculator (Relief from Royalty Method)
  const calculateBasicIPValuation = () => {
    // Check if contact info is provided
    if (!contactData.name || !contactData.email || !contactData.phone) {
      setShowContactModal(true);
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {
      const { royaltyRate, corporateTaxRate, discountRate, growthRateForecast, growthRateResidual, salesYear1 } = formData;
      
      // Convert string values to numbers, defaulting to 0 if empty
      const royaltyRateNum = parseFloat(royaltyRate) || 0;
      const corporateTaxRateNum = parseFloat(corporateTaxRate) || 0;
      const discountRateNum = parseFloat(discountRate) || 0;
      const growthRateForecastNum = parseFloat(growthRateForecast) || 0;
      const growthRateResidualNum = parseFloat(growthRateResidual) || 0;
      const salesYear1Num = parseFloat(salesYear1) || 0;
      
      const years = 5;
      const calculationResults = [];
      
      let sales = salesYear1Num;
      let totalPV = 0;
      
      for (let year = 1; year <= years; year++) {
        const royaltyCashFlow = sales * (royaltyRateNum / 100);
        const corporateTax = royaltyCashFlow * (corporateTaxRateNum / 100);
        const earningAfterTax = royaltyCashFlow - corporateTax;
        const discountFactor = 1 / Math.pow(1 + (discountRateNum / 100), year);
        const discountedCashFlow = earningAfterTax * discountFactor;
        
        totalPV += discountedCashFlow;
        
        calculationResults.push({
          year,
          sales: Math.round(sales),
          royaltyCashFlow: Math.round(royaltyCashFlow),
          corporateTax: Math.round(corporateTax),
          earningAfterTax: Math.round(earningAfterTax),
          discountFactor: discountFactor.toFixed(4),
          discountedCashFlow: Math.round(discountedCashFlow)
        });
        
        sales *= (1 + growthRateForecastNum / 100);
      }
      
      // Continuing value calculation
      const finalSales = sales;
      const continuingValue = (finalSales * (royaltyRateNum / 100) * (1 - corporateTaxRateNum / 100)) / (discountRateNum / 100 - growthRateResidualNum / 100);
      const continuingValuePV = continuingValue * (1 / Math.pow(1 + (discountRateNum / 100), years));
      
      const fairMarketValue = totalPV + continuingValuePV;
      
      setResults({
        yearlyResults: calculationResults,
        continuingValue: Math.round(continuingValue),
        continuingValuePV: Math.round(continuingValuePV),
        totalPV: Math.round(totalPV),
        fairMarketValue: Math.round(fairMarketValue)
      });
      
      setIsCalculating(false);
      
      // Show personalized popup after results
      setTimeout(() => {
        setShowPersonalizedPopup(true);
      }, 500);
    }, 1500);
  };

  const getIndustryRDFactor = (industry) => {
    const factors = {
      'Technology': 1.5,
      'Pharmaceuticals': 1.8,
      'Biotechnology': 2.0,
      'Aerospace & Defense': 1.6,
      'Automotive': 1.3,
      'Healthcare': 1.4,
      'Banking': 0.8,
      'Retail': 0.6,
      'Construction': 0.7,
      'Energy': 1.2
    };
    return factors[industry] || 1.0;
  };

  const getCountryRDFactor = (country) => {
    const factors = {
      'United States': 1.3,
      'Germany': 1.2,
      'Japan': 1.1,
      'Switzerland': 1.4,
      'South Korea': 1.1,
      'China': 1.0,
      'United Kingdom': 1.1,
      'France': 1.0,
      'Canada': 1.0,
      'Netherlands': 1.1
    };
    return factors[country] || 1.0;
  };

  const getIndustryRoyaltyRate = (industry) => {
    const rates = {
      'Technology': 8.5,
      'Pharmaceuticals': 12.0,
      'Biotechnology': 15.0,
      'Aerospace & Defense': 6.0,
      'Automotive': 4.5,
      'Healthcare': 10.0,
      'Banking': 2.0,
      'Retail': 3.0,
      'Construction': 2.5,
      'Energy': 5.0
    };
    return rates[industry] || 5.0;
  };

  const getCountryRoyaltyRate = (country) => {
    const rates = {
      'United States': 8.0,
      'Germany': 7.5,
      'Japan': 6.5,
      'Switzerland': 9.0,
      'South Korea': 6.0,
      'China': 5.5,
      'United Kingdom': 7.0,
      'France': 6.8,
      'Canada': 6.5,
      'Netherlands': 7.2
    };
    return rates[country] || 6.0;
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!contactData.name.trim() || !contactData.email.trim() || !contactData.phone.trim()) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    setIsSubmittingContact(true);
    
    try {
      // Submit to backend API first
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: contactData.name.split(' ')[0] || contactData.name,
          lastName: contactData.name.split(' ').slice(1).join(' ') || '',
          email: contactData.email,
          phone: contactData.phone,
          company: formData.company || 'Not provided',
          subject: `IP Valuation Calculator Request - ${activeTab} Tool`,
          message: `Dear YD Advisory Team,

I have completed the IP Valuation Calculator and would like to receive detailed analysis and next steps.

CALCULATOR DETAILS:
- Calculator Type: ${activeTab}
- Industry: ${formData.industry || 'Not specified'}
- Country: ${formData.country || 'Not specified'}

VALUATION PARAMETERS:
${activeTab === 'basic' ? `
- Royalty Rate: ${formData.royaltyRate || 'Not specified'}%
- Corporate Tax Rate: ${formData.corporateTaxRate || 'Not specified'}%
- Discount Rate: ${formData.discountRate || 'Not specified'}%
- Growth Rate (Forecast): ${formData.growthRateForecast || 'Not specified'}%
- Growth Rate (Residual): ${formData.growthRateResidual || 'Not specified'}%
- Sales Year 1: ${formData.salesYear1 || 'Not specified'}
` : activeTab === 'earning' ? `
- Industry: ${formData.industry || 'Not specified'}
- Country: ${formData.country || 'Not specified'}
- Analysis Type: Earning Multiples (P/E, EV/EBIT, EV/EBITDA)
` : activeTab === 'rd' ? `
- Industry: ${formData.industry || 'Not specified'}
- Country: ${formData.country || 'Not specified'}
- R&D Expenditure: ${formData.rdSales || 'Not specified'}
- Analysis Type: R&D to Sales Ratio
` : activeTab === 'royalty' ? `
- Industry: ${formData.industry || 'Not specified'}
- Country: ${formData.country || 'Not specified'}
- Analysis Type: Royalty Rate Analysis
` : ''}

Please provide:
1. Detailed valuation analysis
2. Professional recommendations
3. Next steps for comprehensive IP valuation
4. Timeline and pricing information

Thank you for your expertise.`,
          serviceInterest: 'IP Valuation',
          formType: 'IP Valuation Calculator'
        })
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Form submitted successfully to backend');
      } else {
        throw new Error(result.message || 'Failed to submit form');
      }
    } catch (error) {
      // Fallback to Web3Forms if backend fails
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("access_key", "4d97b7da-7130-49e4-897a-50bd925206fe");
        formDataToSend.append("firstName", contactData.name.split(' ')[0] || contactData.name);
        formDataToSend.append("lastName", contactData.name.split(' ').slice(1).join(' ') || '');
        formDataToSend.append("email", contactData.email);
        formDataToSend.append("phone", contactData.phone);
        formDataToSend.append("subject", `IP Valuation Calculator Request - ${activeTab} Tool`);
        formDataToSend.append("message", `Dear YD Advisory Team,

I have completed the IP Valuation Calculator and would like to receive detailed analysis and next steps.

CALCULATOR DETAILS:
- Calculator Type: ${activeTab}
- Industry: ${formData.industry || 'Not specified'}
- Country: ${formData.country || 'Not specified'}

VALUATION PARAMETERS:
${activeTab === 'basic' ? `
- Royalty Rate: ${formData.royaltyRate || 'Not specified'}%
- Corporate Tax Rate: ${formData.corporateTaxRate || 'Not specified'}%
- Discount Rate: ${formData.discountRate || 'Not specified'}%
- Growth Rate (Forecast): ${formData.growthRateForecast || 'Not specified'}%
- Growth Rate (Residual): ${formData.growthRateResidual || 'Not specified'}%
- Sales Year 1: ${formData.salesYear1 || 'Not specified'}
` : activeTab === 'earning' ? `
- Industry: ${formData.industry || 'Not specified'}
- Country: ${formData.country || 'Not specified'}
- Analysis Type: Earning Multiples (P/E, EV/EBIT, EV/EBITDA)
` : activeTab === 'rd' ? `
- Industry: ${formData.industry || 'Not specified'}
- Country: ${formData.country || 'Not specified'}
- R&D Expenditure: ${formData.rdSales || 'Not specified'}
- Analysis Type: R&D to Sales Ratio
` : activeTab === 'royalty' ? `
- Industry: ${formData.industry || 'Not specified'}
- Country: ${formData.country || 'Not specified'}
- Analysis Type: Royalty Rate Analysis
` : ''}

Please provide:
1. Detailed valuation analysis
2. Professional recommendations
3. Next steps for comprehensive IP valuation
4. Timeline and pricing information

Thank you for your expertise.`);
        formDataToSend.append("serviceInterest", "IP Valuation");
        formDataToSend.append("formType", "IP Valuation Calculator");

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formDataToSend
        });

        const result = await response.json();
        
        if (result.success) {
          console.log('Form submitted successfully via Web3Forms');
        } else {
          console.error('Web3Forms submission failed:', result);
        }
      } catch (fallbackError) {
        console.error('Both submission methods failed:', fallbackError);
      }
    } finally {
      setIsSubmittingContact(false);
      setShowContactModal(false);
      calculateResults();
    }
  };

  const industries = [
    'Aerospace & Defense', 'Agriculture', 'Airlines', 'Alternative Energy', 'Apparel & Fashion',
    'Architecture & Planning', 'Arts & Crafts', 'Automotive', 'Aviation & Aerospace', 'Banking',
    'Biotechnology', 'Broadcast Media', 'Building Materials', 'Business Supplies & Equipment', 'Capital Markets',
    'Chemicals', 'Civic & Social Organization', 'Civil Engineering', 'Commercial Real Estate', 'Computer & Network Security',
    'Computer Games', 'Computer Hardware', 'Computer Networking', 'Computer Software', 'Construction',
    'Consumer Electronics', 'Consumer Goods', 'Consumer Services', 'Cosmetics', 'Dairy',
    'Defense & Space', 'Design', 'E-Learning', 'Education Management', 'Electrical & Electronic Manufacturing',
    'Entertainment', 'Environmental Services', 'Events Services', 'Executive Office', 'Facilities Services',
    'Farming', 'Financial Services', 'Fine Art', 'Fishery', 'Food & Beverages',
    'Food Production', 'Fund-Raising', 'Furniture', 'Gambling & Casinos', 'Glass, Ceramics & Concrete',
    'Government Administration', 'Government Relations', 'Graphic Design', 'Health, Wellness & Fitness', 'Higher Education',
    'Hospital & Health Care', 'Hospitality', 'Human Resources', 'Import and Export', 'Individual & Family Services',
    'Industrial Automation', 'Information Services', 'Information Technology & Services', 'Insurance', 'International Affairs',
    'International Trade & Development', 'Internet', 'Investment Banking', 'Investment Management', 'Judiciary',
    'Law Enforcement', 'Law Practice', 'Legal Services', 'Legislative Office', 'Leisure, Travel & Tourism',
    'Libraries', 'Logistics & Supply Chain', 'Luxury Goods & Jewelry', 'Machinery', 'Management Consulting',
    'Maritime', 'Market Research', 'Marketing & Advertising', 'Mechanical or Industrial Engineering', 'Media Production',
    'Medical Devices', 'Medical Practice', 'Mental Health Care', 'Military', 'Mining & Metals',
    'Motion Pictures & Film', 'Museums & Institutions', 'Music', 'Nanotechnology', 'Newspapers',
    'Non-Profit Organization Management', 'Oil & Energy', 'Online Media', 'Outsourcing/Offshoring', 'Package/Freight Delivery',
    'Packaging & Containers', 'Paper & Forest Products', 'Performing Arts', 'Pharmaceuticals', 'Photography',
    'Plastics', 'Political Organization', 'Primary/Secondary Education', 'Printing', 'Professional Training & Coaching',
    'Program Development', 'Public Policy', 'Public Relations & Communications', 'Public Safety', 'Publishing',
    'Railroad Manufacture', 'Ranching', 'Real Estate', 'Recreational Facilities & Services', 'Religious Institutions',
    'Renewables & Environment', 'Research', 'Restaurants', 'Retail', 'Security & Investigations',
    'Semiconductors', 'Shipbuilding', 'Sporting Goods', 'Sports', 'Staffing & Recruiting',
    'Supermarkets', 'Telecommunications', 'Textiles', 'Tobacco', 'Translation & Localization',
    'Transportation/Trucking/Railroad', 'Utilities', 'Venture Capital & Private Equity', 'Veterinary', 'Warehousing',
    'Wholesale', 'Wine & Spirits', 'Wireless', 'Writing & Editing'
  ];

  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
    'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica',
    'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador',
    'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France',
    'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
    'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland',
    'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan',
    'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar',
    'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia',
    'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal',
    'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan',
    'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar',
    'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia',
    'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa',
    'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan',
    'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan',
    'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City',
    'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
  ];

  const renderCalculator = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <CalculatorCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CalculatorHeader>
              <FiPieChart />
              <CalculatorTitle>Basic IP Valuation Calculator</CalculatorTitle>
            </CalculatorHeader>
            
            <CalculatorBody>
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                This tool enables you to perform a comprehensive IP valuation (patents, trademarks) using the relief from royalty method. 
                Default values are shown below. Please fill in all fields and press the 'Calculate' button when you're done.
              </p>
              
              <FormGrid>
                <FormGroup>
                  <Label>
                    <FiPercent />
                    Royalty Rate (%)
                  </Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.royaltyRate}
                    onChange={(e) => handleInputChange('royaltyRate', e.target.value)}
                    placeholder="Enter Royalty Rate"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FiPercent />
                    Corporate Tax Rate (%)
                  </Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.corporateTaxRate}
                    onChange={(e) => handleInputChange('corporateTaxRate', e.target.value)}
                    placeholder="Enter Corporate Tax Rate"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FiPercent />
                    Discount Rate (%)
                  </Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.discountRate}
                    onChange={(e) => handleInputChange('discountRate', e.target.value)}
                    placeholder="Enter Discount Rate"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FiTrendingUp />
                    Growth Rate - Forecast Period (%)
                  </Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.growthRateForecast}
                    onChange={(e) => handleInputChange('growthRateForecast', e.target.value)}
                    placeholder="Enter Growth Rate - Forecast"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FiTrendingUp />
                    Growth Rate - Residual Period (%)
                  </Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.growthRateResidual}
                    onChange={(e) => handleInputChange('growthRateResidual', e.target.value)}
                    placeholder="Enter Growth Rate - Residual"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FiDollarSign />
                    Sales in Year 1
                  </Label>
                  <Input
                    type="number"
                    value={formData.salesYear1}
                    onChange={(e) => handleInputChange('salesYear1', e.target.value)}
                    placeholder="Enter Sales in Year 1"
                  />
                </FormGroup>
              </FormGrid>

              <CalculateButton onClick={calculateResults} disabled={isCalculating}>
                {isCalculating ? (
                  <>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      border: '2px solid transparent', 
                      borderTop: '2px solid currentColor', 
                      borderRadius: '50%', 
                      animation: 'spin 1s linear infinite' 
                    }} />
                    Calculating...
                  </>
                ) : (
                  <>
                    <FiPieChart />
                    Calculate
                  </>
                )}
              </CalculateButton>
            </CalculatorBody>
          </CalculatorCard>
        );

      case 'earning':
        return (
          <CalculatorCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CalculatorHeader>
              <FiPieChart />
              <CalculatorTitle>Earning Multiples Calculator</CalculatorTitle>
            </CalculatorHeader>
            
            <CalculatorBody>
              <div style={{ 
                background: '#f0fdfa', 
                padding: '1.5rem', 
                borderRadius: '8px', 
                borderLeft: '4px solid #14b8a6',
                marginBottom: '2rem'
              }}>
                <h3 style={{ color: '#065f46', fontWeight: '600', marginBottom: '1rem', fontSize: '1.1rem' }}>
                  Understanding Valuation Multiples
                </h3>
                
                <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '6px', borderLeft: '4px solid #f59e0b', marginBottom: '1rem' }}>
                  <h4 style={{ color: '#92400e', fontWeight: '600', marginBottom: '0.5rem', fontSize: '1rem' }}>P/E (Price-to-Earnings Ratio)</h4>
                  <p style={{ color: '#92400e', marginBottom: '0.5rem', lineHeight: '1.6' }}>
                    The price-to-earnings ratio is a widely used valuation multiple for measuring the relative valuation of companies. A higher P/E ratio means that investors are paying more for each unit of net income, so the stock is more expensive compared to one with a lower P/E ratio.
                  </p>
                  <p style={{ color: '#92400e', margin: 0, lineHeight: '1.6', fontSize: '0.9rem' }}>
                    <strong>Limitations:</strong> The P/E is affected by a company's capital structure, not just its operating performance. Unlike EBIT, net income is calculated after non-operating items such as amortization of intangible assets and one-time gains and losses.
                  </p>
                </div>
                
                <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '6px', borderLeft: '4px solid #0ea5e9', marginBottom: '1rem' }}>
                  <h4 style={{ color: '#0c4a6e', fontWeight: '600', marginBottom: '0.5rem', fontSize: '1rem' }}>EV/EBIT (Enterprise Value to Earnings Before Interest and Taxes)</h4>
                  <p style={{ color: '#0c4a6e', marginBottom: '0.5rem', lineHeight: '1.6' }}>
                    EBIT represents the profits of the company before the impact of interest income, interest expense, and tax expense. EV/EBIT is also known as the EBIT Multiple. This is an extremely useful indicator that shows how many times a share price trades against earnings.
                  </p>
                  <p style={{ color: '#0c4a6e', margin: 0, lineHeight: '1.6', fontSize: '0.9rem' }}>
                    <strong>Key Advantage:</strong> The difference between EBIT Multiple and P/E Ratio is that EBIT Multiple takes into account distortions in earnings caused by cash holdings and borrowings, while P/E Ratio just lumps in everything. If we were to use just the P/E Ratio to measure a company's valuation, we may overlook the true income generating power of its underlying business.
                  </p>
                </div>
                
                <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '6px', borderLeft: '4px solid #f59e0b', marginBottom: '1rem' }}>
                  <h4 style={{ color: '#92400e', fontWeight: '600', marginBottom: '0.5rem', fontSize: '1rem' }}>EV/EBITDA (Enterprise Value to Earnings Before Interest, Taxes, Depreciation, and Amortization)</h4>
                  <p style={{ color: '#92400e', marginBottom: '0.5rem', lineHeight: '1.6' }}>
                    EV/EBITDA is a valuation multiple used to measure the value of a company. This important multiple is often used in conjunction with, or as an alternative to, the Price/Earnings ratio to determine the fair market value of a company.
                  </p>
                  <p style={{ color: '#92400e', margin: 0, lineHeight: '1.6', fontSize: '0.9rem' }}>
                    <strong>Why EBITDA Matters:</strong> EBITDA provides a clearer picture of a company's operational performance by excluding non-operating expenses like interest, taxes, depreciation, and amortization. This makes it particularly useful for comparing companies across different tax jurisdictions and capital structures.
                  </p>
                </div>
                
                <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '6px', borderLeft: '4px solid #0ea5e9' }}>
                  <h5 style={{ color: '#0c4a6e', fontWeight: '600', marginBottom: '0.5rem' }}>Professional Note:</h5>
                  <p style={{ color: '#0c4a6e', margin: 0, lineHeight: '1.6' }}>
                    These multiples should be used as part of a comprehensive valuation analysis. Industry-specific factors, company growth prospects, and market conditions should all be considered when interpreting these ratios. For professional valuation services, consult with YD Advisory's expert team.
                  </p>
                </div>
              </div>
              
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                This tool allows you to assess internationally used multiples to get a first indication of a company's value in a particular industry and country.
              </p>
              
              <FormGrid>
                <FormGroup>
                  <Label>
                    <FiTarget />
                    Industry
                  </Label>
                  <Select
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                  >
                    <option value="">Select Industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FiTarget />
                    Country
                  </Label>
                  <Select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </Select>
                </FormGroup>
              </FormGrid>

              <CalculateButton onClick={calculateResults} disabled={isCalculating}>
                {isCalculating ? (
                  <>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      border: '2px solid transparent', 
                      borderTop: '2px solid currentColor', 
                      borderRadius: '50%', 
                      animation: 'spin 1s linear infinite' 
                    }} />
                    Calculating...
                  </>
                ) : (
                  <>
                    <FiPieChart />
                    Show Results
                  </>
                )}
              </CalculateButton>
            </CalculatorBody>
          </CalculatorCard>
        );

      case 'rd':
        return (
          <CalculatorCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CalculatorHeader>
              <FiTrendingUp />
              <CalculatorTitle>Research & Development Calculator</CalculatorTitle>
            </CalculatorHeader>
            
            <CalculatorBody>
              <div style={{ 
                background: '#f0fdfa', 
                padding: '1.5rem', 
                borderRadius: '8px', 
                borderLeft: '4px solid #14b8a6',
                marginBottom: '2rem'
              }}>
                <h3 style={{ color: '#065f46', fontWeight: '600', marginBottom: '1rem', fontSize: '1.1rem' }}>
                  Understanding R&D Efficiency Metrics
                </h3>
                <h4 style={{ color: '#065f46', fontWeight: '600', marginBottom: '0.5rem', fontSize: '1rem' }}>
                  R&D to Sales Ratio Analysis
                </h4>
                <p style={{ color: '#065f46', marginBottom: '1rem', lineHeight: '1.6' }}>
                  The R&D to Sales ratio is a key performance indicator that measures how much a company invests in research and development relative to its revenue. This multiple is used to compare the efficiency and effectiveness of R&D expenditures among companies in the same industry and country.
                </p>
                
                <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '6px', borderLeft: '4px solid #f59e0b', marginBottom: '1rem' }}>
                  <h5 style={{ color: '#92400e', fontWeight: '600', marginBottom: '0.5rem' }}>Industry Benchmarks:</h5>
                  <ul style={{ color: '#92400e', margin: 0, paddingLeft: '1.5rem' }}>
                    <li><strong>Technology:</strong> Typically 8-15% of revenue</li>
                    <li><strong>Pharmaceuticals:</strong> Often 15-25% of revenue</li>
                    <li><strong>Biotechnology:</strong> Can exceed 30% of revenue</li>
                    <li><strong>Manufacturing:</strong> Usually 2-5% of revenue</li>
                  </ul>
                </div>
                
                <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '6px', borderLeft: '4px solid #0ea5e9' }}>
                  <h5 style={{ color: '#0c4a6e', fontWeight: '600', marginBottom: '0.5rem' }}>Interpretation:</h5>
                  <p style={{ color: '#0c4a6e', margin: 0, lineHeight: '1.6' }}>
                    A higher ratio may indicate strong innovation focus but could also suggest inefficient R&D spending. A lower ratio might indicate cost efficiency or potential underinvestment in innovation. Context and industry standards are crucial for proper interpretation.
                  </p>
                </div>
              </div>
              
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                This multiple is used to compare the efficiency and effectiveness of R&D expenditures among companies in the same industry and country.
              </p>
              
              <FormGrid>
                <FormGroup>
                  <Label>
                    <FiTarget />
                    Industry
                  </Label>
                  <Select
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                  >
                    <option value="">Select Industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FiTarget />
                    Country
                  </Label>
                  <Select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FiDollarSign />
                    R&D Expenditure
                  </Label>
                  <Input
                    type="number"
                    value={formData.rdSales}
                    onChange={(e) => handleInputChange('rdSales', e.target.value)}
                    placeholder="Enter R&D Expenditure"
                  />
                </FormGroup>
              </FormGrid>

              <CalculateButton onClick={calculateResults} disabled={isCalculating}>
                {isCalculating ? (
                  <>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      border: '2px solid transparent', 
                      borderTop: '2px solid currentColor', 
                      borderRadius: '50%', 
                      animation: 'spin 1s linear infinite' 
                    }} />
                    Calculating...
                  </>
                ) : (
                  <>
                    <FiTrendingUp />
                    Show Results
                  </>
                )}
              </CalculateButton>
            </CalculatorBody>
          </CalculatorCard>
        );

      case 'royalty':
        return (
          <CalculatorCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CalculatorHeader>
              <FiPercent />
              <CalculatorTitle>Royalty Rate Calculator</CalculatorTitle>
            </CalculatorHeader>
            
            <CalculatorBody>
              <div style={{ 
                background: '#f0fdfa', 
                padding: '1.5rem', 
                borderRadius: '8px', 
                borderLeft: '4px solid #14b8a6',
                marginBottom: '2rem'
              }}>
                <h3 style={{ color: '#065f46', fontWeight: '600', marginBottom: '1rem', fontSize: '1.1rem' }}>
                  Understanding Royalty Rate Valuation
                </h3>
                <h4 style={{ color: '#065f46', fontWeight: '600', marginBottom: '0.5rem', fontSize: '1rem' }}>
                  Intellectual Property Licensing Analysis
                </h4>
                <p style={{ color: '#065f46', marginBottom: '1rem', lineHeight: '1.6' }}>
                  Royalty rates are the percentage of net sales paid to the intellectual property owner for the right to use their IP. These rates are crucial for IP valuation, licensing negotiations, and determining the fair market value of intellectual property assets.
                </p>
                
                <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '6px', borderLeft: '4px solid #f59e0b', marginBottom: '1rem' }}>
                  <h5 style={{ color: '#92400e', fontWeight: '600', marginBottom: '0.5rem' }}>Industry Standards:</h5>
                  <ul style={{ color: '#92400e', margin: 0, paddingLeft: '1.5rem' }}>
                    <li><strong>Technology/Software:</strong> 3-8% of net sales</li>
                    <li><strong>Pharmaceuticals:</strong> 5-15% of net sales</li>
                    <li><strong>Biotechnology:</strong> 8-20% of net sales</li>
                    <li><strong>Consumer Products:</strong> 2-6% of net sales</li>
                    <li><strong>Manufacturing:</strong> 1-5% of net sales</li>
                  </ul>
                </div>
                
                <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '6px', borderLeft: '4px solid #0ea5e9' }}>
                  <h5 style={{ color: '#0c4a6e', fontWeight: '600', marginBottom: '0.5rem' }}>Valuation Application:</h5>
                  <p style={{ color: '#0c4a6e', margin: 0, lineHeight: '1.6' }}>
                    Royalty rates are commonly used in the "Relief from Royalty" method for IP valuation, where the value of IP is calculated as the present value of hypothetical royalty payments that would be avoided by owning the IP rather than licensing it.
                  </p>
                </div>
              </div>
              
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                Royalty rates refer to the percentage amount applied to sales to give royalties attributable to IP. This is usually a key issue for businesses with significant intellectual properties subject to license agreements.
              </p>
              
              <FormGrid>
                <FormGroup>
                  <Label>
                    <FiTarget />
                    Industry
                  </Label>
                  <Select
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                  >
                    <option value="">Select Industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FiTarget />
                    Country
                  </Label>
                  <Select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </Select>
                </FormGroup>
              </FormGrid>

              <CalculateButton onClick={calculateResults} disabled={isCalculating}>
                {isCalculating ? (
                  <>
                    <div style={{ 
                      width: '20px', 
                      height: '20px', 
                      border: '2px solid transparent', 
                      borderTop: '2px solid currentColor', 
                      borderRadius: '50%', 
                      animation: 'spin 1s linear infinite' 
                    }} />
                    Calculating...
                  </>
                ) : (
                  <>
                    <FiPercent />
                    Show Results
                  </>
                )}
              </CalculateButton>
            </CalculatorBody>
          </CalculatorCard>
        );

      default:
        return null;
    }
  };

  const renderResults = () => {
    if (!results) return null;

    return (
            <ResultsCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ResultsHeader>
          <FiCheck />
          <ResultsTitle>Calculation Results</ResultsTitle>
              </ResultsHeader>
              
              <ResultsBody>
          {activeTab === 'basic' && (
            <>
                <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                Below you find the results of the IP valuation using the relief from royalty method.
                </p>

                <ResultsTable>
                  <Table>
                    <thead>
                      <tr>
                        <TableHeader>Financial Metrics</TableHeader>
                        <TableHeader>Year 1</TableHeader>
                        <TableHeader>Year 2</TableHeader>
                        <TableHeader>Year 3</TableHeader>
                        <TableHeader>Year 4</TableHeader>
                        <TableHeader>Year 5</TableHeader>
                        <TableHeader>&gt; Year 5</TableHeader>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <TableCell>Sales</TableCell>
                        {results.yearlyResults.map((year, idx) => (
                          <TableCell key={idx}>{year.sales.toLocaleString()}</TableCell>
                        ))}
                        <TableCell>-</TableCell>
                      </tr>
                      <tr>
                        <TableCell>Royalty Cash Flow</TableCell>
                        {results.yearlyResults.map((year, idx) => (
                          <TableCell key={idx}>{year.royaltyCashFlow.toLocaleString()}</TableCell>
                        ))}
                        <TableCell>-</TableCell>
                      </tr>
                      <tr>
                        <TableCell>Corporate Tax</TableCell>
                        {results.yearlyResults.map((year, idx) => (
                          <TableCell key={idx} negative>{(-year.corporateTax).toLocaleString()}</TableCell>
                        ))}
                        <TableCell>-</TableCell>
                      </tr>
                      <tr>
                        <TableCell highlighted bold>Earning After Tax</TableCell>
                        {results.yearlyResults.map((year, idx) => (
                          <TableCell key={idx} highlighted bold>{year.earningAfterTax.toLocaleString()}</TableCell>
                        ))}
                        <TableCell>-</TableCell>
                      </tr>
                      <tr>
                        <TableCell>Discount Factors</TableCell>
                        {results.yearlyResults.map((year, idx) => (
                          <TableCell key={idx}>{year.discountFactor}</TableCell>
                        ))}
                        <TableCell>-</TableCell>
                      </tr>
                      <tr>
                        <TableCell>Discounted Cash Flows</TableCell>
                        {results.yearlyResults.map((year, idx) => (
                          <TableCell key={idx}>{year.discountedCashFlow.toLocaleString()}</TableCell>
                        ))}
                        <TableCell negative>{results.continuingValuePV.toLocaleString()}</TableCell>
                      </tr>
                    </tbody>
                  </Table>
                </ResultsTable>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                  <div>
                    <strong>Present Value of free cash flows forecast period:</strong><br />
                    {results.totalPV.toLocaleString()}
                  </div>
                  <div>
                    <strong>Present Value of free cash flows after forecast period:</strong><br />
                    <span style={{ color: '#ef4444' }}>{results.continuingValuePV.toLocaleString()}</span>
                  </div>
                </div>

                <SummaryCard>
                  <SummaryTitle>Fair Market Value</SummaryTitle>
                  <SummaryValue negative={results.fairMarketValue < 0}>
                    ${results.fairMarketValue.toLocaleString()}
                  </SummaryValue>
                  <SummaryLabel>Intellectual Property Valuation</SummaryLabel>
                </SummaryCard>
            </>
          )}

          {activeTab === 'earning' && (
            <>
              <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
                Below you find the results of the earning multiples analysis for <strong>{formData.industry}</strong> industry in <strong>{formData.country}</strong>.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <SummaryCard>
                  <SummaryTitle>P/E Ratio</SummaryTitle>
                  <SummaryValue>{results.pe}</SummaryValue>
                  <SummaryLabel>Price-to-Earnings</SummaryLabel>
                </SummaryCard>
                <SummaryCard>
                  <SummaryTitle>EV/EBIT</SummaryTitle>
                  <SummaryValue>{results.evEbit}</SummaryValue>
                  <SummaryLabel>Enterprise Value to EBIT</SummaryLabel>
                </SummaryCard>
                <SummaryCard>
                  <SummaryTitle>EV/EBITDA</SummaryTitle>
                  <SummaryValue>{results.evEbitda}</SummaryValue>
                  <SummaryLabel>Enterprise Value to EBITDA</SummaryLabel>
                </SummaryCard>
              </div>

              <ResultsTable>
                <Table>
                  <thead>
                    <tr>
                      <TableHeader>Company Name</TableHeader>
                      <TableHeader>P/E</TableHeader>
                      <TableHeader>EV/EBIT</TableHeader>
                      <TableHeader>EV/EBITDA</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {results.companies.map((company, idx) => (
                      <tr key={idx}>
                        <TableCell>{company.name}</TableCell>
                        <TableCell>{company.pe}</TableCell>
                        <TableCell>{company.evEbit}</TableCell>
                        <TableCell>{company.evEbitda}</TableCell>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </ResultsTable>

            </>
          )}

          {activeTab === 'rd' && (
            <>
              <SummaryCard>
                <SummaryTitle>R&D / Sales Ratio</SummaryTitle>
                <SummaryValue>{results.rdSalesRatio}</SummaryValue>
                <SummaryLabel>Research & Development Efficiency</SummaryLabel>
                <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
                  <strong>Industry:</strong> {results.industry} | <strong>Country:</strong> {results.country}
                </div>
              </SummaryCard>

            </>
          )}

          {activeTab === 'royalty' && (
            <>
              <SummaryCard>
                <SummaryTitle>Royalty Rate / Sales</SummaryTitle>
                <SummaryValue>{results.royaltyRate}%</SummaryValue>
                <SummaryLabel>Intellectual Property Royalty Rate</SummaryLabel>
                <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#6b7280' }}>
                  <strong>Industry:</strong> {results.industry} | <strong>Country:</strong> {results.country}
                </div>
              </SummaryCard>

            </>
          )}

                <Disclaimer>
                  <strong>Disclaimer:</strong> Any valuations given are illustrative only. None of the projections or assumptions should be taken as forecasts, nor should they be taken as a guarantee that those assumptions are correct or exhaustive. This tool is for educational and preliminary analysis purposes only.
                </Disclaimer>
              </ResultsBody>
            </ResultsCard>
    );
  };

  return (
    <>
      <SEO 
        title="IP Valuation Calculator | YD Advisory"
        description="Calculate the value of your intellectual property using our professional IP valuation calculator. Get accurate results for patents, trademarks, and copyrights."
        keywords="IP valuation calculator, intellectual property valuation, patent valuation, trademark valuation, IP calculator"
      />
      
      <CalculatorContainer>
        <Container>
          <Header>
            <BackButton to="/ip-valuation">
              <FiArrowLeft />
              Back to IP Valuation Tools
            </BackButton>
          </Header>

          <Title>IP Valuation Calculator</Title>

          <Description>
            {calculatorType === 'advanced' 
              ? "This tool allows you to assess internationally used multiples in order to get a first indication of a company's value in a particular industry and country. Moreover, the R&D/Sales multiple is an indication of the effectiveness and efficiency of R&D expenditures in a particular sector and the Royalty Rate to sales gives you an indication of the impact of intangible assets in the total revenues."
              : "Professional IP valuation calculator using the relief from royalty method. Enter your financial parameters to calculate the fair market value of your intellectual property assets including patents, trademarks, and copyrights."
            }
          </Description>

          <CalculatorTabs>
            {calculatorType !== 'advanced' && (
              <Tab 
                active={activeTab === 'basic'} 
                onClick={() => setActiveTab('basic')}
              >
                <FiPieChart />
                Basic IP Valuation
              </Tab>
            )}
            {calculatorType === 'advanced' && (
              <>
                <Tab 
                  active={activeTab === 'earning'} 
                  onClick={() => setActiveTab('earning')}
                >
                  <FiPieChart />
                  Earning Multiples
                </Tab>
                <Tab 
                  active={activeTab === 'rd'} 
                  onClick={() => setActiveTab('rd')}
                >
                  <FiTrendingUp />
                  Research & Development
                </Tab>
                <Tab 
                  active={activeTab === 'royalty'} 
                  onClick={() => setActiveTab('royalty')}
                >
                  <FiPercent />
                  Royalty Rate
                </Tab>
              </>
            )}
          </CalculatorTabs>

          {renderCalculator()}
          {renderResults()}
        </Container>
      </CalculatorContainer>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowContactModal(false)}
          >
            <ModalContent
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setShowContactModal(false)}>
                <FiX />
              </CloseButton>
              
              <ModalIcon>
                <FiShield />
              </ModalIcon>
              
              <ModalTitle>Contact Information Required</ModalTitle>
              
              <ModalDescription>
                To view your calculation results, please provide your contact information. This helps us ensure the security and proper delivery of your valuation results.
              </ModalDescription>
              
              <ModalForm onSubmit={handleContactSubmit}>
                <FormGroup>
                  <Label>
                    <FiUser />
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    value={contactData.name}
                    onChange={(e) => handleContactChange('name', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FiMail />
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    value={contactData.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    <FiPhone />
                    Phone Number
                  </Label>
                  <Input
                    type="tel"
                    value={contactData.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    required
                  />
                </FormGroup>

                <ModalButton type="submit" disabled={isSubmittingContact}>
                  {isSubmittingContact ? (
                    <>
                      <div style={{ 
                        width: '16px', 
                        height: '16px', 
                        border: '2px solid transparent', 
                        borderTop: '2px solid currentColor', 
                        borderRadius: '50%', 
                        animation: 'spin 1s linear infinite' 
                      }} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiCheck />
                      Continue to Results
                    </>
                  )}
                </ModalButton>
              </ModalForm>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* Personalized Popup Modal */}
      <AnimatePresence>
        {showPersonalizedPopup && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPersonalizedPopup(false)}
            style={{ 
              background: 'rgba(0, 0, 0, 0.6)', 
              backdropFilter: 'blur(8px)',
              zIndex: 9999
            }}
          >
            <ModalContent
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              onClick={(e) => e.stopPropagation()}
              style={{ 
                maxWidth: '700px', 
                width: '90vw',
                maxHeight: '90vh',
                overflow: 'auto',
                background: 'white',
                borderRadius: '20px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative'
              }}
            >
              <CloseButton 
                onClick={() => setShowPersonalizedPopup(false)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0, 0, 0, 0.05)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(0, 0, 0, 0.1)';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(0, 0, 0, 0.05)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <FiX size={20} />
              </CloseButton>
              
              {/* Header Section */}
              <div style={{ 
                background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 50%, #5eead4 100%)',
                color: 'white',
                padding: '2.5rem 2rem 2rem 2rem',
                borderRadius: '20px 20px 0 0',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-20%',
                  width: '200px',
                  height: '200px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  zIndex: 1
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '-30%',
                  left: '-10%',
                  width: '150px',
                  height: '150px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '50%',
                  zIndex: 1
                }} />
                
                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>YD</span>
                  </div>
                  
                  <h2 style={{ 
                    margin: 0, 
                    fontSize: '2rem', 
                    fontWeight: '800',
                    letterSpacing: '-0.02em',
                    marginBottom: '0.5rem'
                  }}>
                    YD Advisory
                  </h2>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '1.1rem', 
                    opacity: 0.9,
                    fontWeight: '500'
                  }}>
                    Intellectual Property Valuation Specialists
                  </p>
                </div>
              </div>
              
              {/* Content Section */}
              <div style={{ 
                padding: '2.5rem 2rem',
                background: 'white'
              }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <p style={{ 
                    fontSize: '1.2rem', 
                    lineHeight: '1.7', 
                    color: '#1f2937', 
                    marginBottom: '2rem',
                    fontWeight: '600'
                  }}>
                    Dear <span style={{ color: '#14b8a6', fontWeight: '700' }}>{contactData.name}</span>,
                  </p>
                  
                  <p style={{ 
                    fontSize: '1rem', 
                    lineHeight: '1.7', 
                    color: '#374151', 
                    marginBottom: '1.5rem'
                  }}>
                    Thank you for using our IP Valuation Calculator. We understand that <strong style={{ color: '#0f766e' }}>valuing intellectual property can be complex and challenging</strong>, especially when you need reliable data to make informed decisions about your patents, trademarks, or other intangible assets.
                  </p>
                  
                  <p style={{ 
                    fontSize: '1rem', 
                    lineHeight: '1.7', 
                    color: '#374151', 
                    marginBottom: '2rem'
                  }}>
                    If you're reading this, you've likely been searching for accurate IP valuation methods and professional expertise. We've experienced similar challenges in the market, which is why we created YD Advisory to provide <strong style={{ color: '#0f766e' }}>the most reliable IP valuation services</strong> with the <strong style={{ color: '#0f766e' }}>widest range of methodologies</strong> available.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  style={{ 
                    background: 'linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 100%)', 
                    padding: '2rem', 
                    borderRadius: '16px', 
                    border: '1px solid #a7f3d0',
                    marginBottom: '2rem',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #14b8a6, #5eead4)',
                    borderRadius: '50%',
                    opacity: 0.1
                  }} />
                  
                  <h4 style={{ 
                    color: '#065f46', 
                    fontWeight: '700', 
                    marginBottom: '1rem', 
                    fontSize: '1.2rem',
                    position: 'relative',
                    zIndex: 2
                  }}>
                    What happens next?
                  </h4>
                  <p style={{ 
                    color: '#065f46', 
                    lineHeight: '1.7', 
                    marginBottom: '1rem',
                    position: 'relative',
                    zIndex: 2
                  }}>
                    Our IP specialists will carefully analyze your intellectual property portfolio and conduct thorough market research specific to your industry. We'll prepare a comprehensive valuation report that provides you with actionable insights and professional recommendations.
                  </p>
                  <p style={{ 
                    color: '#065f46', 
                    lineHeight: '1.7', 
                    margin: 0,
                    position: 'relative',
                    zIndex: 2
                  }}>
                    While we're continuously improving our processes, we're <strong>dedicated to making you a satisfied client</strong>. Feel free to explore our IP services, and if you need any assistance, our team is here to help.
                  </p>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  style={{ 
                    fontSize: '1rem', 
                    lineHeight: '1.7', 
                    color: '#374151', 
                    marginBottom: '2rem',
                    textAlign: 'center',
                    fontWeight: '500'
                  }}
                >
                  Our IP valuation team will contact you within <strong style={{ color: '#14b8a6' }}>24 hours</strong> to discuss your intellectual property assets and provide a detailed timeline for your comprehensive analysis.
                </motion.p>
              </div>
              
              {/* Contact Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                style={{ 
                  background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 50%, #5eead4 100%)',
                  color: 'white',
                  padding: '2rem',
                  borderRadius: '0 0 20px 20px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                  zIndex: 1
                }} />
                
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <h3 style={{ 
                    marginBottom: '1.5rem', 
                    fontSize: '1.4rem', 
                    fontWeight: '700',
                    textAlign: 'center'
                  }}>
                    Ready to discuss your IP valuation?
                  </h3>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '1.5rem',
                    marginBottom: '2rem'
                  }}>
                    <div style={{ 
                      textAlign: 'center',
                      background: 'rgba(255, 255, 255, 0.1)',
                      padding: '1rem',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📞</div>
                      <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600' }}>+971-528477349</p>
                    </div>
                    
                    <div style={{ 
                      textAlign: 'center',
                      background: 'rgba(255, 255, 255, 0.1)',
                      padding: '1rem',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>@</div>
                      <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600' }}>Yashaswi.das@ydadvisory.ae</p>
                    </div>
                    
                    <div style={{ 
                      textAlign: 'center',
                      background: 'rgba(255, 255, 255, 0.1)',
                      padding: '1rem',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌐</div>
                      <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600' }}>www.ydadvisory.ae</p>
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '1.5rem' }}>
                    <p style={{ 
                      color: 'rgba(255, 255, 255, 0.9)', 
                      fontSize: '0.95rem', 
                      margin: 0,
                      fontWeight: '500'
                    }}>
                      Best regards,<br />
                      <strong style={{ fontSize: '1.1rem' }}>Yashaswi Das</strong><br />
                      <span style={{ opacity: 0.8 }}>Founder & CEO, YD Advisory</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default IPValuationCalculator;
