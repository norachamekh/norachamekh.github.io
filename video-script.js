function initialiserVideo() {
  const video = document.querySelector('#video-showreel');
  const boutonPlay = document.querySelector('#bouton-play');
  const wrapper = document.querySelector('.video-wrapper');

  if (!video || !boutonPlay || !wrapper) {
    console.warn('Vidéo, bouton play ou wrapper introuvable.');
    return;
  }

  // let videoDejaLancee = false;
  let animationEnCours = false;
  let sourisX = 0;
  let sourisY = 0;


  // Masquer les contrôles au départ
  video.controls = false;

  function centrerBouton() {
    boutonPlay.style.transform =
      'translate(-50%, -50%)';
  }

  // Mouvement fluide du bouton avant le premier lancement
  wrapper.addEventListener('mousemove', function (e) {
    if (videoDejaLancee) {
      return;
    }

    const rect = wrapper.getBoundingClientRect();

    sourisX = e.clientX - rect.left;
    sourisY = e.clientY - rect.top;

    if (animationEnCours) {
      return;
    }

    animationEnCours = true;

    requestAnimationFrame(function () {
    boutonPlay.style.left = `${sourisX}px`;
    boutonPlay.style.top = `${sourisY}px`;
    boutonPlay.style.transform =
      'translate3d(-50%, -50%, 0)';

      animationEnCours = false;
    });
  });

  // Retour doux au centre
  wrapper.addEventListener('mouseleave', function () {
    if (!videoDejaLancee) {
    return;
  }

  boutonPlay.style.left = '50%';
  boutonPlay.style.top = '50%';
  boutonPlay.style.transform =
    'translate3d(-50%, -50%, 0)';
});

  // Lancement avec le bouton personnalisé
  boutonPlay.addEventListener('click', function (e) {
    e.stopPropagation();

    const lecture = video.play();

    if (lecture !== undefined) {
      lecture
        .then(function () {
          videoDejaLancee = true;

          wrapper.classList.add('video-deja-lancee');

          // Les contrôles deviennent disponibles
          video.controls = true;

          centrerBouton();
        })
        .catch(function (erreur) {
          console.error(
            'La vidéo ne peut pas démarrer :',
            erreur
          );
        });
    }
  });

  // Si la vidéo est lancée depuis un autre contrôle
  video.addEventListener('play', function () {
    videoDejaLancee = true;

    wrapper.classList.add('video-deja-lancee');
    video.controls = true;

    centrerBouton();
  });
}

document.addEventListener('DOMContentLoaded', initialiserVideo);
