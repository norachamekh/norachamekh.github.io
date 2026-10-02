  const menuToggle = document.querySelector('.menu-toggle');
  const menuBar = document.querySelector('.menu');

  menuToggle.addEventListener('click', () => {
    menuBar.classList.toggle('active');
  });


  

function initialiserMenu() {
  const boutonMenu = document.querySelector('.menu-burger');
  const navigation = document.querySelector('.navigation');

  if (!boutonMenu || !navigation) {
    console.error('Menu introuvable dans cette page.');
    return;
  }

  boutonMenu.addEventListener('click', function () {
    const menuOuvert = navigation.classList.toggle('menu-ouvert');

    boutonMenu.classList.toggle('menu-ouvert', menuOuvert);
    boutonMenu.setAttribute('aria-expanded', menuOuvert);
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialiserMenu);
} else {
  initialiserMenu();
}



const boutonHaut = document.querySelector('#bouton-haut');

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
