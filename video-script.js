function initialiserVideo() {
  const video = document.querySelector('#video-showreel');
  const boutonPlay = document.querySelector('#bouton-play');
  const wrapper = document.querySelector('.video-wrapper');

  if (!video || !boutonPlay || !wrapper) {
    console.warn('Vidéo, bouton play ou wrapper introuvable.');
    return;
  }

  let videoDejaLancee = false;
  let positionSourisX = 0;
  let positionSourisY = 0;
  let animationEnCours = false;

  function placerBoutonAuCentre() {
    boutonPlay.style.transform =
      'translate3d(-50%, -50%, 0)';
  }

  wrapper.addEventListener('mousemove', function (e) {
    if (videoDejaLancee) {
      return;
    }

    const rect = wrapper.getBoundingClientRect();

    positionSourisX = e.clientX - rect.left;
    positionSourisY = e.clientY - rect.top;

    if (animationEnCours) {
      return;
    }

    animationEnCours = true;

    requestAnimationFrame(function () {
      boutonPlay.style.transform =
        `translate3d(${positionSourisX}px, ${positionSourisY}px, 0) translate(-50%, -50%)`;

      animationEnCours = false;
    });
  });

  wrapper.addEventListener('mouseleave', function () {
    if (!videoDejaLancee) {
      placerBoutonAuCentre();
    }
  });

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

  video.addEventListener('playing', function () {
    videoDejaLancee = true;
    wrapper.classList.add('video-deja-lancee');
    placerBoutonAuCentre();
  });
}

document.addEventListener('DOMContentLoaded', initialiserVideo);
