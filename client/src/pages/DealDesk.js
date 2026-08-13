import React, { useState, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTarget, FiFileText, FiArrowRight, FiCheck, FiX, FiTool, FiLayout, FiBookOpen } from 'react-icons/fi';
import SEO from '../components/SEO';
import { newsletterService } from '../services/api';

const PageWrap = styled.div`
  padding-top: 120px;

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    padding-top: 80px;
  }
`;

/* ─── Featured Hero ─── */
const FeaturedHero = styled.section`
  position: relative;
  background: ${(p) => p.theme.colors.primary[900]};
  color: ${(p) => p.theme.colors.white};
  overflow: hidden;
`;

const FeaturedInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(p) => p.theme.spacing[10]} ${(p) => p.theme.spacing[4]} ${(p) => p.theme.spacing[12]};

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    padding: ${(p) => p.theme.spacing[8]} ${(p) => p.theme.spacing[4]} ${(p) => p.theme.spacing[10]};
  }

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    padding: ${(p) => p.theme.spacing[6]} ${(p) => p.theme.spacing[3]} ${(p) => p.theme.spacing[8]};
  }
`;

const FeaturedLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${(p) => p.theme.spacing[6]};

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    margin-bottom: ${(p) => p.theme.spacing[4]};
  }

  h2 {
    font-family: ${(p) => p.theme.fonts.secondary};
    font-size: ${(p) => p.theme.fontSizes['4xl']};
    font-weight: ${(p) => p.theme.fontWeights.normal};
    color: ${(p) => p.theme.colors.white};
    margin: 0;
    letter-spacing: -0.01em;

    @media (max-width: ${(p) => p.theme.breakpoints.md}) {
      font-size: ${(p) => p.theme.fontSizes['3xl']};
    }

    @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
      font-size: ${(p) => p.theme.fontSizes['2xl']};
    }
  }
`;

const AccentLine = styled.div`
  height: 3px;
  background: ${(p) => p.theme.colors.primary[400]};
  margin-bottom: ${(p) => p.theme.spacing[8]};

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    margin-bottom: ${(p) => p.theme.spacing[5]};
  }
`;

const FeaturedCard = styled(motion(Link))`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  min-height: 340px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: transform ${(p) => p.theme.transitions.normal};

  &:hover {
    transform: translateY(-3px);
  }

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    min-height: auto;
    gap: ${(p) => p.theme.spacing[5]};
  }

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    gap: ${(p) => p.theme.spacing[4]};
  }
`;

const FeaturedText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: ${(p) => p.theme.spacing[10]};

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    padding-right: 0;
    padding-bottom: ${(p) => p.theme.spacing[6]};
    order: 2;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    padding-bottom: ${(p) => p.theme.spacing[4]};
  }
`;

const FeaturedTag = styled.span`
  display: inline-block;
  font-size: ${(p) => p.theme.fontSizes.xs};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: ${(p) => p.theme.colors.primary[300]};
  margin-bottom: ${(p) => p.theme.spacing[3]};

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    margin-bottom: ${(p) => p.theme.spacing[2]};
    font-size: 10px;
  }
`;

const FeaturedTitle = styled.h3`
  font-family: ${(p) => p.theme.fonts.secondary};
  font-size: clamp(1.35rem, 2.4vw, ${(p) => p.theme.fontSizes['3xl']});
  font-weight: ${(p) => p.theme.fontWeights.bold};
  line-height: 1.25;
  color: ${(p) => p.theme.colors.white};
  margin: 0 0 auto;
  border-bottom: 2px solid ${(p) => p.theme.colors.primary[400]};
  padding-bottom: ${(p) => p.theme.spacing[4]};

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    font-size: ${(p) => p.theme.fontSizes['2xl']};
    margin: 0;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    font-size: ${(p) => p.theme.fontSizes.lg};
    padding-bottom: ${(p) => p.theme.spacing[3]};
    line-height: 1.35;
  }
`;

const FeaturedSubline = styled.p`
  font-size: ${(p) => p.theme.fontSizes.base};
  color: ${(p) => p.theme.colors.primary[200]};
  line-height: 1.6;
  margin: ${(p) => p.theme.spacing[4]} 0 0;

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    font-size: ${(p) => p.theme.fontSizes.sm};
    margin-top: ${(p) => p.theme.spacing[3]};
  }
