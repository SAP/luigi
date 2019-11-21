import visit from 'unist-util-visit';
import h from 'hastscript';
// import hastFromParse5 from 'hast-util-from-parse5';
// import hastToHTML from 'hast-util-to-html';
// import parse5 from 'parse5';

export default function wrapAccordion(options = { questionTagName: 'h3' }) {
  let isAccordion = false;
  let accordion;
  let currentQuestion;
  return function transformer(tree) {
    tree.children.forEach(node => {
      processComment(node);
      isAccordion && processAccordionElements(node);
    });
  }

  function beginQuestion(node) {
    currentQuestion = h('div.accordion-item', [
      h('div.accordion-item-question', 
        { onclick: 'accordionOpenAnswer(event, this)' }, Object.assign({}, node)),
      h('div.accordion-item-answer', []),
    ]);
  }

  function finishQuestion() {
    // end of question, push current question to accordion
    accordion.children.push(currentQuestion);
    currentQuestion = undefined;
  }

  function clearNode(node) {
    node.type = 'text',
    node.value = '';
    node.children = [];
  }

  function processAccordionElements(node) {
    if(currentQuestion && node.tagName === options.questionTagName) {
      finishQuestion();
    }
    if(!currentQuestion && node.tagName === options.questionTagName) {
      beginQuestion(node);
    } else if(currentQuestion) {
      // push answer line to item-answer container
      currentQuestion.children[1].children.push(Object.assign({}, node));
    }
    clearNode(node);
  }

  function processComment(node) {
    if (node.type === 'comment') {
      if (node.value.trim().startsWith('accordion:start')) {
        isAccordion = true;
        // start accordion section
        accordion = h('div.accordion-container', [
          // all accordion-items will be pushed here
        ]);
      }

      if (node.value.trim().startsWith('accordion:end')) {
        isAccordion = false;
        if(currentQuestion) {
          finishQuestion();
        }
        // write accordion section and remove accordion
        Object.assign(node, accordion);
      }
    }
  }

  // function wrapHtml(node) {
  //   let nodeHTML = hastToHTML(node);
  //   console.log('node before', nodeHTML);
  //   modifiers.forEach((tpl) => {
  //     nodeHTML = tpl.replace(textMarker, nodeHTML);
  //   });
  //   // clear attributes for next run
  //   modifiers = [];

  //   const htmlAST = parse5.parse(String(nodeHTML), {sourceCodeLocationInfo: false})
  //   const newNode = hastFromParse5(htmlAST, {file: nodeHTML}).children[0];
    
  //   Object.assign(node, newNode);
  // }
}