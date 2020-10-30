class Modal extends HTMLElement {
  connectedCallback() {
    const button = this.querySelector('button');
    button.addEventListener('click', function(e) {
      e.target.closest('vhs-modal').remove();
    });
  }
}

window.customElements.define('vhs-modal', Modal);