`;

const FeaturedDate = styled.span`
  display: block;
  margin-top: ${(p) => p.theme.spacing[4]};
  font-size: ${(p) => p.theme.fontSizes.xs};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${(p) => p.theme.colors.gray[400]};

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    margin-top: ${(p) => p.theme.spacing[3]};
  }
`;

const FeaturedImage = styled.div`
  position: relative;
  border-radius: ${(p) => p.theme.borderRadius.lg};
  overflow: hidden;
  min-height: 280px;

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    min-height: 0;
    order: 1;
    aspect-ratio: 16 / 9;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    border-radius: ${(p) => p.theme.borderRadius.md};
    aspect-ratio: 16 / 10;
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/* ─── Category Cards Section ─── */
const CardsSection = styled.section`
  padding: ${(p) => p.theme.spacing[16]} 0;
  background: ${(p) => p.theme.colors.gray[50]};

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    padding: ${(p) => p.theme.spacing[10]} 0;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    padding: ${(p) => p.theme.spacing[8]} 0;
  }
`;

const CardsHeader = styled.div`
  text-align: center;
  max-width: 680px;
  margin: 0 auto ${(p) => p.theme.spacing[10]};
  padding: 0 ${(p) => p.theme.spacing[4]};

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    margin-bottom: ${(p) => p.theme.spacing[6]};
  }

  h2 {
    font-family: ${(p) => p.theme.fonts.secondary};
    font-size: ${(p) => p.theme.fontSizes['4xl']};
    font-weight: ${(p) => p.theme.fontWeights.extrabold};
    color: ${(p) => p.theme.colors.primary[800]};
    margin: 0 0 ${(p) => p.theme.spacing[4]};
    letter-spacing: -0.01em;

    @media (max-width: ${(p) => p.theme.breakpoints.md}) {
      font-size: ${(p) => p.theme.fontSizes['3xl']};
    }

    @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
      font-size: ${(p) => p.theme.fontSizes['2xl']};
      margin-bottom: ${(p) => p.theme.spacing[2]};
    }
  }

  p {
    font-size: ${(p) => p.theme.fontSizes.lg};
    color: ${(p) => p.theme.colors.gray[600]};
    line-height: 1.6;
    margin: 0;

    @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
      font-size: ${(p) => p.theme.fontSizes.base};
    }
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(p) => p.theme.spacing[8]};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${(p) => p.theme.spacing[4]};

  @media (max-width: ${(p) => p.theme.breakpoints.lg}) {
    gap: ${(p) => p.theme.spacing[6]};
  }

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    max-width: 520px;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    gap: ${(p) => p.theme.spacing[4]};
    padding: 0 ${(p) => p.theme.spacing[3]};
  }
`;

const CategoryCard = styled(motion(Link))`
  background: ${(p) => p.theme.colors.white};
  border: 1px solid ${(p) => p.theme.colors.gray[200]};
  border-radius: ${(p) => p.theme.borderRadius['2xl']};
  padding: ${(p) => p.theme.spacing[8]};
  display: flex;
  flex-direction: column;
  transition: all 0.25s ease;
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    padding: ${(p) => p.theme.spacing[5]};
    border-radius: ${(p) => p.theme.borderRadius.xl};
  }

  &:hover {
    box-shadow: ${(p) => p.theme.shadows.lg};
    transform: translateY(-4px);
    border-color: ${(p) => p.theme.colors.primary[200]};
  }
`;

const CardIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${(p) => p.theme.borderRadius.xl};
  background: ${(p) => p.theme.colors.primary[50]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(p) => p.theme.spacing[5]};

  svg {
    font-size: 26px;
    color: ${(p) => p.theme.colors.primary[600]};
  }
`;

const CardTitle = styled.h3`
  font-family: ${(p) => p.theme.fonts.secondary};
  font-size: ${(p) => p.theme.fontSizes['2xl']};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  color: ${(p) => p.theme.colors.primary[800]};
  margin: 0 0 ${(p) => p.theme.spacing[3]};

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    font-size: ${(p) => p.theme.fontSizes.xl};
    margin-bottom: ${(p) => p.theme.spacing[2]};
  }
