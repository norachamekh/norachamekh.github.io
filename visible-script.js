function initialiserReveal() {
  const elements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(function (element) {
      element.classList.add('visible');
    });

    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  elements.forEach(function (element) {
    observer.observe(element);
  });
}

document.addEventListener(
  'DOMContentLoaded',
  initialiserReveal
);
