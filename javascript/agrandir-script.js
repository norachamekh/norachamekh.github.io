function initialiserImagesAgrandies() {
  const fenetre = document.querySelector('#image-agrandie');
  const grandeImage = document.querySelector('#image-grand-format');
  const fermer = document.querySelector('.fermer-image');

  if (!fenetre || !grandeImage || !fermer) {
    return;
  }

  document.querySelectorAll('.ouvrir-image').forEach(function (bouton) {
    bouton.addEventListener('click', function () {
      const image = bouton.querySelector('img');

      if (!image) {
        return;
      }

      grandeImage.src = image.currentSrc || image.src;
      grandeImage.alt = image.alt;

      fenetre.showModal();
    });
  });

  fermer.addEventListener('click', function () {
    fenetre.close();
  });

  /* Fermer en cliquant autour de l’image */
  fenetre.addEventListener('click', function (evenement) {
    if (evenement.target === fenetre) {
      fenetre.close();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    initialiserImagesAgrandies
  );
} else {
  initialiserImagesAgrandies();
}
