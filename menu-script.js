document.addEventListener('DOMContentLoaded', function () {

  // --- MENU BURGER ---
  const boutonMenu = document.querySelector('.menu-burger');
  const navigation = document.querySelector('.navigation');

  if (boutonMenu && navigation) {
    boutonMenu.addEventListener('click', function () {
      const menuOuvert = navigation.classList.toggle('menu-ouvert');
      boutonMenu.classList.toggle('menu-ouvert', menuOuvert);
      boutonMenu.setAttribute('aria-expanded', menuOuvert ? 'true' : 'false');
      boutonMenu.setAttribute(
        'aria-label',
        menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu'
      );
    });

    navigation.querySelectorAll('a').forEach(function (lien) {
      lien.addEventListener('click', function () {
        navigation.classList.remove('menu-ouvert');
        boutonMenu.classList.remove('menu-ouvert');
        boutonMenu.setAttribute('aria-expanded', 'false');
        boutonMenu.setAttribute('aria-label', 'Ouvrir le menu');
      });
    });
  }

  // --- BOUTON RETOUR EN HAUT ---
  const boutonHaut = document.querySelector('#bouton-haut');

  if (boutonHaut) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        boutonHaut.classList.add('visible');
      } else {
        boutonHaut.classList.remove('visible');
      }
    });

    boutonHaut.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- APPARITION DES ÉLÉMENTS (.reveal) ---
  const elementsReveal = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && elementsReveal.length > 0) {
    const observerReveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observerReveal.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    elementsReveal.forEach(function (el) {
      observerReveal.observe(el);
    });
  } else {
    // Fallback si IntersectionObserver n'existe pas
    elementsReveal.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // --- APPARITION DES IMAGES (.img-scroll) ---
  const imagesScroll = document.querySelectorAll('.img-scroll');

  if ('IntersectionObserver' in window && imagesScroll.length > 0) {
    const observerImages = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('apparue');
          observerImages.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    imagesScroll.forEach(function (img) {
      observerImages.observe(img);
    });
  } else {
    imagesScroll.forEach(function (img) {
      img.classList.add('apparue');
    });
  }

});
