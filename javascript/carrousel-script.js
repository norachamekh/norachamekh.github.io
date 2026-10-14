function initialiserCarrousels() {
  document.querySelectorAll('.galerie-carrousel').forEach(function (section) {
    const piste = section.querySelector('.carrousel-piste');
    const precedent = section.querySelector('.carrousel-precedent');
    const suivant = section.querySelector('.carrousel-suivant');

    if (!piste || !precedent || !suivant) {
      return;
    }

    if (section.dataset.carrouselInitialise === 'true') {
      return;
    }

    section.dataset.carrouselInitialise = 'true';

    function defiler(direction) {
      const slide = piste.querySelector('.carrousel-slide');

      if (!slide) {
        return;
      }

      const espace =
        parseFloat(getComputedStyle(piste).columnGap) || 0;

      const distance =
        slide.getBoundingClientRect().width + espace;

      const positionMax = piste.scrollWidth - piste.clientWidth;

      let destination;

      if (direction === 1 && piste.scrollLeft >= positionMax - 5) {
        // Dernière image : retour à la première
        destination = 0;
      } else if (direction === -1 && piste.scrollLeft <= 5) {
        // Première image : aller à la dernière
        destination = positionMax;
      } else {
        // Passer à l’image suivante ou précédente
        destination = Math.max(
          0,
          Math.min(positionMax, piste.scrollLeft + direction * distance)
        );
      }

      const mouvementReduit = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      piste.scrollTo({
        left: destination,
        behavior: mouvementReduit ? 'instant' : 'smooth'
      });
    }

    precedent.addEventListener('click', function () {
      defiler(-1);
    });

    suivant.addEventListener('click', function () {
      defiler(1);
    });
  });
}


if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    initialiserCarrousels
  );
} else {
  initialiserCarrousels();
}
