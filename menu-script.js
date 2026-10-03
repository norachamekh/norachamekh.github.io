function initialiserMenu() {
  const boutonMenu = document.querySelector('.menu-burger');
  const navigation = document.querySelector('.navigation');

  if (boutonMenu && navigation) {
    boutonMenu.addEventListener('click', function () {
      const menuEstOuvert =
        navigation.classList.toggle('menu-ouvert');

      boutonMenu.classList.toggle(
        'menu-ouvert',
        menuEstOuvert
      );

      boutonMenu.setAttribute(
        'aria-expanded',
        menuEstOuvert ? 'true' : 'false'
      );

      boutonMenu.setAttribute(
        'aria-label',
        menuEstOuvert ? 'Fermer le menu' : 'Ouvrir le menu'
      );
    });

    const liensNavigation =
      navigation.querySelectorAll('a');

    liensNavigation.forEach(function (lien) {
      lien.addEventListener('click', function () {
        navigation.classList.remove('menu-ouvert');
        boutonMenu.classList.remove('menu-ouvert');

        boutonMenu.setAttribute(
          'aria-expanded',
          'false'
        );

        boutonMenu.setAttribute(
          'aria-label',
          'Ouvrir le menu'
        );
      });
    });
  }
}

function initialiserBoutonHaut() {
  const boutonHaut = document.querySelector('#bouton-haut');

  if (!boutonHaut) {
    return;
  }

  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      boutonHaut.classList.add('visible');
    } else {
      boutonHaut.classList.remove('visible');
    }
  });

  boutonHaut.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function initialiserReveal() {
  const elements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  elements.forEach(function (el) {
    observer.observe(el);
  });
}

function initialiserImagesScroll() {
  const images = document.querySelectorAll('.img-scroll');

  if (!('IntersectionObserver' in window)) {
    images.forEach(function (img) {
      img.classList.add('apparue');
    });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('apparue');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  images.forEach(function (img) {
    observer.observe(img);
  });
}

function initialiserVideo() {
  const video = document.querySelector('#video-ford');
  const boutonPlay = document.querySelector('#bouton-play');
  const wrapper = document.querySelector('.video-wrapper');

  if (!video || !boutonPlay) {
    return;
  }

  boutonPlay.addEventListener('click', function () {
    if (video.paused) {
      video.play();
      if (wrapper) {
        wrapper.classList.add('lecture-en-cours');
      }
    } else {
      video.pause();
      if (wrapper) {
        wrapper.classList.remove('lecture-en-cours');
      }
    }
  });

  // Optionnel : pause quand la vidéo n'est plus visible
  if ('IntersectionObserver' in window) {
    const observerVideo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting && !video.paused) {
          video.pause();
          if (wrapper) {
            wrapper.classList.remove('lecture-en-cours');
          }
        }
      });
    }, {
      threshold: 0.3
    });

    observerVideo.observe(video);
  }
}

function initialiserSite() {
  initialiserMenu();
  initialiserBoutonHaut();
  initialiserReveal();
  initialiserImagesScroll();
  initialiserVideo();
}

if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    initialiserSite
  );
} else {
  initialiserSite();
}

