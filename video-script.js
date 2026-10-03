function initialiserVideo() {

  console.log('initialiserVideo est lancée');
  
  const video = document.querySelector('#video-ford');
  const boutonPlay = document.querySelector('#bouton-play');
  const wrapper = document.querySelector('.video-wrapper');

  if (!video || !boutonPlay || !wrapper) {
    console.warn('Vidéo, bouton play ou wrapper introuvable.');
    return;
  }
/* Lancer ou mettre en pause la vidéo */
  boutonPlay.addEventListener('click', function (e) {
    e.stopPropagation();// éviter de déclencher le clic du wrapper

    if (video.paused) {
      video.play();
      wrapper.classList.add('lecture-en-cours');
    } else {
      video.pause();
      wrapper.classList.remove('lecture-en-cours');
    }
  });
 
  /* Faire suivre le bouton play à la souris */
  wrapper.addEventListener('mousemove', function (e) {
    const rect = wrapper.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    boutonPlay.style.left = `${x}px`;
    boutonPlay.style.top = `${y}px`;
    boutonPlay.style.transform = 'translate(-50%, -50%)';
  });

  /* Replacer le bouton au centre à la sortie de la vidéo */
  wrapper.addEventListener('mouseleave', function () {
    boutonPlay.style.left = '50%';
    boutonPlay.style.top = '50%';
    boutonPlay.style.transform = 'translate(-50%, -50%)';
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initialiserVideo();
});



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
