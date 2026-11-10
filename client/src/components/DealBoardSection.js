import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import {
  dealBoardMeta,
  getFeaturedDeals,
  getDealInterestMail,
  getSubmitDealMail,
  getInvestorAccessMail,
  getDealFilterOptions,
  filterDeals,
  AMOUNT_FILTERS,
} from '../data/dealBoard';
import { openMailto, handleInteractiveLink } from '../utils/linkHelpers';

const Section = styled.section`
  padding: ${p => p.theme.spacing[16]} 0;
  background: ${p => p.theme.colors.gray[50]};
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${p => p.theme.spacing[4]};

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    padding: 0 ${p => p.theme.spacing[3]};
  }
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: ${p => (p.$centered ? '1fr' : 'minmax(0, 1.5fr) auto')};
  gap: ${p => p.theme.spacing[6]};
  align-items: ${p => (p.$centered ? 'center' : 'end')};
  justify-items: ${p => (p.$centered ? 'center' : 'stretch')};
  text-align: ${p => (p.$centered ? 'center' : 'left')};
  margin-bottom: ${p => p.theme.spacing[10]};

  @media (max-width: ${p => p.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    justify-items: ${p => (p.$centered ? 'center' : 'start')};
    text-align: ${p => (p.$centered ? 'center' : 'left')};
  }
`;

const HeaderCopy = styled.div`
  width: 100%;
  max-width: ${p => (p.$centered ? '1100px' : '100%')};
`;

const Eyebrow = styled.div`
  margin-bottom: ${p => p.theme.spacing[3]};
  color: ${p => p.theme.colors.primary[700]};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 0 0 ${p => p.theme.spacing[3]};
  font-size: clamp(1.85rem, 3.4vw, 2.75rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: ${p => p.theme.colors.primary[900]};
  font-weight: 700;
`;

const Intro = styled.div`
  margin: 0;
  max-width: ${p => (p.$centered ? '100%' : '640px')};
  margin-left: ${p => (p.$centered ? 'auto' : '0')};
  margin-right: ${p => (p.$centered ? 'auto' : '0')};
  color: ${p => p.theme.colors.gray[600]};
  font-size: ${p => p.theme.fontSizes.lg};
  line-height: 1.65;
`;

const IntroLine = styled.span`
  display: block;

  ${p =>
    p.$nowrap
      ? `
    white-space: nowrap;

    @media (max-width: ${p.theme.breakpoints.lg}) {
      white-space: normal;
    }
  `
      : ''}
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
  align-self: end;

  @media (max-width: ${p => p.theme.breakpoints.lg}) {
    justify-content: flex-start;
  }
`;

