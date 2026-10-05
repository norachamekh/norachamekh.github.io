function initialiserVideo() {
  const video = document.querySelector('#video-showreel');
  const boutonPlay = document.querySelector('#bouton-play');
  const wrapper = document.querySelector('.video-wrapper');

  if (!video || !boutonPlay || !wrapper) {
    console.warn('Vidéo, bouton play ou wrapper introuvable.');
    return;
  }

  let videoDejaLancee = false;
  let animationEnCours = false;
  let sourisX = 0;
  let sourisY = 0;

  video.controls = false;

  function centrerBouton() {
   // boutonPlay.style.left = '50%';
   // boutonPlay.style.top = '50%';
    boutonPlay.style.transform =
      'translate3d(-50%, -50%, 0)';
  }

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

  wrapper.addEventListener('mouseleave', function () {
    if (!videoDejaLancee) {
      centrerBouton();
    }
  });

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

  video.addEventListener('play', function () {
    videoDejaLancee = true;
    video.controls = true;
    wrapper.classList.add('video-deja-lancee');
    centrerBouton();
  });
}

document.addEventListener('DOMContentLoaded', initialiserVideo);
