function initialiserFiltresProjets() {
  const boutons = document.querySelectorAll('.filtre-projet');
  const projets = document.querySelectorAll('.work-project');

  if (!boutons.length || !projets.length) {
    return;
  }

  boutons.forEach(function (bouton) {
    bouton.addEventListener('click', function () {
      const filtre = bouton.dataset.filtre;

      boutons.forEach(function (autreBouton) {
        autreBouton.classList.remove('actif');
      });

      bouton.classList.add('actif');

      projets.forEach(function (projet) {
        const categorie = projet.dataset.categorie;

        if (filtre === 'tous' || categorie === filtre) {
          projet.classList.remove('est-cache');
        } else {
          projet.classList.add('est-cache');
        }
      });
    });
  });
}

document.addEventListener(
  'DOMContentLoaded',
  initialiserFiltresProjets
);
