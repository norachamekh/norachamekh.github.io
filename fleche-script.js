function initialiserFlechesProjets() {
  const projets = document.querySelectorAll('.work-project');

  projets.forEach(function (projet) {
    const image = projet.querySelector('.work-project-media');
    const fleche = projet.querySelector('.work-project-arrow');

    if (!image || !fleche) {
      return;
    }

    let animationEnCours = false;
    let sourisX = 50;
    let sourisY = 50;

    function centrerFleche() {
      fleche.style.left = '50%';
      fleche.style.top = '50%';
    }

    image.addEventListener('pointermove', function (e) {
      const rect = image.getBoundingClientRect();

      sourisX = e.clientX - rect.left;
      sourisY = e.clientY - rect.top;

      if (animationEnCours) {
        return;
      }

      animationEnCours = true;

      requestAnimationFrame(function () {
        fleche.style.left = `${sourisX}px`;
        fleche.style.top = `${sourisY}px`;

        animationEnCours = false;
      });
    });

    image.addEventListener('pointerleave', function () {
      centrerFleche();
    });
  });
}

document.addEventListener(
  'DOMContentLoaded',
   initialiserFlechesProjets
);
