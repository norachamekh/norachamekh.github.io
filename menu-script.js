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

});
