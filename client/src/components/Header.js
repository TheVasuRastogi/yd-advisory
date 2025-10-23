import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { openMailto, openTel, handleInteractiveLink } from '../utils/linkHelpers';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPhone, FiMail, FiClock, FiLinkedin, FiChevronDown } from 'react-icons/fi';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${props => props.theme.zIndex.tooltip};
  background: ${props => props.scrolled ? 'rgba(19, 78, 74, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.scrolled ? 'blur(10px)' : 'none'};
  transition: all ${props => props.theme.transitions.base};
  border-bottom: ${props => props.scrolled ? `1px solid ${props.theme.colors.primary[200]}` : 'none'};
  width: 100%;
  max-width: 100%;
  overflow: visible; /* ensure dropdowns are not clipped */
`;


const TopBar = styled.div`
  background: ${props => props.theme.colors.primary[800]};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[2]} 0;
  font-size: ${props => props.theme.fontSizes.sm};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

const TopBarContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing[4]};
`;

const ContactInfo = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[6]};
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    gap: ${props => props.theme.spacing[4]};
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  
  svg {
    color: ${props => props.theme.colors.primary[600]};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[3]};
  
  a {
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing[2]};
    color: ${props => props.theme.colors.white};
    text-decoration: none;
    transition: all ${props => props.theme.transitions.fast};
    padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
    border-radius: ${props => props.theme.borderRadius.md};
    
    svg {
      font-size: ${props => props.theme.fontSizes.lg};
    }
    
    span {
      font-size: ${props => props.theme.fontSizes.sm};
      font-weight: ${props => props.theme.fontWeights.medium};
    }
    
    &:hover {
      color: ${props => props.theme.colors.primary[300]};
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }
  }
`;

const MainHeader = styled.div`
  background: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[4]} 0;
  box-shadow: ${props => props.scrolled ? props.theme.shadows.md : 'none'};
  overflow: visible; /* allow dropdown to render outside */
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[3]} 0;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: ${props => props.theme.spacing[3]};
  padding-right: ${props => props.theme.spacing[3]};
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  overflow: visible; /* do not clip dropdown */
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding-left: ${props => props.theme.spacing[3]};
    padding-right: ${props => props.theme.spacing[3]};
    flex-wrap: nowrap;
    min-width: 0;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  text-decoration: none;
  flex-shrink: 0;
  min-width: 0;
  
  img {
    height: 50px;
    width: auto;
    max-width: 100%;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: ${props => props.theme.spacing[2]};
    
    img {
      height: 40px;
    }
  }
`;

const LogoText = styled.div`
  h1 {
    font-size: ${props => props.theme.fontSizes['2xl']};
    font-weight: ${props => props.theme.fontWeights.bold};
    color: ${props => props.theme.colors.primary[700]};
    margin: 0;
    line-height: 1;
  }
  
  p {
    font-size: ${props => props.theme.fontSizes.sm};
    color: ${props => props.theme.colors.gray[600]};
    margin: 0;
    font-weight: ${props => props.theme.fontWeights.medium};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    h1 {
      font-size: ${props => props.theme.fontSizes.xl};
    }
    
    p {
      font-size: ${props => props.theme.fontSizes.xs};
    }
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  align-items: center;
  justify-content: center; /* tighter grouping */
  column-gap: ${props => props.theme.spacing[6]};
`;

const NavItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.gray[700]};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  line-height: 1;
  padding: 0; /* remove extra vertical padding */
  transition: color ${props => props.theme.transitions.fast};
  position: relative;
  
  &:hover {
    color: ${props => props.theme.colors.primary[600]};
  }
  
  &.active {
    color: ${props => props.theme.colors.primary[600]};
    
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -6px; /* underline exactly below text */
      height: 2px;
      background: ${props => props.theme.colors.primary[500]};
    }
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  z-index: 10001; /* ensure above header content */
  overflow: visible;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.gray[700]};
  font-weight: ${props => props.theme.fontWeights.medium};
  padding: 0; /* align with links */
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[1]};
  transition: color ${props => props.theme.transitions.fast};
  font-size: inherit;
  position: relative;
  
  &:hover {
    color: ${props => props.theme.colors.primary[600]};
  }
  
  &.active {
    color: ${props => props.theme.colors.primary[600]};
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -6px;
    height: 2px;
    background: ${props => props.$isOpen ? props.theme.colors.primary[500] : 'transparent'};
    transition: background ${props => props.theme.transitions.fast};
  }
  
  svg {
    transition: transform ${props => props.theme.transitions.fast};
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  transform: none;
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid ${props => props.theme.colors.gray[200]};
  padding: ${props => props.theme.spacing[2]} 0;
  min-width: 220px;
  z-index: 10000;
  overflow: hidden;
  will-change: transform, opacity;
  pointer-events: auto;

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    left: 20px;
    transform: none;
    width: 12px;
    height: 12px;
    background: ${props => props.theme.colors.white};
    border-left: 1px solid ${props => props.theme.colors.gray[200]};
    border-top: 1px solid ${props => props.theme.colors.gray[200]};
    transform-origin: center;
    transform: rotate(45deg);
  }
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  color: ${props => props.theme.colors.gray[700]};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.medium};
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.primary[50]};
    color: ${props => props.theme.colors.primary[600]};
  }
  
  &.active {
    background: ${props => props.theme.colors.primary[100]};
    color: ${props => props.theme.colors.primary[700]};
  }
