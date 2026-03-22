import { css } from 'styled-components';

/**
 * Full-width hero background: teal gradient + cover image (inner pages, not Home).
 * @param {string} imageUrl - public path e.g. '/images/about-hero.jpg' or '/services.png'
 */
export const innerPageHeroBackground = (imageUrl = '/images/about-hero.jpg') => css`
  background: linear-gradient(
      135deg,
      ${props => props.theme.colors.primary[900]}cc 0%,
      ${props => props.theme.colors.primary[800]}b3 50%,
      #0a2a2ae6 100%
    ),
    url(${imageUrl}) center center / cover no-repeat;
`;
