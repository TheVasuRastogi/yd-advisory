import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiArrowRight, FiTrendingUp, FiShield, FiTarget, FiZap, FiX, FiClock } from 'react-icons/fi';
import SEO from '../components/SEO';

const IPValuationContainer = styled.div`
  min-height: 100vh;
  padding-top: 120px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[50]}, ${props => props.theme.colors.white});
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[4]};
`;

const Hero = styled.div`
  background: linear-gradient(180deg, ${props => props.theme.colors.white} 0%, ${props => props.theme.colors.primary[50]} 100%);
  border: 1px solid ${props => props.theme.colors.gray[100]};
  border-radius: 20px;
  padding: ${props => props.theme.spacing[10]} ${props => props.theme.spacing[8]};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing[10]};
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[4]};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${props => props.theme.colors.gray[600]};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 1.1rem;
  }
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing[8]};
  margin-bottom: ${props => props.theme.spacing[12]};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing[6]};
  }
`;

const ToolCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: 16px;
  padding: ${props => props.theme.spacing[8]};
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid ${props => props.theme.colors.gray[100]};
  transition: all ${props => props.theme.transitions.base};
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
  }
`;

const ToolHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing[6]};
`;

const ToolIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[500]}, ${props => props.theme.colors.primary[600]});
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    color: ${props => props.theme.colors.white};
    font-size: 32px;
  }
`;

const Badge = styled.span`
  background: ${props => props.theme.colors.primary[100]};
  color: ${props => props.theme.colors.primary[800]};
  border: 1px solid ${props => props.theme.colors.primary[200]};
  padding: 8px 16px;
  border-radius: 999px;
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: ${props => props.theme.fontWeights.semibold};
`;

const ToolTitle = styled.h2`
  font-size: 2rem;
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.primary[800]};
  margin-bottom: ${props => props.theme.spacing[4]};
`;

const ToolDescription = styled.p`
  color: ${props => props.theme.colors.gray[600]};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing[6]};
  font-size: 1.1rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  margin: 0 0 ${props => props.theme.spacing[6]} 0;
  padding: 0;
  flex-grow: 1;
  
  li {
    color: ${props => props.theme.colors.gray[700]};
    margin-bottom: ${props => props.theme.spacing[3]};
    display: flex;
    align-items: center;
    font-size: 1rem;
    
    &::before {
      content: '✓';
      color: ${props => props.theme.colors.primary[500]};
      font-weight: bold;
      margin-right: ${props => props.theme.spacing[3]};
      font-size: 1.2rem;
    }
  }
`;

const StartButton = styled.button`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  border: none;
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[8]};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-weight: ${props => props.theme.fontWeights.bold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing[2]};
  width: 100%;
  min-height: 60px;
  font-size: 1.1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4);
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  }
`;

const ComparisonSection = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: 12px;
  padding: ${props => props.theme.spacing[6]};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid ${props => props.theme.colors.gray[200]};
  margin-bottom: ${props => props.theme.spacing[8]};
`;

const ComparisonTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: ${props => props.theme.spacing[6]};
  text-align: center;
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing[4]};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing[3]};
  }
`;

const ComparisonCard = styled.div`
  padding: ${props => props.theme.spacing[5]};
  border-radius: 8px;
  border: 1px solid ${props => props.isAdvanced ? props.theme.colors.primary[300] : props.theme.colors.gray[300]};
  background: ${props => props.isAdvanced ? props.theme.colors.primary[25] : props.theme.colors.gray[25]};
`;

const ComparisonCardTitle = styled.h4`
  font-size: 1rem;
  font-weight: ${props => props.theme.fontWeights.semibold};
  color: ${props => props.theme.colors.gray[800]};
  margin-bottom: ${props => props.theme.spacing[3]};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  
  svg {
    font-size: 1.1rem;
    color: ${props => props.isAdvanced ? props.theme.colors.primary[600] : props.theme.colors.gray[600]};
  }
`;

const ComparisonFeatures = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  
  li {
    color: ${props => props.theme.colors.gray[600]};
    margin-bottom: ${props => props.theme.spacing[2]};
    display: flex;
    align-items: flex-start;
    font-size: 0.9rem;
    line-height: 1.4;
    
    &::before {
      content: '•';
      color: ${props => props.isAdvanced ? props.theme.colors.primary[500] : props.theme.colors.gray[500]};
      font-weight: bold;
      margin-right: ${props => props.theme.spacing[2]};
      margin-top: 2px;
    }
  }
`;

