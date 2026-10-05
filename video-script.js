function initialiserVideo() {
  const video = document.querySelector('#video-ford');
  const wrapper = document.querySelector('.video-wrapper');

  if (!video || !wrapper) {
    console.warn('Vidéo ou wrapper introuvable.');
    return;
  }

  wrapper.addEventListener('mousemove', function (e) {
    const rect = wrapper.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    wrapper.style.setProperty('--mouse-x', `${x}px`);
    wrapper.style.setProperty('--mouse-y', `${y}px`);
  });
}

