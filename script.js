document.addEventListener('DOMContentLoaded', function () {
  const boutonMenu = document.getElementById('menu-burger');
  const navigation = document.getElementById('navigation-principale');

  if (!boutonMenu || !navigation) {
    return;
  }

  boutonMenu.addEventListener('click', function () {
    const menuEstOuvert = boutonMenu.classList.toggle('menu-ouvert');

    navigation.classList.toggle('menu-ouvert', menuEstOuvert);

    boutonMenu.setAttribute(
      'aria-expanded',
      menuEstOuvert ? 'true' : 'false'
    );

    boutonMenu.setAttribute(
      'aria-label',
      menuEstOuvert ? 'Fermer le menu' : 'Ouvrir le menu'
    );
  });

  const liens = navigation.querySelectorAll('a');

  liens.forEach(function (lien) {
    lien.addEventListener('click', function () {
      boutonMenu.classList.remove('menu-ouvert');
      navigation.classList.remove('menu-ouvert');

      boutonMenu.setAttribute('aria-expanded', 'false');
      boutonMenu.setAttribute('aria-label', 'Ouvrir le menu');
    });
  });
});
