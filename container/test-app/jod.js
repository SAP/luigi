function html(literal) {
  return literal;
}

class LuigiElement extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement('template');
    template.innerHTML = this.render ? this.render() : '';
    this._shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: false });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  querySelector(selector) {
    return this._shadowRoot.querySelector(selector);
  }

  set context(ctx) {
    if (this.onContextUpdate) {
      this.onContextUpdate(ctx);
    }
    this.attributeChangedCallback();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (this.update) {
      this.update();
    }
  }
}
class jokeWebComponent extends LuigiElement {
  constructor() {
    super();
    this.$button = this.querySelector('#update');
    this.$button.addEventListener('click', () => {
      this.rotateButton(true);
      this.getJoke();
    });

    this.$jokeCnt = this.querySelector('.jokecontainer');
    this.addEventListener('update', ev => {
      this.getJoke();
    });
  }

  onContextUpdate(ctx) {
    this.replaceChuckWith = ctx.replaceChuck;
    if (ctx.apiUrl) {
      this.apiUrl = ctx.apiUrl;
      this.getJoke();
    }
    if (ctx.fontScale) {
      var ratio = parseFloat(ctx.fontScale);
      if (!isNaN(ratio)) {
        this.querySelector('.fd-section__title').setAttribute('style', `font-size:${ratio * 2}em`);
        this.querySelector('.fd-panel').setAttribute('style', `font-size:${ratio * 3}em`);
      }
    }
  }

  /* Not used
    update() {
    }
    */
  replaceChuck(str) {
    if (this.replaceChuckWith) {
      return str.replaceAll('Chuck Norris', this.replaceChuckWith);
    } else {
      return str;
    }
  }

  getJoke() {
    let replaceChuck = this.replaceChuck.bind(this);
    if (this.apiUrl) {
      fetch(this.apiUrl)
        .then(response => response.json())
        .then(data => {
          // clear container
          const parent = this.$jokeCnt;
          parent.innerHTML = '';
          clearTimeout(this.answerTO);

          if (data.type === 'single') {
            parent.innerHTML = replaceChuck('<p>' + data.joke + '</p>');
          } else if (data.type === 'twopart' || data.punchline) {
            parent.innerHTML = replaceChuck('<p>' + data.setup + '</p>');
            setTimeout(function() {
              parent.innerHTML += replaceChuck('<p>' + (data.delivery || data.punchline) + '</p>');
            }, 5000);
          } else {
            const qa_data = data.text.split('A: ');
            if (qa_data.length > 1) {
              parent.innerHTML = replaceChuck('<p>' + qa_data[0] + '</p>');
              this.answerTO = setTimeout(function() {
                parent.innerHTML += replaceChuck('<p>A: ' + qa_data[1] + '</p>');
              }, 5000);
            } else {
              parent.innerHTML = replaceChuck('<p>' + data.text + '</p>');
            }
          }
          this.rotateButton(false);
        });
    }
  }

  rotateButton(rotate) {
    if (rotate) {
      this.$button.classList.add('rotate');
    } else {
      this.$button.classList.remove('rotate');
    }
  }

  render() {
    return html`
      <style>
        @keyframes rotation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-359deg);
          }
        }
        .rotate {
          animation: rotation 0.7s infinite linear;
        }
      </style>
      <div
        style="-webkit-font-smoothing: antialiased; color: var(--sapTextColor, #515559); padding: 20px; white-space: initial;"
      >
        <div class="fd-section__header">
          <h1 class="fd-section__title" data-testid="jotd">
            Joke Of The Day &nbsp; <span id="update" style="cursor: pointer; display: inline-block;">&#8634;</span>
          </h1>
          <p id="joke-title" style="font-weight: bold;"></p>
        </div>
        <div class="fd-panel" style="font-size: 3em;">
          <div style="padding: 1em; background: var(--sapTile_Background, white)" class="jokecontainer"></div>
        </div>
      </div>
    `;
  }
}
window.Luigi._registerWebcomponent(new URL(document.currentScript?.getAttribute('src'), location), jokeWebComponent);