`;

const CardDesc = styled.p`
  font-size: ${(p) => p.theme.fontSizes.base};
  color: ${(p) => p.theme.colors.gray[600]};
  line-height: 1.7;
  margin: 0 0 auto;
  padding-bottom: ${(p) => p.theme.spacing[6]};

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    font-size: ${(p) => p.theme.fontSizes.sm};
    padding-bottom: ${(p) => p.theme.spacing[4]};
    line-height: 1.6;
  }
`;

const CardLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing[2]};
  color: ${(p) => p.theme.colors.primary[600]};
  font-weight: ${(p) => p.theme.fontWeights.semibold};
  font-size: ${(p) => p.theme.fontSizes.sm};
  text-decoration: none;
  transition: all ${(p) => p.theme.transitions.fast};
  margin-top: auto;

  svg {
    transition: transform ${(p) => p.theme.transitions.fast};
  }

  &:hover {
    color: ${(p) => p.theme.colors.primary[700]};
    svg {
      transform: translateX(4px);
    }
  }
`;

/* ─── Newsletter / Subscribe Section ─── */
const SubscribeSection = styled.section`
  padding: ${(p) => p.theme.spacing[16]} 0;
  background: ${(p) => p.theme.colors.gray[50]};

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    padding: ${(p) => p.theme.spacing[10]} 0;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    padding: ${(p) => p.theme.spacing[6]} 0;
  }
`;

const SubscribeInner = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 0 ${(p) => p.theme.spacing[4]};
  scroll-margin-top: 140px;

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    padding: 0 ${(p) => p.theme.spacing[3]};
  }
`;

const SubscribeCard = styled.div`
  background: linear-gradient(
    135deg,
    ${(p) => p.theme.colors.primary[800]} 0%,
    ${(p) => p.theme.colors.primary[900]} 100%
  );
  border-radius: ${(p) => p.theme.borderRadius['2xl']};
  padding: ${(p) => p.theme.spacing[12]} ${(p) => p.theme.spacing[10]};
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -60%;
    right: -20%;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(20, 184, 166, 0.12) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    padding: ${(p) => p.theme.spacing[8]} ${(p) => p.theme.spacing[4]};
    border-radius: ${(p) => p.theme.borderRadius.xl};
  }

  h2 {
    font-family: ${(p) => p.theme.fonts.secondary};
    font-size: ${(p) => p.theme.fontSizes['3xl']};
    font-weight: ${(p) => p.theme.fontWeights.bold};
    color: ${(p) => p.theme.colors.white};
    margin: 0 0 ${(p) => p.theme.spacing[3]};
    position: relative;

    @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
      font-size: ${(p) => p.theme.fontSizes['2xl']};
    }
  }

  p {
    font-size: ${(p) => p.theme.fontSizes.base};
    color: ${(p) => p.theme.colors.primary[200]};
    line-height: 1.6;
    margin: 0 0 ${(p) => p.theme.spacing[8]};
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    position: relative;

    @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
      font-size: ${(p) => p.theme.fontSizes.sm};
      margin-bottom: ${(p) => p.theme.spacing[6]};
    }
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  align-items: center;
  max-width: 480px;
  margin: 0 auto;
  border-radius: ${(p) => p.theme.borderRadius.full};
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.08);
  padding: 5px;
  position: relative;
  transition: border-color ${(p) => p.theme.transitions.fast},
    box-shadow ${(p) => p.theme.transitions.fast};

  &:focus-within {
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
  }

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    flex-direction: column;
    border-radius: ${(p) => p.theme.borderRadius.xl};
    padding: 4px;
  }

  input {
    flex: 1;
    padding: ${(p) => p.theme.spacing[3]} ${(p) => p.theme.spacing[5]};
    border: none;
    background: transparent;
    color: ${(p) => p.theme.colors.white};
    font-size: ${(p) => p.theme.fontSizes.base};
    min-width: 0;
    -webkit-appearance: none;
    appearance: none;
    border-radius: ${(p) => p.theme.borderRadius.full};

    &::placeholder {
      color: rgba(255, 255, 255, 0.45);
    }

    &:focus {
      outline: none;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
      -webkit-text-fill-color: #fff;
      -webkit-box-shadow: 0 0 0 100px ${(p) => p.theme.colors.primary[800]} inset;
      box-shadow: 0 0 0 100px ${(p) => p.theme.colors.primary[800]} inset;
      caret-color: #fff;
      border-radius: ${(p) => p.theme.borderRadius.full};
    }

    @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
      padding: ${(p) => p.theme.spacing[3]} ${(p) => p.theme.spacing[4]};
      text-align: center;
    }
  }

  button {
    background: ${(p) => p.theme.colors.white};
    color: ${(p) => p.theme.colors.primary[800]};
    border: none;
    padding: ${(p) => p.theme.spacing[3]} ${(p) => p.theme.spacing[7]};
    border-radius: ${(p) => p.theme.borderRadius.full};
    font-weight: ${(p) => p.theme.fontWeights.semibold};
    font-size: ${(p) => p.theme.fontSizes.base};
    cursor: pointer;
    white-space: nowrap;
    transition: all ${(p) => p.theme.transitions.fast};
    flex-shrink: 0;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background: ${(p) => p.theme.colors.primary[50]};
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
      width: 100%;
      border-radius: ${(p) => p.theme.borderRadius.lg};
    }
  }
