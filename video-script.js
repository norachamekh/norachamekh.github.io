function initialiserVideo() {
  const video = document.querySelector('#video-showreel');
  const boutonPlay = document.querySelector('#bouton-play');
  const wrapper = document.querySelector('.video-wrapper');

  if (!video || !boutonPlay || !wrapper) {
    console.warn('Vidéo, bouton play ou wrapper introuvable.');
    return;
  }

  function placerBoutonAuCentre() {
    boutonPlay.style.left = '50%';
    boutonPlay.style.top = '50%';
    boutonPlay.style.transform = 'translate(-50%, -50%)';
  }

  /* Le bouton suit la souris uniquement lorsque la vidéo est en pause */
  wrapper.addEventListener('mousemove', function (e) {
    if (!video.paused) {
      return;
    }

    const rect = wrapper.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    boutonPlay.style.left = `${x}px`;
    boutonPlay.style.top = `${y}px`;
    boutonPlay.style.transform = 'translate(-50%, -50%)';
  });

  /* Le bouton revient au centre en sortant de la vidéo */
  wrapper.addEventListener('mouseleave', function () {
    if (video.paused) {
      placerBoutonAuCentre();
    }
  });

  /* Lancement via le bouton flottant */
  boutonPlay.addEventListener('click', function (e) {
    e.stopPropagation();

    const promesseLecture = video.play();

    if (promesseLecture !== undefined) {
      promesseLecture
        .then(function () {
          wrapper.classList.add('video-en-lecture');
          placerBoutonAuCentre();
        })
        .catch(function (erreur) {
          console.error('Impossible de lancer la vidéo :', erreur);
        });
    }
  });

  /* Quand l'utilisateur appuie sur pause dans les contrôles */
  video.addEventListener('pause', function () {
    wrapper.classList.remove('video-en-lecture');
    placerBoutonAuCentre();
  });

  /* Quand l'utilisateur relance la vidéo avec les contrôles */
  video.addEventListener('play', function () {
    wrapper.classList.add('video-en-lecture');
    placerBoutonAuCentre();
  });

  /* Quand la vidéo arrive à la fin */
  video.addEventListener('ended', function () {
    wrapper.classList.remove('video-en-lecture');
    placerBoutonAuCentre();
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initialiserVideo();
});
