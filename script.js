document.addEventListener('DOMContentLoaded', function () {
  const boutonMenu = document.getElementById('menu-burger');
  const navigation = document.getElementById('navigation-principale');

  if (!boutonMenu || !navigation) {
    console.error('Le bouton burger ou la navigation est introuvable.');
    return;
  }

  boutonMenu.addEventListener('click', function () {
    const menuEstOuvert = navigation.classList.toggle('menu-ouvert');

    boutonMenu.classList.toggle('menu-ouvert', menuEstOuvert);

    boutonMenu.setAttribute(
      'aria-expanded',
      menuEstOuvert ? 'true' : 'false'
    );

    boutonMenu.setAttribute(
      'aria-label',
      menuEstOuvert ? 'Fermer le menu' : 'Ouvrir le menu'
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
});
