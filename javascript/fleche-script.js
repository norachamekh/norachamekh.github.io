function initialiserFlechesProjets() {
  const projets = document.querySelectorAll('.work-project');

  projets.forEach(function (projet) {
    const image = projet.querySelector('.work-project-media');
    const fleche = projet.querySelector('.work-project-arrow');

    if (!image || !fleche) {
      return;
    }

    let animationEnCours = false;

    image.addEventListener('pointermove', function (e) {
      const rect = image.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const pourcentageX = x / rect.width;
      const pourcentageY = y / rect.height;

      fleche.style.left = `${x}px`;
      fleche.style.top = `${y}px`;

      const distanceBordGauche = x;
      const distanceBordDroit = rect.width - x;
      const distanceBordHaut = y;
      const distanceBordBas = rect.height - y;

      const distanceMinimum = Math.min(
        distanceBordGauche,
        distanceBordDroit,
        distanceBordHaut,
        distanceBordBas
      );

      const seuil = 100;

      if (
        distanceMinimum < seuil &&
        !animationEnCours
      ) {
        animationEnCours = true;

        let directionX = 0;
        let directionY = 0;

        if (distanceBordGauche === distanceMinimum) {
          directionX = '-18px';
        } else if (distanceBordDroit === distanceMinimum) {
          directionX = '18px';
        } else if (distanceBordHaut === distanceMinimum) {
          directionY = '-18px';
        } else {
          directionY = '18px';
        }

        fleche.style.setProperty(
          '--direction-x',
          directionX
        );

        fleche.style.setProperty(
          '--direction-y',
          directionY
        );

        fleche.classList.remove('pres-du-bord');

        void fleche.offsetWidth;

        fleche.classList.add('pres-du-bord');

        setTimeout(function () {
          animationEnCours = false;
        }, 700);
      }
    });

    image.addEventListener('pointerleave', function () {
      fleche.style.left = '50%';
      fleche.style.top = '50%';
      fleche.classList.remove('pres-du-bord');
    });
  });
}

document.addEventListener(
  'DOMContentLoaded',
  function () {
    initialiserFlechesProjets();
  }
);
