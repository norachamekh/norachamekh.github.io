function initialiserBoutonHaut() {
  const boutonHaut = document.querySelector('#bouton-haut');

  if (!boutonHaut) {
    console.error('Le bouton retour en haut est introuvable.');
    return;
  }

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
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

function initialiserSite() {
  initialiserMenu();
  initialiserBoutonHaut();
}

if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    initialiserSite
  );
} else {
  initialiserSite();
}
