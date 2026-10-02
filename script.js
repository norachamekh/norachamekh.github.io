const boutonMenu = document.querySelector('#menu-burger');
const navigation = document.querySelector('#navigation-principale');
const liensNavigation = document.querySelectorAll('#navigation-principale a');

boutonMenu.addEventListener('click', () => {
  const menuEstOuvert = boutonMenu.classList.toggle('menu-ouvert');

  navigation.classList.toggle('menu-ouvert', menuEstOuvert);

  boutonMenu.setAttribute('aria-expanded', menuEstOuvert);
  boutonMenu.setAttribute(
    'aria-label',
    menuEstOuvert ? 'Fermer le menu' : 'Ouvrir le menu'
  );
});

liensNavigation.forEach((lien) => {
  lien.addEventListener('click', () => {
    boutonMenu.classList.remove('menu-ouvert');
    navigation.classList.remove('menu-ouvert');

    boutonMenu.setAttribute('aria-expanded', 'false');
    boutonMenu.setAttribute('aria-label', 'Ouvrir le menu');
  });
});
