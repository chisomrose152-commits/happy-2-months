const envelopeButton = document.querySelector('#envelope-button');
const surpriseNote = document.querySelector('#surprise-note');
const envelopePrompt = document.querySelector('#envelope-prompt');
const interactionStatus = document.querySelector('#interaction-status');
const shareButton = document.querySelector('#share-button');
const toast = document.querySelector('#toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

envelopeButton.addEventListener('click', () => {
  const isOpening = envelopeButton.getAttribute('aria-expanded') !== 'true';
  envelopeButton.setAttribute('aria-expanded', String(isOpening));
  envelopeButton.classList.toggle('is-open', isOpening);
  surpriseNote.hidden = !isOpening;
  envelopePrompt.innerHTML = isOpening
    ? 'A little reminder: you are so loved <span aria-hidden="true">♥</span>'
    : 'Tap to open your little note <span aria-hidden="true">↗</span>';
  interactionStatus.textContent = isOpening ? 'Your love note is open.' : 'Your love note is tucked away.';
});

shareButton.addEventListener('click', async () => {
  const shareData = {
    title: 'Two Months, My Favorite Call',
    text: 'A little anniversary love note for Babe ❤️',
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareData.url);
      showToast('Link copied—send your little love story to Babe ❤️');
      return;
    }
    showToast('Copy this page’s address to share your little love story.');
  } catch (error) {
    if (error?.name !== 'AbortError') {
      showToast('Copy this page’s address to share your little love story.');
    }
  }
});