`;

const MessageBanner = styled.div`
  margin-top: ${(p) => p.theme.spacing[4]};
  padding: ${(p) => p.theme.spacing[3]} ${(p) => p.theme.spacing[4]};
  border-radius: ${(p) => p.theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.spacing[3]};
  font-size: ${(p) => p.theme.fontSizes.sm};
  max-width: 460px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  ${(p) =>
    p.$type === 'success'
      ? `background: rgba(20, 184, 166, 0.15); color: ${p.theme.colors.primary[200]}; border: 1px solid rgba(20, 184, 166, 0.3);`
      : `background: rgba(239, 68, 68, 0.15); color: #fca5a5; border: 1px solid rgba(239, 68, 68, 0.3);`}
`;

/* ─── Explore Resources Section ─── */
const ResourcesSection = styled.section`
  padding: ${(p) => p.theme.spacing[16]} 0;
  background: ${(p) => p.theme.colors.white};

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    padding: ${(p) => p.theme.spacing[10]} 0;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    padding: ${(p) => p.theme.spacing[8]} 0;
  }
`;

const ResourcesHeader = styled.div`
  text-align: center;
  max-width: 680px;
  margin: 0 auto ${(p) => p.theme.spacing[10]};
  padding: 0 ${(p) => p.theme.spacing[4]};

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    margin-bottom: ${(p) => p.theme.spacing[6]};
  }

  h2 {
    font-family: ${(p) => p.theme.fonts.secondary};
    font-size: ${(p) => p.theme.fontSizes['4xl']};
    font-weight: ${(p) => p.theme.fontWeights.extrabold};
    color: ${(p) => p.theme.colors.primary[800]};
    margin: 0 0 ${(p) => p.theme.spacing[4]};
    letter-spacing: -0.01em;

    @media (max-width: ${(p) => p.theme.breakpoints.md}) {
      font-size: ${(p) => p.theme.fontSizes['3xl']};
    }

    @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
      font-size: ${(p) => p.theme.fontSizes['2xl']};
      margin-bottom: ${(p) => p.theme.spacing[2]};
    }
  }

  p {
    font-size: ${(p) => p.theme.fontSizes.lg};
    color: ${(p) => p.theme.colors.gray[600]};
    line-height: 1.6;
    margin: 0;

    @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
      font-size: ${(p) => p.theme.fontSizes.base};
    }
  }
`;

const ResourcesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(p) => p.theme.spacing[6]};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${(p) => p.theme.spacing[4]};

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    max-width: 520px;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    gap: ${(p) => p.theme.spacing[3]};
    padding: 0 ${(p) => p.theme.spacing[3]};
  }
`;

const ResourceCard = styled(motion(Link))`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing[4]};
  padding: ${(p) => p.theme.spacing[6]};

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    padding: ${(p) => p.theme.spacing[4]};
    gap: ${(p) => p.theme.spacing[3]};
  }
  background: ${(p) => p.theme.colors.gray[50]};
  border: 1px solid ${(p) => p.theme.colors.gray[200]};
  border-radius: ${(p) => p.theme.borderRadius.xl};
  text-decoration: none;
  color: inherit;
  transition: all 0.25s ease;

  &:hover {
    background: ${(p) => p.theme.colors.primary[50]};
    border-color: ${(p) => p.theme.colors.primary[200]};
    box-shadow: ${(p) => p.theme.shadows.md};
    transform: translateY(-2px);
  }
`;

const ResourceIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${(p) => p.theme.borderRadius.lg};
  background: ${(p) => p.theme.colors.primary[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 22px;
    color: ${(p) => p.theme.colors.primary[700]};
  }
`;

const ResourceInfo = styled.div`
  h3 {
    font-family: ${(p) => p.theme.fonts.secondary};
    font-size: ${(p) => p.theme.fontSizes.lg};
    font-weight: ${(p) => p.theme.fontWeights.bold};
    color: ${(p) => p.theme.colors.primary[800]};
    margin: 0 0 ${(p) => p.theme.spacing[1]};
  }

  p {
    font-size: ${(p) => p.theme.fontSizes.sm};
    color: ${(p) => p.theme.colors.gray[500]};
    margin: 0;
    line-height: 1.5;
  }
`;

/* ─── Search Insights Section ─── */
const SearchSection = styled.section`
  padding: ${(p) => p.theme.spacing[12]} 0;
  background: ${(p) => p.theme.colors.primary[800]};

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    padding: ${(p) => p.theme.spacing[10]} 0;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    padding: ${(p) => p.theme.spacing[8]} 0;
  }
`;

const SearchInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${(p) => p.theme.spacing[6]};

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    padding: 0 ${(p) => p.theme.spacing[4]};
  }
`;

const SearchCTA = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing[4]};
  text-decoration: none;
  padding-bottom: ${(p) => p.theme.spacing[4]};
  border-bottom: 2px solid ${(p) => p.theme.colors.primary[400]};
  transition: all ${(p) => p.theme.transitions.normal};

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    gap: ${(p) => p.theme.spacing[3]};
    padding-bottom: ${(p) => p.theme.spacing[3]};
  }

  span {
    font-family: ${(p) => p.theme.fonts.secondary};
    font-size: clamp(1.25rem, 3vw, 2.5rem);
    font-weight: ${(p) => p.theme.fontWeights.normal};
    color: ${(p) => p.theme.colors.primary[100]};
    letter-spacing: -0.01em;
    transition: color ${(p) => p.theme.transitions.fast};
  }

  svg {
    font-size: clamp(1rem, 2vw, 1.75rem);
    color: ${(p) => p.theme.colors.primary[300]};
    flex-shrink: 0;
    transition: transform ${(p) => p.theme.transitions.fast},
      color ${(p) => p.theme.transitions.fast};
  }

  &:hover {
    border-bottom-color: ${(p) => p.theme.colors.white};
    span { color: ${(p) => p.theme.colors.white}; }
    svg {
      color: ${(p) => p.theme.colors.white};
      transform: translateX(4px);
    }
  }
