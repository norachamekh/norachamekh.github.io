function initialiserVideo() {
  const video = document.querySelector('#video-ford');
  const boutonPlay = document.querySelector('#bouton-play');
  const wrapper = document.querySelector('.video-wrapper');

  if (!video || !boutonPlay || !wrapper) {
    console.warn('Vidéo, bouton play ou wrapper introuvable.');
    return;
  }

  function remettreBoutonAuCentre() {
    boutonPlay.style.left = '50%';
    boutonPlay.style.top = '50%';
    boutonPlay.style.transform = 'translate(-50%, -50%)';
  }

  /* Le bouton play suit la souris seulement avant la lecture */
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

  wrapper.addEventListener('mouseleave', function () {
    if (video.paused) {
      remettreBoutonAuCentre();
    }
  });

  /* Clic sur le bouton : lancement de la vidéo */
  boutonPlay.addEventListener('click', function (e) {
    e.stopPropagation();

    const lecture = video.play();

    if (lecture !== undefined) {
      lecture
        .then(function () {
          /* Affiche timeline, pause, son, plein écran… */
          video.setAttribute('controls', '');

          /* Cache le gros bouton play */
          wrapper.classList.add('lecture-en-cours');

          /* Arrête le suivi et replace le bouton avant de le cacher */
          remettreBoutonAuCentre();
        })
        .catch(function (erreur) {
          console.error('La vidéo ne peut pas démarrer :', erreur);
        });
    }
  });

  /* Si la vidéo est mise en pause avec les contrôles natifs */
  video.addEventListener('pause', function () {
    wrapper.classList.remove('lecture-en-cours');
    remettreBoutonAuCentre();
  });

  /* À la fin : on enlève les contrôles et on réaffiche le bouton play */
  video.addEventListener('ended', function () {
    video.currentTime = 0;
    video.removeAttribute('controls');

    wrapper.classList.remove('lecture-en-cours');
    remettreBoutonAuCentre();
  });
}





/*
function initialiserVideo() {
  
  const video = document.querySelector('#video-ford');
  const boutonPlay = document.querySelector('#bouton-play');
  const wrapper = document.querySelector('.video-wrapper');

  if (!video || !boutonPlay || !wrapper) {
    console.warn('Vidéo, bouton play ou wrapper introuvable.');
    return;
  }

    function remettreBoutonAuCentre() {
    boutonPlay.style.left = '50%';
    boutonPlay.style.top = '50%';
    boutonPlay.style.transform = 'translate(-50%, -50%)';
  }
  
/* Lancer ou mettre en pause la vidéo */
  boutonPlay.addEventListener('click', function (e) {
    e.stopPropagation();// éviter de déclencher le clic du wrapper

    /* Si la vidéo joue déjà, on la met en pause */
    if (!video.paused) {
      video.pause();
      return;
    }
    /* On tente de lancer la vidéo */
    const lecture = video.play();

    /* play() retourne une Promise : on attend qu'elle réussisse */
    if (lecture !== undefined) {
      lecture
        .then(function () {
          wrapper.classList.add('lecture-en-cours');
          remettreBoutonAuCentre();
        })
        .catch(function (erreur) {
          console.error('La vidéo ne peut pas démarrer :', erreur);
          wrapper.classList.remove('lecture-en-cours');
        });
    }
  });

  /* Le bouton suit la souris uniquement quand la vidéo est en pause */
  /* Faire suivre le bouton play à la souris */
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


/* Le bouton se recentre quand la souris quitte la vidéo */
  wrapper.addEventListener('mouseleave', function () {
    if (video.paused) {
      remettreBoutonAuCentre();
    }
  });

  /* Lorsque la vidéo est mise en pause, on réaffiche le bouton */
  video.addEventListener('pause', function () {
    wrapper.classList.remove('lecture-en-cours');
    remettreBoutonAuCentre();
  });

  /* Lorsque la vidéo est terminée, on revient au début */
  video.addEventListener('ended', function () {
    video.currentTime = 0;
    wrapper.classList.remove('lecture-en-cours');
    remettreBoutonAuCentre();
  });
}

  
  /* Replacer le bouton au centre à la sortie de la vidéo 
  wrapper.addEventListener('mouseleave', function () {
    boutonPlay.style.left = '50%';
    boutonPlay.style.top = '50%';
    boutonPlay.style.transform = 'translate(-50%, -50%)';
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initialiserVideo();
});
*/


/*
  // +Pause quand la vidéo n'est plus visible
  if ('IntersectionObserver' in window) {
    const observerVideo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting && !video.paused) {
          video.pause();
          wrapper.classList.remove('lecture-en-cours');
        }
      });
    }, {
      threshold: 0.3
    });

    observerVideo.observe(video);
  }

  // Curseur play qui suit la souris
  wrapper.addEventListener('mousemove', function (e) {
    const rect = wrapper.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // On centre le bouton sur la souris
    boutonPlay.style.left = x + 'px';
    boutonPlay.style.top = y + 'px';

    // On annule le centrage automatique avec translate
    boutonPlay.style.transform = 'translate(-50%, -50%)';
  });

  // Quand la souris quitte le conteneur, on recentre le bouton
  wrapper.addEventListener('mouseleave', function () {
    boutonPlay.style.left = '50%';
    boutonPlay.style.top = '50%';
    boutonPlay.style.transform = 'translate(-50%, -50%)';
  });
}


  boutonPlay.style.left = `${x}px`;
  boutonPlay.style.top = `${y}px`;

  console.log('position calculée :', x, y);
  console.log('position CSS :', boutonPlay.style.left, boutonPlay.style.top);
});

*/
