// Cross-platform helpers to robustly open mail and tel intents

export function buildMailto(email, { subject = '', body = '' } = {}) {
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  const query = params.length ? `?${params.join('&')}` : '';
  return `mailto:${email}${query}`;
}

export function openMailto(email, options = {}) {
  const href = buildMailto(email, options);
  let handlerLikelyOpened = false;
  const previousHref = window.location.href;
  const cleanup = () => {
    window.removeEventListener('blur', onBlur);
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
  const onBlur = () => { handlerLikelyOpened = true; cleanup(); };
  const onVisibilityChange = () => {
    if (document.visibilityState === 'hidden') { handlerLikelyOpened = true; cleanup(); }
  };
  window.addEventListener('blur', onBlur, { once: true });
  document.addEventListener('visibilitychange', onVisibilityChange, { once: true });

  try {
    const link = document.createElement('a');
    link.href = href;
    link.style.display = 'none';
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (_) {
    try { window.location.href = href; } catch { /* noop */ }
  }

  // Windows/Chrome sometimes ignores mailto when no default mail client is set
  // Fallback: open Gmail compose if nothing happened shortly after
  const isWindows = /Windows/i.test(navigator.userAgent);
  const isChrome = /Chrome\//i.test(navigator.userAgent) && !/Edg\//i.test(navigator.userAgent);
  const subject = options.subject || '';
  const body = options.body || '';
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.setTimeout(() => {
    // If the browser navigated the current tab to a mailto: blank page, bring the user back
    if (window.location.href.startsWith('mailto:')) {
      try { window.location.replace(previousHref); } catch { /* noop */ }
    }
    if (!handlerLikelyOpened && (isWindows || isChrome)) {
      try { window.open(gmailUrl, '_blank', 'noopener'); } catch { /* noop */ }
    }
    cleanup();
  }, 800);
}

export function buildTel(phone) {
  // Remove spaces and dashes to be safe
  const normalized = String(phone).replace(/[^+\d]/g, '');
  return `tel:${normalized}`;
}

export function openTel(phone) {
  const href = buildTel(phone);
  try {
    const link = document.createElement('a');
    link.href = href;
    link.style.display = 'none';
    link.rel = 'noopener';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (_) {
    try { window.location.href = href; } catch { /* noop */ }
  }
}

export function handleInteractiveLink(event, action) {
  // Activate on click or Enter/Space key
  const isKeyboard = event.type === 'keydown' && (event.key === 'Enter' || event.key === ' ');
  if (event.type === 'click' || isKeyboard) {
    event.preventDefault();
    action();
  }
}


