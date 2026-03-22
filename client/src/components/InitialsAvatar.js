import React from 'react';
import styled, { css } from 'styled-components';

/** Brand tokens — mint/teal vs premium monogram (cream ring + charcoal forest + gold) */
const CREAM = '#fdfcf8';
const GOLD = '#c5a059';
/** Muted metallic gold for monogram (serif) */
const GOLD_MONOGRAM = '#c9a96a';

/** Thin cream outer band — concentric with inner green (luxury / academic seal look) */
const FOREST_GOLD_RING = 5;

/* Light / card variant — ref: pale mint #F2F9F8, 1px seafoam ring, #1B3D36 serif */
const mintStyles = css`
  background: #f2f9f8;
  border: 1px solid #5eead4;
  color: #1b3d36;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.95) inset,
    0 8px 22px rgba(27, 61, 54, 0.09),
    0 3px 10px rgba(20, 184, 166, 0.07);
`;

const sealStyles = css`
  background: linear-gradient(165deg, #1f3428 0%, #1a2e22 45%, #152a1f 100%);
  border: 2px solid ${CREAM};
  color: ${GOLD};
  box-shadow:
    0 0 0 3px ${CREAM},
    0 0 0 4px rgba(26, 46, 34, 0.35),
    0 16px 44px rgba(0, 0, 0, 0.35);
`;

/** Stacked seal — white ring separates overlaps; forest + gold; soft lift */
const sealCompactStyles = css`
  background: linear-gradient(165deg, #1f3428 0%, #1a2e22 100%);
  border: 2px solid #ffffff;
  color: ${GOLD};
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.06),
    0 6px 16px rgba(27, 48, 34, 0.22);
`;

/** Outer cream disc — thin ring framing charcoal-green monogram */
const ForestGoldOuter = styled.div`
  border-radius: 50%;
  background: ${CREAM};
  border: 1px solid rgba(197, 169, 106, 0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-sizing: border-box;
  padding: ${p => p.$ring}px;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.65) inset,
    0 14px 36px rgba(15, 22, 18, 0.14),
    0 4px 12px rgba(0, 0, 0, 0.06);

  ${p =>
    p.$fill
      ? css`
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;
        `
      : css`
          width: ${p.$size + 2 * p.$ring}px;
          height: ${p.$size + 2 * p.$ring}px;
        `}
`;

const ForestGoldInner = styled.div`
  border-radius: 50%;
  background: linear-gradient(155deg, #1c2e24 0%, #141f18 48%, #101812 100%);
  border: 1px solid rgba(0, 0, 0, 0.35);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.06) inset;
  color: ${GOLD_MONOGRAM};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${p => p.theme.fonts.secondary};
  font-weight: ${p => p.theme.fontWeights.bold};
  letter-spacing: 0.08em;
  -webkit-font-smoothing: antialiased;
  line-height: 1;
  text-transform: uppercase;
  user-select: none;
  box-sizing: border-box;

  ${p =>
    p.$fill
      ? css`
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;
          /* Slightly smaller monogram in hero; stays flex-centered */
          font-size: clamp(1.45rem, 8vw, 2.15rem);
        `
      : css`
          width: ${p.$size}px;
          height: ${p.$size}px;
          /* Slightly small relative to inner circle; centered via flex */
          font-size: ${p.$size * 0.36}px;
        `}

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    ${p =>
      p.$fill &&
      css`
        font-size: clamp(1.25rem, 9vw, 1.85rem);
      `}
  }
`;

const Ring = styled.div`
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: ${p => p.theme.fonts.secondary};
  font-weight: ${p => p.theme.fontWeights.bold};
  letter-spacing: 0.05em;
  -webkit-font-smoothing: antialiased;
  line-height: 1;
  text-transform: uppercase;
  user-select: none;
  flex-shrink: 0;
  box-sizing: border-box;

  ${p =>
    p.$variant === 'seal' && p.$compact
      ? sealCompactStyles
      : p.$variant === 'seal'
        ? sealStyles
        : mintStyles}

  ${p =>
    p.$fill
      ? css`
          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;
          font-size: clamp(1.85rem, 10vw, 2.75rem);
        `
      : css`
          width: ${p.$size}px;
          height: ${p.$size}px;
          font-size: ${p.$size * 0.38}px;
        `}

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    ${p =>
      p.$fill &&
      css`
        font-size: clamp(1.5rem, 12vw, 2.25rem);
      `}
  }
`;

/**
 * Circular initials badge — `mint` (pale + teal), `forestGold` (charcoal forest + gold + cream ring),
 * `seal` / compact `seal` for hero / stacks.
 */
function InitialsAvatar({
  initials,
  variant = 'mint',
  size = 88,
  fill = false,
  compact = false,
  className,
  'aria-label': ariaLabel,
  ...rest
}) {
  if (variant === 'forestGold') {
    return (
      <ForestGoldOuter
        $ring={FOREST_GOLD_RING}
        $size={size}
        $fill={fill}
        className={className}
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : true}
        {...rest}
      >
        <ForestGoldInner $size={size} $fill={fill}>{initials}</ForestGoldInner>
      </ForestGoldOuter>
    );
  }

  return (
    <Ring
      $variant={variant}
      $size={size}
      $fill={fill}
      $compact={compact}
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      {...rest}
    >
      {initials}
    </Ring>
  );
}

export default InitialsAvatar;
