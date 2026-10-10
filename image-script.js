function initialiserImageManifesto() {
  const section = document.querySelector('.manifesto');
  const image = document.querySelector('.manifesto-image img');

  if (!section || !image) {
    return;
  }

  window.addEventListener('scroll', function () {
    const position = section.getBoundingClientRect();
    const hauteurEcran = window.innerHeight;

    if (
      position.bottom > 0 &&
      position.top < hauteurEcran
    ) {
      const progression =
        (hauteurEcran - position.top) /
        (hauteurEcran + position.height);

      const decalage = (progression - 0.5) * 10;

      image.style.transform =
        `translateY(${decalage}%)`;
    }
  });
}

document.addEventListener(
  'DOMContentLoaded',
  initialiserImageManifesto
);