// Coming Soon Modal Styles
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${props => props.theme.spacing[4]};
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  border-radius: 16px;
  padding: ${props => props.theme.spacing[8]};
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${props => props.theme.spacing[4]};
  right: ${props => props.theme.spacing[4]};
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.gray[500]};
  font-size: 1.5rem;
  padding: ${props => props.theme.spacing[2]};
  border-radius: 50%;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.gray[100]};
    color: ${props => props.theme.colors.gray[700]};
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
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4);
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  }
`;

const IPValuation = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const basicFeatures = [
    "Patent portfolio analysis",
    "Basic market research",
    "Simple valuation models",
    "Standard IP categories",
    "Basic risk assessment",
    "Quick turnaround (1-2 days)"
  ];

  const advancedFeatures = [
    "Comprehensive IP audit",
    "Advanced market analysis",
    "Multiple valuation methodologies",
    "Industry-specific benchmarks",
    "Detailed risk modeling",
    "Custom reporting (3-5 days)"
  ];

  const handleStartBasic = () => {
    // Navigate to basic IP valuation calculator
    window.location.href = '/ip-valuation-calculator';
  };

  const handleStartAdvanced = () => {
    // Navigate to advanced IP valuation calculator
    window.location.href = '/ip-valuation-calculator?type=advanced';
  };

  const closeComingSoonModal = () => {
    setShowComingSoon(false);
  };

  return (
    <>
      <SEO 
        title="IP Valuation Tools | YD Advisory"
        description="Professional intellectual property valuation tools. Choose between basic and advanced IP valuation calculators for patents, trademarks, and copyrights."
        keywords="IP valuation, intellectual property valuation, patent valuation, trademark valuation, IP calculator"
      />
      
      <IPValuationContainer>
        <Container>
          <Hero>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Title>IP Valuation Tools</Title>
              <Subtitle>
                Professional intellectual property valuation tools for patents, trademarks, and copyrights. 
                Choose the right tool for your needs.
              </Subtitle>
            </motion.div>
          </Hero>

          <ToolsGrid>
            <ToolCard
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ToolHeader>
                <ToolIcon>
                  <FiTarget />
                </ToolIcon>
                <Badge>Basic</Badge>
              </ToolHeader>

              <ToolTitle>Basic IP Valuation Tool</ToolTitle>
              <ToolDescription>
                Quick and straightforward IP valuation for standard intellectual property assets. 
                Perfect for initial assessments and basic portfolio analysis.
              </ToolDescription>
              
              <FeaturesList>
                {basicFeatures.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </FeaturesList>
              
              <StartButton onClick={handleStartBasic}>
                Start Calculate
                <FiArrowRight />
              </StartButton>
            </ToolCard>

            <ToolCard
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ToolHeader>
                <ToolIcon>
                  <FiZap />
                </ToolIcon>
                <Badge style={{ background: '#14b8a6', color: '#ffffff', border: '1px solid #0d9488' }}>
                  Advanced
                </Badge>
              </ToolHeader>

              <ToolTitle>Advanced IP Valuation Tool</ToolTitle>
              <ToolDescription>
                Comprehensive IP valuation with advanced analytics, market research, and detailed reporting. 
                Ideal for complex portfolios and strategic decision-making.
              </ToolDescription>
              
              <FeaturesList>
                {advancedFeatures.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </FeaturesList>
              
              <StartButton onClick={handleStartAdvanced}>
                Start Calculate
                <FiArrowRight />
              </StartButton>
            </ToolCard>
          </ToolsGrid>

          <ComparisonSection>
            <ComparisonTitle>Tool Comparison</ComparisonTitle>
            <ComparisonGrid>
              <ComparisonCard isAdvanced={false}>
                <ComparisonCardTitle>
                  <FiTarget />
                  Basic IP Valuation
                </ComparisonCardTitle>
                <ComparisonFeatures>
                  <li>Standard valuation models</li>
                  <li>Basic market data</li>
                  <li>Simple risk factors</li>
                  <li>Quick results</li>
                  <li>Cost-effective</li>
                  <li>Perfect for startups</li>
                </ComparisonFeatures>
              </ComparisonCard>

              <ComparisonCard isAdvanced={true}>
                <ComparisonCardTitle>
                  <FiZap />
                  Advanced IP Valuation
                </ComparisonCardTitle>
                <ComparisonFeatures>
                  <li>Multiple valuation methods</li>
                  <li>Comprehensive market research</li>
                  <li>Advanced risk modeling</li>
                  <li>Detailed analysis</li>
                  <li>Premium features</li>
                  <li>Ideal for enterprises</li>
                </ComparisonFeatures>
              </ComparisonCard>
            </ComparisonGrid>
          </ComparisonSection>
        </Container>
      </IPValuationContainer>

      {/* Coming Soon Modal */}
      <AnimatePresence>
        {showComingSoon && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeComingSoonModal}
          >
            <ModalContent
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeComingSoonModal}>
                <FiX />
              </CloseButton>
              
              <ModalIcon>
                <FiClock />
              </ModalIcon>
              
              <ModalTitle>Coming Soon!</ModalTitle>
              
              <ModalDescription>
                We're working hard to bring you the most advanced IP valuation tool with comprehensive analytics, 
                market research, and detailed reporting. Stay tuned for updates!
              </ModalDescription>
              
              <ModalButton onClick={closeComingSoonModal}>
                Got it!
              </ModalButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default IPValuation;
