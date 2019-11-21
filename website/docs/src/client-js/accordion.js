export class Accordion {
  init() {
    window.faqOpenAnswer = (event, element) => {
      event.preventDefault();
      element.parentNode.classList.add('active');
    };
  }
}