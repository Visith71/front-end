export function enableScroll() {
  const bodyRefClass = document.body.classList
  if (bodyRefClass.contains('no-scroll')) {
    bodyRefClass.remove('no-scroll')
  }
}

export function disableScroll() {
  window.scrollTo(0,0);
  const bodyRefClass = document.body.classList
  bodyRefClass.add('no-scroll')
}