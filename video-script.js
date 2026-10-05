function initialiserVideo() {
  const video = document.querySelector('#video-showreel');
  const boutonPlay = document.querySelector('#bouton-play');
  const wrapper = document.querySelector('#video-wrapper');

  if (!video || !boutonPlay || !wrapper) {
    console.warn('Vidéo, bouton play ou wrapper introuvable.');
    return;
  }

  let videoDejaLancee = false;
  let animationEnCours = false;
  let sourisX = 50;
  let sourisY = 50;

  video.controls = false;

  function centrerBouton() {
    wrapper.style.setProperty('--souris-x', '50%');
    wrapper.style.setProperty('--souris-y', '50%');
  }

  function suivreSouris(e) {
    if (videoDejaLancee) {
      return;
    }

    const rect = wrapper.getBoundingClientRect();

    sourisX = ((e.clientX - rect.left) / rect.width) * 100;
    sourisY = ((e.clientY - rect.top) / rect.height) * 100;

    sourisX = Math.max(0, Math.min(100, sourisX));
    sourisY = Math.max(0, Math.min(100, sourisY));

    if (animationEnCours) {
      return;
    }

    animationEnCours = true;

    requestAnimationFrame(function () {
      wrapper.style.setProperty(
        '--souris-x',
        `${sourisX}%`
      );

      wrapper.style.setProperty(
        '--souris-y',
        `${sourisY}%`
      );

      animationEnCours = false;
    });
  }

  wrapper.addEventListener('mousemove', suivreSouris);

  wrapper.addEventListener('mouseleave', function () {
    if (!videoDejaLancee) {
      centrerBouton();
    }
  });

  boutonPlay.addEventListener('click', function (e) {
    e.stopPropagation();

    const demandeLecture = video.play();

    if (demandeLecture !== undefined) {
      demandeLecture
        .then(function () {
          lancerVideo();
        })
        .catch(function (erreur) {
          console.error(
            'Impossible de lancer la vidéo :',
            erreur
          );
        });
    }
  });

  function lancerVideo() {
    videoDejaLancee = true;

    wrapper.classList.add('video-deja-lancee');

    video.controls = true;

    centrerBouton();
  }

  video.addEventListener('play', function () {
    if (!videoDejaLancee) {
      lancerVideo();
    }
  });

  video.addEventListener('ended', function () {
    /* La vidéo reste considérée comme lancée */
    wrapper.classList.add('video-deja-lancee');
  });
}

document.addEventListener(
  'DOMContentLoaded',
  initialiserVideo
);
