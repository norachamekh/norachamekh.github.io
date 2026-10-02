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
