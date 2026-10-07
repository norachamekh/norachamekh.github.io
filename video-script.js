function initialiserVideo() {
  const video = document.querySelector('#video-showreel');
  const boutonPlay = document.querySelector('#bouton-play');
  const wrapper = document.querySelector('#video-wrapper');

   console.log('video :', video);
  console.log('bouton play :', boutonPlay);
  console.log('wrapper :', wrapper);
  
  if (!video || !boutonPlay || !wrapper) {
    console.warn('Vidéo, bouton play ou wrapper introuvable.');
    return;
  }

  let videoDejaLancee = false;
  let sourisX = 50;
  let sourisY = 50;
  let animationEnCours = false;

  video.controls = false;

  function centrerBouton() {
    wrapper.style.setProperty('--souris-x', '50%');
    wrapper.style.setProperty('--souris-y', '50%');
  }

  function lancerVideo() {
    videoDejaLancee = true;

    wrapper.classList.add('video-deja-lancee');
    video.controls = true;
    centrerBouton();
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
      wrapper.style.setProperty('--souris-x', `${sourisX}%`);
      wrapper.style.setProperty('--souris-y', `${sourisY}%`);

      animationEnCours = false;
    });
  }

  wrapper.addEventListener('pointermove', suivreSouris);

  wrapper.addEventListener('pointerleave', function () {
    if (!videoDejaLancee) {
      centrerBouton();
    }
  });

  /* Le clic est géré par le wrapper, car le bouton visuel n'intercepte pas la souris */
  wrapper.addEventListener('click', function () {
    if (videoDejaLancee) {
      return;
    }

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

  video.addEventListener('play', function () {
    if (!videoDejaLancee) {
      lancerVideo();
    }
  });

  video.addEventListener('ended', function () {
    wrapper.classList.add('video-deja-lancee');
  });
}

document.addEventListener(
  'DOMContentLoaded',
  initialiserVideo
);
