  const template = document.createElement('template');
  template.innerHTML = `<style>
    figure {
      color:#eaebed;
      font-family:'VCR OSD Mono';
      margin:0;
      padding:0;
      position:relative;
    }

    figure img {
      display:block;
      max-width:100%;
      height:auto;
    }

    figure figcaption {
      background-color:rgba(0,0,0,.3);
      font-size:smaller;
      left:50%;
      padding:.2rem 0;
      position:absolute;
      text-align:center;
      text-transform:uppercase;
      top:50%;
      transform:translate(-50%, -50%);
      width:100%;
    }

    time {
      background-color:rgba(0,0,0,.7);
      border-radius:2px;
      position:absolute;
      bottom:.5rem;
      right:.5rem;
      font-size:.8rem;
      padding:1px 2px;
    }

    ul {
      padding:0;
    }

    li {
      background-color:#2b3942;
      border-radius:3px;
      color:#888;
      display:inline;
      font-size:smaller;
      font-weight:bolder;
      margin-right:.4rem;
      padding:3px 3px 1px 3px;
    }
    </style>

    <a class="videoUrl">
      <figure>
        <img class="coverUrl"/>
        <figcaption class="title"></figcaption>
        <time class="length"></time>
      </figure>
    </a>
    <ul class="tags"></ul>
    </slot>
    <p class="description"></p>`;

class Cassette extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({mode: 'open'});
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);

    const cassetteId = shadowRoot.host.getAttribute('data-cassette-id');
    fetch('cassettes.json')
      .then(res => res.json())
      .then(cassettes => this.render(cassettes[cassetteId]))
      .catch(console.log.bind(console));
  };

  render(cassette) {
    this.shadowRoot.querySelector('.videoUrl').href = cassette.videoUrl;
    this.shadowRoot.querySelector('.coverUrl').src = cassette.coverUrl;
    this.shadowRoot.querySelector('.title').innerHTML = cassette.title;
    for(const tag of cassette.tags) {
      const item = document.createElement('li');
      item.innerHTML = tag;
      this.shadowRoot.querySelector('.tags').appendChild(item);
    }
    this.shadowRoot.querySelector('.length').innerHTML = cassette.length;
    this.shadowRoot.querySelector('.description').innerHTML = cassette.description;
  }
}

window.customElements.define('vhs-cassette', Cassette);
