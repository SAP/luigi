import { h } from 'hastscript';
// import hastFromParse5 from 'hast-util-from-parse5';
// import hastToHTML from 'hast-util-to-html';
// import parse5 from 'parse5';

export default function wrapAccordion(options = { questionTagName: 'h3' }) {
  let settings = getDefaultSettings();
  let isAccordion = false;
  let accordion;
  let currentQuestion;
  return function transformer(tree) {
    tree.children.forEach(node => {
      processComment(node);
      isAccordion && processAccordionElements(node);
    });
  };

  function getDefaultSettings() {
    return Object.assign(
      {},
      {
        defaultState: ''
      }
    );
  }

  function beginQuestion(node) {
    currentQuestion = h('div.accordion-item', { class: settings.defaultState }, [
      h('dt.accordion-item-title', { onclick: 'accordionToggle(event, this)' }, Object.assign({}, node)),
      h('dd.accordion-item-content', [])
    ]);
  }

  function finishQuestion() {
    // end of question, push current question to accordion
    accordion.children.push(currentQuestion);
    currentQuestion = undefined;
  }

  function clearNode(node) {
    (node.type = 'text'), (node.value = '');
    node.children = [];
  }

  function storeSettings(str) {
    const keyValues = str.split(' ');
    const options = keyValues.map(kv => ({ key: kv.split(':')[0], value: kv.split(':')[1] }));
    for (const opt of options) {
      settings[opt.key] = opt.value;
    }
  }

  function processAccordionElements(node) {
    if (currentQuestion && node.tagName === options.questionTagName) {
      finishQuestion();
    }

    if (!currentQuestion && node.tagName === options.questionTagName) {
      beginQuestion(node);
    } else if (currentQuestion) {
      // push answer line to item-answer container
      currentQuestion.children[1].children.push(Object.assign({}, node));
    }
    clearNode(node);
  }

  function processComment(node) {
    if (node.type === 'comment') {
      if (node.value.trim().startsWith('accordion:start')) {
        isAccordion = true;
        storeSettings(node.value.trim());

        // start accordion section
        accordion = h('dl.accordion-container', [
          // all accordion-items will be pushed here
        ]);
      }

      if (node.value.trim().startsWith('accordion:end')) {
        // reset
        isAccordion = false;
        settings = getDefaultSettings();

        if (currentQuestion) {
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