`;

const CTAButton = styled(Link)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.semibold};
  transition: all ${props => props.theme.transitions.fast};
  box-shadow: 0 4px 15px rgba(20, 184, 166, 0.3);
  font-size: ${props => props.theme.fontSizes.sm};
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4);
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.gray[700]};
  cursor: pointer;
  padding: ${props => props.theme.spacing[2]};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all ${props => props.theme.transitions.fast};
  flex-shrink: 0;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${props => props.theme.colors.gray[100]};
    color: ${props => props.theme.colors.primary[600]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    display: flex;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.xl};
    padding: ${props => props.theme.spacing[1]};
    min-width: 40px;
    min-height: 40px;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.colors.primary[900]};
  z-index: 9999;
  padding: ${props => props.theme.spacing[8]} ${props => props.theme.spacing[4]};
  overflow-y: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[6]} ${props => props.theme.spacing[3]};
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing[8]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: ${props => props.theme.spacing[6]};
  }
`;

const MobileLogo = styled.div`
  h2 {
    color: ${props => props.theme.colors.white};
    font-size: ${props => props.theme.fontSizes['2xl']};
    margin: 0;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    h2 {
      font-size: ${props => props.theme.fontSizes.xl};
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${props => props.theme.fontSizes['2xl']};
  color: ${props => props.theme.colors.white};
  cursor: pointer;
  padding: ${props => props.theme.spacing[2]};
  border-radius: ${props => props.theme.borderRadius.md};
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background: ${props => props.theme.colors.primary[800]};
    color: ${props => props.theme.colors.primary[300]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.xl};
    padding: ${props => props.theme.spacing[1]};
  }
`;

const MobileNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const MobileNavItem = styled.li`
  margin-bottom: ${props => props.theme.spacing[4]};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    margin-bottom: ${props => props.theme.spacing[3]};
  }
`;

const MobileNavLink = styled(Link)`
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-decoration: none;
  display: block;
  padding: ${props => props.theme.spacing[3]} 0;
  border-bottom: 1px solid ${props => props.theme.colors.primary[700]};
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.primary[300]};
    padding-left: ${props => props.theme.spacing[2]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.base};
    padding: ${props => props.theme.spacing[2]} 0;
  }
`;

const MobileDropdownButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${props => props.theme.spacing[3]} 0;
  border-bottom: 1px solid ${props => props.theme.colors.primary[700]};
  transition: all ${props => props.theme.transitions.fast};
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary[300]};
    padding-left: ${props => props.theme.spacing[2]};
  }
  
  svg {
    transition: transform ${props => props.theme.transitions.fast};
    transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.base};
    padding: ${props => props.theme.spacing[2]} 0;
  }
`;

const MobileDropdownMenu = styled(motion.div)`
  background: ${props => props.theme.colors.primary[800]};
  padding-left: ${props => props.theme.spacing[4]};
`;

const MobileDropdownItem = styled(Link)`
  color: ${props => props.theme.colors.primary[200]};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: ${props => props.theme.fontWeights.medium};
  text-decoration: none;
  display: block;
  padding: ${props => props.theme.spacing[2]} 0;
  border-bottom: 1px solid ${props => props.theme.colors.primary[700]};
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.primary[300]};
    padding-left: ${props => props.theme.spacing[2]};
  }
  
  &.active {
    color: ${props => props.theme.colors.primary[300]};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: ${props => props.theme.fontSizes.sm};
    padding: ${props => props.theme.spacing[1]} 0;
  }
