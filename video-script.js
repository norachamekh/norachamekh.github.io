function initialiserVideo() {
  const video = document.querySelector('#video-showreel');
  const boutonPlay = document.querySelector('#bouton-play');
  const wrapper = document.querySelector('.video-wrapper');

  if (!video || !boutonPlay || !wrapper) {
    console.warn('Vidéo, bouton play ou wrapper introuvable.');
    return;
  }

  let videoDejaLancee = false;

  function placerBoutonAuCentre() {
    boutonPlay.style.left = '50%';
    boutonPlay.style.top = '50%';
    boutonPlay.style.transform = 'translate(-50%, -50%)';
  }

  /* Le bouton suit la souris seulement avant le premier lancement */
  wrapper.addEventListener('mousemove', function (e) {
    if (videoDejaLancee) {
      return;
    }

    const rect = wrapper.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    boutonPlay.style.left = `${x}px`;
    boutonPlay.style.top = `${y}px`;
    boutonPlay.style.transform = 'translate(-50%, -50%)';
  });

  /* Retour progressif au centre en quittant la vidéo */
  wrapper.addEventListener('mouseleave', function () {
    if (!videoDejaLancee) {
      placerBoutonAuCentre();
    }
  });

  /* Lancement de la vidéo */
  boutonPlay.addEventListener('click', function (e) {
    e.stopPropagation();

    const promesseLecture = video.play();

    if (promesseLecture !== undefined) {
      promesseLecture
        .then(function () {
          videoDejaLancee = true;

          wrapper.classList.add('video-deja-lancee');

          placerBoutonAuCentre();
        })
        .catch(function (erreur) {
          console.error(
            'Impossible de lancer la vidéo :',
            erreur
          );
        });
    }
  });

  /* Si la vidéo est lancée avec un contrôle natif */
  video.addEventListener('playing', function () {
    videoDejaLancee = true;
    wrapper.classList.add('video-deja-lancee');
    placerBoutonAuCentre();
  });
}

document.addEventListener('DOMContentLoaded', initialiserVideo);
