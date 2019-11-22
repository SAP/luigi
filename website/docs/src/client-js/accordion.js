export class Accordion {
  init() {
    window.accordionToggle = (event, element) => {
      event.preventDefault();
      element.parentNode.classList.toggle('active');
    };
  }
}