`;

const MobileCTAButton = styled(Link)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary[600]}, ${props => props.theme.colors.primary[700]});
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing[4]} ${props => props.theme.spacing[6]};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-decoration: none;
  font-weight: ${props => props.theme.fontWeights.bold};
  font-size: ${props => props.theme.fontSizes.lg};
  text-align: center;
  display: block;
  margin-top: ${props => props.theme.spacing[6]};
  transition: all ${props => props.theme.transitions.fast};
  box-shadow: 0 4px 15px rgba(20, 184, 166, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(20, 184, 166, 0.4);
    background: linear-gradient(135deg, ${props => props.theme.colors.primary[700]}, ${props => props.theme.colors.primary[800]});
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
    font-size: ${props => props.theme.fontSizes.base};
    margin-top: ${props => props.theme.spacing[4]};
  }
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isMobileResourcesDropdownOpen, setIsMobileResourcesDropdownOpen] = useState(false);
  const [isValuatorDropdownOpen, setIsValuatorDropdownOpen] = useState(false);
  const [isMobileValuatorDropdownOpen, setIsMobileValuatorDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isResourcesDropdownOpen && !event.target.closest('[data-dropdown-container]')) {
        setIsResourcesDropdownOpen(false);
      }
      if (isValuatorDropdownOpen && !event.target.closest('[data-dropdown-container]')) {
        setIsValuatorDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isResourcesDropdownOpen, isValuatorDropdownOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsResourcesDropdownOpen(false);
    setIsMobileResourcesDropdownOpen(false);
    setIsValuatorDropdownOpen(false);
    setIsMobileValuatorDropdownOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleResourcesDropdown = () => {
    setIsResourcesDropdownOpen(!isResourcesDropdownOpen);
  };

  const toggleValuatorDropdown = () => {
    setIsValuatorDropdownOpen(!isValuatorDropdownOpen);
  };

  // Open on hover (desktop)
  const openResources = () => setIsResourcesDropdownOpen(true);
  const closeResources = (e) => {
    // keep open if focusing inside via keyboard; guard for non-Node relatedTarget
    const nextTarget = e?.relatedTarget;
    const container = e?.currentTarget;
    const isNode = typeof Node !== 'undefined' && nextTarget instanceof Node;
    if (container && isNode && typeof container.contains === 'function' && container.contains(nextTarget)) {
      return;
    }
    setIsResourcesDropdownOpen(false);
  };

  const toggleMobileResourcesDropdown = () => {
    setIsMobileResourcesDropdownOpen(!isMobileResourcesDropdownOpen);
  };

  const toggleMobileValuatorDropdown = () => {
    setIsMobileValuatorDropdownOpen(!isMobileValuatorDropdownOpen);
  };

  const closeValuatorDropdown = (e) => {
    const nextTarget = e?.relatedTarget;
    const container = e?.currentTarget;
    const isNode = typeof Node !== 'undefined' && nextTarget instanceof Node;
    if (container && isNode && typeof container.contains === 'function' && container.contains(nextTarget)) {
      return;
    }
    setIsValuatorDropdownOpen(false);
  };

  const isResourcesActive = location.pathname.startsWith('/blog') || location.pathname.startsWith('/templates');

  return (
    <HeaderContainer scrolled={isScrolled}>
      <TopBar>
        <TopBarContent>
          <ContactInfo>
            <ContactItem>
              <FiPhone />
              <a
                href="tel:+971528477349"
                style={{ color: 'inherit', textDecoration: 'none' }}
                aria-label="Call YD Advisory"
                onClick={(e) => handleInteractiveLink(e, () => openTel('+971528477349'))}
                onKeyDown={(e) => handleInteractiveLink(e, () => openTel('+971528477349'))}
              >
                +971-528477349
              </a>
            </ContactItem>
            <ContactItem>
              <FiMail />
              <a
                href="mailto:Yashaswi.das@ydadvisory.ae"
                style={{ color: 'inherit', textDecoration: 'none' }}
                aria-label="Email YD Advisory"
                onClick={(e) => handleInteractiveLink(e, () => openMailto('Yashaswi.das@ydadvisory.ae', { subject: 'Inquiry - YD Advisory', body: 'Hello YD Advisory,\n\n' }))}
                onKeyDown={(e) => handleInteractiveLink(e, () => openMailto('Yashaswi.das@ydadvisory.ae', { subject: 'Inquiry - YD Advisory', body: 'Hello YD Advisory,\n\n' }))}
              >
                Yashaswi.das@ydadvisory.ae
              </a>
            </ContactItem>
          </ContactInfo>
          <SocialLinks>
            <a href="https://www.linkedin.com/in/yashaswi-das/" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FiLinkedin />
              <span>LinkedIn</span>
            </a>
          </SocialLinks>
        </TopBarContent>
      </TopBar>

      <MainHeader>
        <HeaderContent>
          <Logo to="/">
            <img 
              src="/images/logo/logo.png" 
              alt="YD Advisory Logo" 
              style={{ 
                height: '60px', 
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </Logo>

          <Navigation>
            <NavList>
              <NavItem>
                <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                  About
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/services" className={location.pathname.startsWith('/services') ? 'active' : ''}>
                  Services
                </NavLink>
              </NavItem>
              <NavItem>
                <DropdownContainer data-dropdown-container onMouseEnter={openResources} onMouseLeave={closeResources}>
                  <DropdownButton 
                    onClick={toggleResourcesDropdown}
                    $isOpen={isResourcesDropdownOpen}
                    className={isResourcesActive ? 'active' : ''}
                  >
                    Resources
                    <FiChevronDown />
                  </DropdownButton>
                  <AnimatePresence>
                    {isResourcesDropdownOpen && (
                      <DropdownMenu
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                      >
                        <DropdownItem 
                          to="/blog" 
                          className={location.pathname.startsWith('/blog') ? 'active' : ''}
                        >
                          Blog
                        </DropdownItem>
                        <DropdownItem 
                          to="/templates" 
                          className={location.pathname.startsWith('/templates') ? 'active' : ''}
                        >
                          Financial Templates
                        </DropdownItem>
                      </DropdownMenu>
                    )}
                  </AnimatePresence>
                </DropdownContainer>
              </NavItem>
              <NavItem>
                <DropdownContainer data-dropdown-container onMouseEnter={() => setIsValuatorDropdownOpen(true)} onMouseLeave={(e) => closeValuatorDropdown(e)}>
                  <DropdownButton 
                    onClick={toggleValuatorDropdown}
                    $isOpen={isValuatorDropdownOpen}
                    className={location.pathname.startsWith('/calculator') || location.pathname.startsWith('/ip-valuation') ? 'active' : ''}
                  >
                    YD Valuator
                    <FiChevronDown />
                  </DropdownButton>
                  <AnimatePresence>
                    {isValuatorDropdownOpen && (
                      <DropdownMenu
                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                      >
                        <DropdownItem 
                          to="/calculator" 
                          className={location.pathname.startsWith('/calculator') ? 'active' : ''}
                        >
                          Business Valuation Tool
                        </DropdownItem>
                        <DropdownItem 
                          to="/ip-valuation" 
                          className={location.pathname.startsWith('/ip-valuation') ? 'active' : ''}
                        >
                          IP Valuation Tool
                        </DropdownItem>
                      </DropdownMenu>
                    )}
                  </AnimatePresence>
                </DropdownContainer>
              </NavItem>
              <NavItem>
                <NavLink to="/transparency" className={location.pathname === '/transparency' ? 'active' : ''}>
                  Transparency
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                  Contact
                </NavLink>
              </NavItem>
            </NavList>
          </Navigation>

          <CTAButton to="/contact">
            Get Consultation
          </CTAButton>

          <MobileMenuButton onClick={toggleMobileMenu}>
            <FiMenu />
          </MobileMenuButton>
        </HeaderContent>
      </MainHeader>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <MobileMenuHeader>
              <MobileLogo>
                <h2>YD Advisory</h2>
              </MobileLogo>
              <CloseButton onClick={toggleMobileMenu}>
                <FiX />
              </CloseButton>
            </MobileMenuHeader>
            <MobileNavList>
              <MobileNavItem>
                <MobileNavLink to="/">Home</MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink to="/about">About</MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink to="/services">Services</MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileDropdownButton 
                  onClick={toggleMobileResourcesDropdown}
                  $isOpen={isMobileResourcesDropdownOpen}
                >
                  Resources
                  <FiChevronDown />
                </MobileDropdownButton>
                <AnimatePresence>
                  {isMobileResourcesDropdownOpen && (
                    <MobileDropdownMenu
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MobileDropdownItem 
                        to="/blog" 
                        className={location.pathname.startsWith('/blog') ? 'active' : ''}
                      >
                        Blog
                      </MobileDropdownItem>
                      <MobileDropdownItem 
                        to="/templates" 
                        className={location.pathname.startsWith('/templates') ? 'active' : ''}
                      >
                        Financial Templates
                      </MobileDropdownItem>
                    </MobileDropdownMenu>
                  )}
                </AnimatePresence>
              </MobileNavItem>
              <MobileNavItem>
                <MobileDropdownButton 
                  onClick={toggleMobileValuatorDropdown}
                  $isOpen={isMobileValuatorDropdownOpen}
                >
                  YD Valuator
                  <FiChevronDown />
                </MobileDropdownButton>
                <AnimatePresence>
                  {isMobileValuatorDropdownOpen && (
                    <MobileDropdownMenu
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MobileDropdownItem 
                        to="/calculator" 
                        className={location.pathname.startsWith('/calculator') ? 'active' : ''}
                      >
                        Business Valuation Tool
                      </MobileDropdownItem>
                      <MobileDropdownItem 
                        to="/ip-valuation" 
                        className={location.pathname.startsWith('/ip-valuation') ? 'active' : ''}
                      >
                        IP Valuation Tool
                      </MobileDropdownItem>
                    </MobileDropdownMenu>
                  )}
                </AnimatePresence>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink to="/transparency">Transparency</MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink to="/contact">Contact</MobileNavLink>
              </MobileNavItem>
            </MobileNavList>
            
            <MobileCTAButton to="/contact">
              Get Free Consultation
            </MobileCTAButton>
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