const Filters = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)) auto;
  gap: 0.85rem;
  align-items: end;
  margin: 0 0 ${p => p.theme.spacing[8]};
  padding: 1rem 1.1rem;
  background: #fff;
  border: 1px solid ${p => p.theme.colors.gray[200]};
  border-radius: 14px;

  @media (max-width: ${p => p.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${p => p.theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FilterField = styled.label`
  display: grid;
  gap: 0.4rem;
  text-align: left;
  min-width: 0;

  span {
    color: ${p => p.theme.colors.gray[500]};
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  select {
    width: 100%;
    appearance: none;
    background: ${p => p.theme.colors.gray[50]}
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23475569' d='M1.4.6 6 5.2 10.6.6 12 2 6 8 0 2z'/%3E%3C/svg%3E")
      no-repeat right 0.9rem center / 10px;
    border: 1px solid ${p => p.theme.colors.gray[300]};
    border-radius: 10px;
    color: ${p => p.theme.colors.primary[900]};
    font-size: 0.92rem;
    font-weight: 600;
    line-height: 1.3;
    padding: 0.78rem 2.2rem 0.78rem 0.9rem;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: ${p => p.theme.colors.primary[500]};
      box-shadow: 0 0 0 3px ${p => p.theme.colors.primary[100]};
    }
  }
`;

const ClearFilters = styled.button`
  height: 2.85rem;
  padding: 0 1rem;
  border: 1px solid ${p => p.theme.colors.gray[300]};
  border-radius: 10px;
  background: #fff;
  color: ${p => p.theme.colors.primary[800]};
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: border-color 0.2s ease, background 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${p => p.theme.colors.primary[400]};
    background: ${p => p.theme.colors.primary[50]};
  }

  &:disabled {
    opacity: 0.45;
    cursor: default;
  }

  @media (max-width: ${p => p.theme.breakpoints.lg}) {
    justify-self: start;
  }
`;

const FilterMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin: -0.35rem 0 ${p => p.theme.spacing[5]};
  color: ${p => p.theme.colors.gray[500]};
  font-size: 0.88rem;
`;

const EmptyState = styled.div`
  padding: 2.5rem 1.25rem;
  border: 1px dashed ${p => p.theme.colors.gray[300]};
  border-radius: 14px;
  background: #fff;
  text-align: center;
  color: ${p => p.theme.colors.gray[600]};
  font-size: 0.98rem;
  line-height: 1.55;
`;

const PrimaryAction = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.25rem;
  border-radius: 10px;
  background: ${p => p.theme.colors.primary[800]};
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.92rem;
  letter-spacing: 0.02em;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${p => p.theme.colors.primary[900]};
    color: #fff;
    transform: translateY(-1px);
  }
`;

const SecondaryAction = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.9rem 1.25rem;
  border-radius: 10px;
  background: #fff;
  color: ${p => p.theme.colors.primary[900]};
  border: 1px solid ${p => p.theme.colors.gray[300]};
  font-weight: 600;
  font-size: 0.92rem;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;

  &:hover {
    border-color: ${p => p.theme.colors.primary[400]};
    background: ${p => p.theme.colors.primary[50]};
    transform: translateY(-1px);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${p => p.theme.spacing[6]};

  @media (max-width: ${p => p.theme.breakpoints.lg}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${p => p.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.article)`
  background: #fff;
  border: 1px solid ${p => p.theme.colors.gray[200]};
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
  padding: ${p => (p.$hasImage ? '0 0 1.35rem' : '1.5rem 1.4rem 1.35rem')};
  display: flex;
  flex-direction: column;
  min-height: 100%;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(15, 23, 42, 0.1);
  }

  &:hover .deal-card-image {
    transform: scale(1.05);
  }

  &:hover .deal-image-popup {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`;

const CardMedia = styled(motion.div)`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: ${p => p.theme.colors.gray[100]};
  margin-bottom: 1rem;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transform: scale(1);
    transition: transform 0.55s ease;
  }
`;

const ImagePopup = styled.div`
  position: absolute;
  left: 0.75rem;
  right: 0.75rem;
  bottom: 0.75rem;
  z-index: 2;
  padding: 0.85rem 0.95rem;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(8px);
  color: #fff;
  opacity: 0;
  transform: translateY(10px);
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s ease;

  strong {
    display: block;
    margin-bottom: 0.35rem;
    font-size: 0.92rem;
    line-height: 1.35;
    font-weight: 700;
  }

  span {
    display: block;
    color: rgba(241, 245, 249, 0.86);
    font-size: 0.78rem;
    line-height: 1.4;
  }

  em {
    display: inline-block;
    margin-top: 0.45rem;
    color: ${p => p.theme.colors.primary[200]};
    font-size: 0.72rem;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
`;

const CardBody = styled(motion.div)`
  padding: ${p => (p.$hasImage ? '0 1.4rem' : '0')};
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const DealId = styled.div`
  color: ${p => p.theme.colors.primary[700]};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.65rem;
`;

const CardTitle = styled.h3`
  margin: 0 0 0.65rem;
  color: ${p => p.theme.colors.primary[900]};
  font-size: 1.15rem;
  line-height: 1.35;
  font-weight: 700;
  min-height: 2.7em;
`;

const Status = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 0.28rem 0.55rem;
  border: 1px solid ${p => p.theme.colors.primary[300]};
  border-radius: 6px;
  background: ${p => p.theme.colors.primary[50]};
  color: ${p => p.theme.colors.primary[700]};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 0.85rem;
`;

const Description = styled.p`
  margin: 0 0 1rem;
  color: ${p => p.theme.colors.gray[600]};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const Meta = styled.dl`
  margin: 0;
  display: grid;
  gap: 0.65rem;
`;

const MetaRow = styled.div`
  display: grid;
  grid-template-columns: 112px 1fr;
  gap: 0.75rem;
  align-items: start;

  dt {
    margin: 0;
    color: ${p => p.theme.colors.gray[500]};
    font-size: 0.82rem;
  }

  dd {
    margin: 0;
    color: ${p => p.theme.colors.primary[900]};
    font-size: 0.88rem;
    font-weight: 600;
    line-height: 1.35;
  }
`;

const WhyList = styled.ul`
  margin: 1rem 0 0;
  padding-left: 1.1rem;
  color: ${p => p.theme.colors.gray[600]};
  font-size: 0.86rem;
  line-height: 1.45;

  li + li {
    margin-top: 0.35rem;
  }
`;

const CardNote = styled.p`
  margin: 0.7rem 0 0;
  color: ${p => p.theme.colors.gray[500]};
  font-size: 0.75rem;
  line-height: 1.4;
`;

const CardActions = styled.div`
  margin-top: auto;
  padding-top: 1.15rem;
`;

const InterestButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  width: 100%;
  padding: 0.85rem 1rem;
  border: none;
  border-radius: 10px;
  background: ${p => p.theme.colors.primary[700]};
  color: #fff;
  font-weight: 600;
  font-size: 0.92rem;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${p => p.theme.colors.primary[800]};
    transform: translateY(-1px);
  }
`;

const FooterNote = styled.p`
  margin: ${p => p.theme.spacing[8]} auto 0;
  color: ${p => p.theme.colors.gray[500]};
  font-size: 0.85rem;
  line-height: 1.55;
  max-width: 860px;
  text-align: ${p => (p.$centered ? 'center' : 'left')};
`;

const openMail = (mail) => {
  openMailto(mail.email, { subject: mail.subject, body: mail.body });
};

const DealCard = ({ deal, index }) => {
  const mail = getDealInterestMail(deal);
  const hasImage = Boolean(deal.image);
  const stagger = Math.min(index, 2) * 0.05;
  const viewport = { once: true, amount: 0.12, margin: '60px 0px' };

  return (
    <Card
      $hasImage={hasImage}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.28, delay: stagger, ease: 'easeOut' }}
    >
      {hasImage && (
        <CardMedia
          initial={{ opacity: 0, scale: 1.06 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 0.45, delay: stagger + 0.04, ease: 'easeOut' }}
        >
          <img className="deal-card-image" src={deal.image} alt={deal.title} loading="lazy" />
          <ImagePopup className="deal-image-popup">
            <em>{deal.id}</em>
            <strong>{deal.title}</strong>
            <span>
              {deal.sector} · {deal.size}
            </span>
          </ImagePopup>
        </CardMedia>
      )}
      <CardBody
        $hasImage={hasImage}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{
          duration: 0.35,
          delay: stagger + (hasImage ? 0.26 : 0.08),
          ease: 'easeOut',
        }}
      >
        <DealId>{deal.id}</DealId>
        <CardTitle>{deal.title}</CardTitle>
        <Status>{deal.status}</Status>
        <Description>{deal.description}</Description>
        <Meta>
          <MetaRow>
            <dt>Location</dt>
            <dd>{deal.geography}</dd>
          </MetaRow>
          <MetaRow>
            <dt>Stage</dt>
            <dd>{deal.stage}</dd>
          </MetaRow>
          <MetaRow>
            <dt>Sector</dt>
            <dd>{deal.sector}</dd>
          </MetaRow>
          <MetaRow>
            <dt>Capital</dt>
            <dd>{deal.size}</dd>
          </MetaRow>
          <MetaRow>
            <dt>Instrument</dt>
            <dd>{deal.category}</dd>
          </MetaRow>
          {deal.useOfFunds ? (
            <MetaRow>
              <dt>Use of funds</dt>
              <dd>{deal.useOfFunds}</dd>
            </MetaRow>
          ) : null}
        </Meta>
        {deal.whyInvestable?.length > 0 && (
          <WhyList>
            {deal.whyInvestable.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </WhyList>
        )}
        <CardActions>
          <InterestButton
            type="button"
            onClick={(e) => handleInteractiveLink(e, () => openMail(mail))}
            onKeyDown={(e) => handleInteractiveLink(e, () => openMail(mail))}
          >
            Register Interest <FiArrowRight />
          </InterestButton>
          <CardNote>
            Indicative terms shown; full data room available under NDA.
          </CardNote>
        </CardActions>
      </CardBody>
    </Card>
  );
};

const DealBoardSection = ({
  deals: dealsProp,
  showActions = true,
  showDisclaimer = true,
  enableFilters = false,
  exploreTo = '/deal-board',
  title = dealBoardMeta.title,
  intro = dealBoardMeta.intro,
}) => {
  const sourceDeals = dealsProp || getFeaturedDeals();
  const submitMail = getSubmitDealMail();
  const investorMail = getInvestorAccessMail();
  const centered = !showActions;
  const [sector, setSector] = useState('all');
  const [amount, setAmount] = useState('all');
  const [location, setLocation] = useState('all');

  const options = useMemo(() => getDealFilterOptions(sourceDeals), [sourceDeals]);
  const items = useMemo(
    () =>
      enableFilters
        ? filterDeals(sourceDeals, { sector, amount, location })
        : sourceDeals,
    [enableFilters, sourceDeals, sector, amount, location]
  );
  const filtersActive = sector !== 'all' || amount !== 'all' || location !== 'all';

  const clearFilters = () => {
    setSector('all');
    setAmount('all');
    setLocation('all');
  };

  return (
    <Section aria-labelledby="deal-board-heading">
      <Inner>
        <HeaderRow $centered={centered}>
          <HeaderCopy $centered={centered}>
            <Eyebrow>{dealBoardMeta.eyebrow}</Eyebrow>
            <Title id="deal-board-heading">{title}</Title>
            <Intro $centered={centered}>
              {Array.isArray(intro) ? (
                intro.map((line, i) => (
                  <IntroLine key={i} $nowrap={centered}>
                    {line}
                  </IntroLine>
                ))
              ) : (
                intro
              )}
            </Intro>
          </HeaderCopy>

          {showActions && (
            <Actions>
              <PrimaryAction to={exploreTo}>
                Explore Deals <FiArrowRight />
              </PrimaryAction>
              <SecondaryAction
                type="button"
                onClick={(e) => handleInteractiveLink(e, () => openMail(submitMail))}
                onKeyDown={(e) => handleInteractiveLink(e, () => openMail(submitMail))}
              >
                Submit a Deal <FiArrowRight />
              </SecondaryAction>
              <SecondaryAction
                type="button"
                onClick={(e) => handleInteractiveLink(e, () => openMail(investorMail))}
                onKeyDown={(e) => handleInteractiveLink(e, () => openMail(investorMail))}
              >
                Request Access <FiArrowRight />
              </SecondaryAction>
            </Actions>
          )}
        </HeaderRow>

        {enableFilters && (
          <>
            <Filters role="search" aria-label="Filter deal board mandates">
              <FilterField>
                <span>Sector</span>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  aria-label="Filter by sector"
                >
                  <option value="all">All sectors</option>
                  {options.sectors.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </FilterField>

              <FilterField>
                <span>Amount</span>
                <select
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  aria-label="Filter by amount"
                >
                  {AMOUNT_FILTERS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </FilterField>

              <FilterField>
                <span>Location</span>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  aria-label="Filter by location"
                >
                  <option value="all">All locations</option>
                  {options.locations.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </FilterField>

              <ClearFilters
                type="button"
                onClick={clearFilters}
                disabled={!filtersActive}
              >
                Clear
              </ClearFilters>
            </Filters>

            <FilterMeta>
              <span>
                Showing {items.length} of {sourceDeals.length} mandates
              </span>
            </FilterMeta>
          </>
        )}

        {items.length > 0 ? (
          <Grid>
            {items.map((deal, index) => (
              <DealCard key={deal.id} deal={deal} index={index} />
            ))}
          </Grid>
        ) : (
          <EmptyState>
            No mandates match these filters. Clear one or more filters to see more deals.
          </EmptyState>
        )}

        {showDisclaimer && (
          <FooterNote $centered={centered}>{dealBoardMeta.disclaimer}</FooterNote>
        )}
      </Inner>
    </Section>
  );
};

export default DealBoardSection;
