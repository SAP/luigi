export class Accordion {
  init() {
    window.accordionToggle = (event, element) => {
      event.preventDefault();
      element.parentNode.classList.toggle('active');
    };
    this.openAllOnDocSearchScraper();
  }
  openAllOnDocSearchScraper() {
    const isBot = /docsearch|algolia|bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
    if(isBot) {
      // timeout required: even with sapper export, its data get set with javascript
      setTimeout(() => {
        const accordionItems = document.querySelectorAll('.accordion-item');
        accordionItems.forEach(item => {
          item.classList.add('active');
        });
      }, 50);
    }
  }
}