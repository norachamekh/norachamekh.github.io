function initialiserVideo() {
  const video = document.querySelector('#video-showreel');
  const boutonPlay = document.querySelector('#bouton-play');
  const wrapper = document.querySelector('.video-wrapper');

  if (!video || !boutonPlay || !wrapper) {
    console.warn('Vidéo, bouton play ou wrapper introuvable.');
    return;
  }

  let videoDejaLancee = false;

  video.controls = false;

  function centrerBouton() {
    boutonPlay.style.left = `${wrapper.clientWidth / 2}px`;
    boutonPlay.style.top = `${wrapper.clientHeight / 2}px`;
  }

  /* Position initiale */
  centrerBouton();

  /* Le bouton suit la souris */
  wrapper.addEventListener('mousemove', function (e) {
    if (videoDejaLancee) {
      return;
    }

    const rect = wrapper.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    boutonPlay.style.left = `${x}px`;
    boutonPlay.style.top = `${y}px`;
  });

  /* Retour doux au centre */
  wrapper.addEventListener('mouseleave', function () {
    if (!videoDejaLancee) {
      centrerBouton();
    }
  });

  /* Lancement de la vidéo */
  boutonPlay.addEventListener('click', function (e) {
    e.stopPropagation();

    const lecture = video.play();

    if (lecture !== undefined) {
      lecture
        .then(function () {
          videoDejaLancee = true;
          video.controls = true;
          wrapper.classList.add('video-deja-lancee');
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

  /* Si la vidéo est lancée avec les contrôles */
  video.addEventListener('play', function () {
    videoDejaLancee = true;
    video.controls = true;
    wrapper.classList.add('video-deja-lancee');
    centrerBouton();
  });
}

document.addEventListener(
  'DOMContentLoaded',
  initialiserVideo
);
