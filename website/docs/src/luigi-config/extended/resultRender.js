import Hogan from 'hogan.js';

const suggestionTemplate = `
       <div class="ds-suggestion" role="option" id="option-27550019" aria-selected="true">
        <a class="algolia-docsearch-suggestion algolia-docsearch-suggestion__main algolia-docsearch-suggestion__secondary" aria-label="Link to the result"  style="white-space: normal;">
          <div class="algolia-docsearch-suggestion--category-header">
              <span class="algolia-docsearch-suggestion--category-header-lvl0">
               {{title1}}
              </span>
          </div>
          <div class="algolia-docsearch-suggestion--wrapper">
            <div class="algolia-docsearch-suggestion--subcategory-column">
              <span class="algolia-docsearch-suggestion--subcategory-column-text">{{title2}}</span>
            </div>
            <div class="algolia-docsearch-suggestion--content">
              <div class="algolia-docsearch-suggestion--subcategory-inline">{{title2}}</div>
              <div class="algolia-docsearch-suggestion--title">{{title3}}</div>
              <div class="algolia-docsearch-suggestion--text">{{description}}</div>
            </div>
          </div>
        </a>
    </div>
        `;

const empty =`
  <div class="algolia-docsearch">
    <div class="algolia-docsearch--wrapper">
        <div class="algolia-docsearch--content algolia-docsearch--no-results">
            <div class="algolia-docsearch--title">
                <div class="algolia-docsearch--text">
                    No results found for query <b>"{{query}}"</b>
                </div>
            </div>
        </div>
    </div>
  </div>
  `;


export default class ResultRender {

  constructor(query, results) {
    this.query = query;
    this.results = results;
  }

  buildDomResults(){
    let domItems = this.buildContainer();
    if (this.results.length === 0) {
      this.domEmpty(domItems.resultSpan);
    }else{
      this.domResults(domItems.resultSpan);
    }

    return domItems.container;
  }


  domResults(span){
    let template = Hogan.compile(suggestionTemplate);
    for (let result of this.results){
      let data = this.dataTemplate(result);
      let html = this.renderResult(template, data);
      let searchItem = this.htmlToElement(html);
      this.attachItemEvents(searchItem, result);
      span.appendChild(searchItem);
    }
  }

  domEmpty(span){
    let template = Hogan.compile(empty);
    let data = {query: this.query};
    let output = template.render(data);
    let searchItem = this.htmlToElement(output);
    span.appendChild(searchItem);
  }




  shortDescription(description){
    let short = description;
    if (short.length > 80){
      let lastPost = description.substring(80).indexOf(" ") + 80;
      short = description.substring(0, lastPost)+".."
    }
    return short;
  }

  dataTemplate(result){
    let description = this.shortDescription(result.description);
    let data = {
      label: result.label,
      description: description,
      title1: result.title1,
      title2: result.title2,
      title3: result.title3,
    };

    return data;
  }

  renderResult(template, data){
    let output = template.render(data);
    this.perm(this.query).forEach(subQ => {
      let replace = '<span class="algolia-docsearch-suggestion--highlight">'+ subQ+ '</span>';
      output = output.replaceAll(subQ, replace);
    })
    return output;
  }

  attachItemEvents(searchItem, result){
    searchItem.addEventListener('click', e => {
      e.preventDefault();
      Luigi.navigation().withParams(result.pathObject.params).navigate(result.pathObject.link);
      Luigi.globalSearch().closeSearchResult();
      Luigi.globalSearch().clearSearchField();
    });

    searchItem.addEventListener('mouseover', e => {
      e.preventDefault();
      searchItem.set
      searchItem.classList.add("ds-cursor");

    });

    searchItem.addEventListener('mouseout', e => {
      e.preventDefault();
      searchItem.classList.remove("ds-cursor");
    });

  }

  buildContainer(){
    let span = this.createAttribute('span', {
      "class": "algolia-autocomplete algolia-autocomplete-right",
      "style": "position: relative; display: inline-block; direction: ltr;"});

    let span_ = this.createAttribute('span', {
      "class": "ds-dropdown-menu ds-with-1",
      "role": "listbox",
      "id" : "algolia-autocomplete-listbox-0",
      "style": "position: absolute; top: 100%; z-index: 100; left: 0px; right: auto; display: block;"
    });

    let div_1 = this.createAttribute('div', {"class":"ds-dataset-1"});
    let span_11 = this.createAttribute('span', {"class": "ds-suggestions","style": "display: block;"});

    span.appendChild(span_);
    span_.appendChild(div_1);
    div_1.appendChild(span_11);

    return {
      container: span,
      resultSpan : span_11
    };
  }

  createAttribute(type, attributes){
    let elem =  document.createElement(type);
    if (!attributes){
      return elem;
    }

    Object.keys(attributes).forEach(key => elem.setAttribute(key, attributes[key]))
    return elem;
  }

  htmlToElement(html) {
    return new DOMParser().parseFromString(html, "text/html").body.firstChild;
  }

  perm(str){
    let results = [];
    let arr = str.split("");
    let len = Math.pow(arr.length, 2);

    for( let i = 0; i < len; i++ ){
      for( let k= 0, j = i; k < arr.length; k++, j >>=1){
        arr[k] = ( j & 1 ) ? arr[k].toUpperCase() : arr[k].toLowerCase();
      }
      let combo = arr.join("");
      results.push(combo);
    }
    return results;
  }

  createAttribute(type, attributes){
    let elem =  document.createElement(type);
    if (!attributes){
      return elem;
    }

    Object.keys(attributes).forEach(key => elem.setAttribute(key, attributes[key]))
    return elem;
  }


}