`;

/* ─── Data ─── */
const resources = [
  { icon: FiTool, title: 'Valuation Tools', desc: 'Business & IP valuation calculators', to: '/calculator' },
  { icon: FiLayout, title: 'Financial Templates', desc: 'Ready-to-use financial models & templates', to: '/templates' },
  { icon: FiBookOpen, title: 'Blog & Articles', desc: 'Expert commentary and analysis', to: '/blog' },
];

const categories = [
  {
    id: 'market-insights',
    icon: FiTrendingUp,
    title: 'Market Insights',
    desc: 'Macro trends, sector performance, and capital-market commentary distilled into actionable intelligence for decision-makers.',
  },
  {
    id: 'deal-spotlights',
    icon: FiTarget,
    title: 'Deal Spotlights',
    desc: 'Breakdowns of notable transactions — valuations, deal structures, and strategic rationale behind M&A, IPOs, and private placements.',
  },
  {
    id: 'advisory-briefs',
    icon: FiFileText,
    title: 'Advisory Briefs',
    desc: 'Concise primers on regulatory changes, valuation methodologies, and best practices from our advisory team.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: 'easeOut' },
  }),
};

/* ─── Component ─── */
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
      requestAnimationFrame(() =>
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      );
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

  const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = async (e) => {
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
      const res = await newsletterService.subscribe(email);
      setMessage({ type: 'success', text: res.message });
      setEmail('');
    } catch (err) {
      let text = 'Failed to subscribe. Please try again.';
      if (err.message?.includes('Network Error') || err.message?.includes('ECONNREFUSED')) {
        text = 'Unable to connect to server. Please try again later.';
      } else if (err.message) {
        text = err.message;
      }
      setMessage({ type: 'error', text });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <PageWrap>
      <SEO
        title="YD Deal Desk"
        description="YD Advisory Deal Desk — market insights, deal spotlights, and advisory briefs for founders, investors, and transaction teams."
        keywords="deal desk, market insights, M&A, valuation, advisory briefs, YD Advisory"
      />

      {/* ── Featured Hero ── */}
      <FeaturedHero>
        <FeaturedInner>
          <FeaturedLabel>
            <motion.h2
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
            >
              YD Deal Desk
            </motion.h2>
          </FeaturedLabel>

          <AccentLine />

          <FeaturedCard
            to="/deal-desk/geopolitical-finance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <FeaturedText>
              <FeaturedTag>Market Intelligence Report</FeaturedTag>
              <FeaturedTitle>
                Middle East Transaction Landscape and Private Capital Market Update
              </FeaturedTitle>
              <FeaturedSubline>
                The Gulf has quietly become the marginal funder of global dealmaking.
              </FeaturedSubline>
              <FeaturedDate>JULY 2026 | EDITION 01</FeaturedDate>
            </FeaturedText>

            <FeaturedImage>
              <img
                src="/images/imagesfordealdesk.png"
                alt="YD Deal Desk — Middle East Transaction Landscape and Private Capital Market Update"
              />
            </FeaturedImage>
          </FeaturedCard>
        </FeaturedInner>
      </FeaturedHero>

      {/* ── 3 Category Cards ── */}
      <CardsSection>
        <CardsHeader>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
          >
            What We Cover
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            Three lenses through which our deal desk delivers insight to your inbox.
          </motion.p>
        </CardsHeader>

        <CardsGrid>
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              to={`/deal-desk/${cat.id}`}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={cardVariants}
            >
              <CardIcon>
                <cat.icon />
              </CardIcon>
              <CardTitle>{cat.title}</CardTitle>
              <CardDesc>{cat.desc}</CardDesc>
              <CardLink as="span">
                Learn more <FiArrowRight />
              </CardLink>
            </CategoryCard>
          ))}
        </CardsGrid>
      </CardsSection>

      {/* ── Explore Our Resources ── */}
      <ResourcesSection>
        <ResourcesHeader>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4 }}
          >
            Explore Our Resources
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            Tools, templates, and thought leadership to support your financial decisions.
          </motion.p>
        </ResourcesHeader>

        <ResourcesGrid>
          {resources.map((res, i) => (
            <ResourceCard
              key={res.title}
              to={res.to}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
            >
              <ResourceIcon>
                <res.icon />
              </ResourceIcon>
              <ResourceInfo>
                <h3>{res.title}</h3>
                <p>{res.desc}</p>
              </ResourceInfo>
            </ResourceCard>
          ))}
        </ResourcesGrid>
      </ResourcesSection>

      {/* ── Newsletter Subscribe ── */}
      <SubscribeSection id="newsletter">
        <SubscribeInner>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45 }}
          >
            <SubscribeCard>
              <h2>Stay in the Loop</h2>
              <p>
                Subscribe to the YD Deal Desk digest — market insights, deal
                spotlights, and advisory briefs delivered biweekly.
              </p>
              <NewsletterForm onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  placeholder="Your work email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  disabled={isLoading}
                  required
                  aria-label="Email for deal desk newsletter"
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
                    aria-label="Dismiss"
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
            </SubscribeCard>
          </motion.div>
        </SubscribeInner>
      </SubscribeSection>

      {/* ── Search Insights ── */}
      <SearchSection>
        <SearchInner>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <SearchCTA to="/blog">
              <span>Search all insights</span>
              <FiArrowRight />
            </SearchCTA>
          </motion.div>
        </SearchInner>
      </SearchSection>
    </PageWrap>
  );
};

export default DealDesk;
