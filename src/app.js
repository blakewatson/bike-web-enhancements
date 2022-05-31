const INDENT_EM = 2.1;

main();

function main() {
  addDetailsElements();
  handleExtraIndents();
  insertHeaderMenu();
  handlePageSizing();
  handleFontSizing();
  handleColorTheme();
}

function addDetailsElements() {
  const ul = document.querySelector('ul');
  const html = getModifiedTree(ul);
  ul.innerHTML = html;
}

function getModifiedTree(root = null) {
  root = root || document.querySelector('body > ul');

  const items = Array.from(root.querySelectorAll(':scope > li'));

  const html = items.map((item) => {
    const ul = item.querySelector(':scope > ul');
    const attrs = getAttributesString(item.attributes);

    // no children, return the list item
    if (!ul) {
      return `<li class="no-children" ${attrs}>${item.innerHTML}</li>`;
    }

    // get the summary text
    const text = item.querySelector('p').innerHTML;

    // return a collapsible ul
    return `
      <li ${attrs}>
        <details open>
          <summary>${text}</summary>

          <ul>
            ${getModifiedTree(ul)}
          </ul>
        </details>
      </li>
    `;
  }).join('\n');

  return html;
}

function getAttributesString(attrs) {
  return Array.from(attrs)
    .map(attr => `${attr.nodeName}="${attr.nodeValue}"`)
    .join(' ');
}

function handleExtraIndents() {
  const items = Array.from(document.querySelectorAll('li[indent]'));
  
  items.forEach(item => {
    const indent = item.getAttribute('indent');

    if (!indent) {
      return;
    }

    const num = parseInt(indent) - 1;

    if (!num) {
      return;
    }

    item.style.marginLeft = `${num * INDENT_EM}em`;
  });
}

function handleFontSizing() {
  const body = document.querySelector('body');
  const fontSize = parseFloat(window.getComputedStyle(body).getPropertyValue('font-size'));
  const input = document.querySelector('.font-size');
  input.value = fontSize;

  input.addEventListener('input', event => {
    const root = document.querySelector('body > ul');
    const val = parseInt(event.target.value);
    root.style.fontSize = `${val}px`;
  })
}

function handlePageSizing() {
  const input = document.querySelector('.page-size');

  input.addEventListener('input', (event) => {
    const val = parseInt(event.target.value);
    const ul = document.querySelector('body > ul');
    ul.style.width = `${val}%`;
  })
}

function handleColorTheme() {
  const inputs = Array.from(document.querySelectorAll('[name="theme"]'));
  inputs.forEach(input => {
    input.addEventListener('input', (event) => {
      const val = event.target.value;
      const html = document.querySelector('html');

      if (val === 'auto') {
        html.removeAttribute('data-theme');
      } else {
        html.setAttribute('data-theme', val);
      }
    });
  })
}

function insertHeaderMenu() {
  const cogSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M168 255.1C168 207.4 207.4 167.1 256 167.1C304.6 167.1 344 207.4 344 255.1C344 304.6 304.6 344 256 344C207.4 344 168 304.6 168 255.1zM256 199.1C225.1 199.1 200 225.1 200 255.1C200 286.9 225.1 311.1 256 311.1C286.9 311.1 312 286.9 312 255.1C312 225.1 286.9 199.1 256 199.1zM65.67 230.6L25.34 193.8C14.22 183.7 11.66 167.2 19.18 154.2L49.42 101.8C56.94 88.78 72.51 82.75 86.84 87.32L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L194.5 25.16C197.7 10.47 210.7 0 225.8 0H286.2C301.3 0 314.3 10.47 317.5 25.16L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L425.2 87.32C439.5 82.75 455.1 88.78 462.6 101.8L492.8 154.2C500.3 167.2 497.8 183.7 486.7 193.8L446.3 230.6C447.4 238.9 448 247.4 448 255.1C448 264.6 447.4 273.1 446.3 281.4L486.7 318.2C497.8 328.3 500.3 344.8 492.8 357.8L462.6 410.2C455.1 423.2 439.5 429.2 425.2 424.7L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L317.5 486.8C314.3 501.5 301.3 512 286.2 512H225.8C210.7 512 197.7 501.5 194.5 486.8L182.8 433.6C167 427 152.2 418.4 138.8 408.1L86.84 424.7C72.51 429.2 56.94 423.2 49.42 410.2L19.18 357.8C11.66 344.8 14.22 328.3 25.34 318.2L65.67 281.4C64.57 273.1 64 264.6 64 255.1C64 247.4 64.57 238.9 65.67 230.6V230.6zM158.4 129.2L145.1 139.5L77.13 117.8L46.89 170.2L99.58 218.2L97.39 234.8C96.47 241.7 96 248.8 96 255.1C96 263.2 96.47 270.3 97.39 277.2L99.58 293.8L46.89 341.8L77.13 394.2L145.1 372.5L158.4 382.8C169.5 391.4 181.9 398.6 195 403.1L210.5 410.4L225.8 480H286.2L301.5 410.4L316.1 403.1C330.1 398.6 342.5 391.4 353.6 382.8L366.9 372.5L434.9 394.2L465.1 341.8L412.4 293.8L414.6 277.2C415.5 270.3 416 263.2 416 256C416 248.8 415.5 241.7 414.6 234.8L412.4 218.2L465.1 170.2L434.9 117.8L366.9 139.5L353.6 129.2C342.5 120.6 330.1 113.4 316.1 108L301.5 101.6L286.2 32H225.8L210.5 101.6L195 108C181.9 113.4 169.5 120.6 158.4 129.2H158.4z"/></svg>';
  const menu = document.createElement('details');
  menu.classList.add('menu-wrapper');
  menu.innerHTML = `
    <summary><span class="screen-reader-text">Menu</span><span role="presentation">${cogSvg}</span></summary>

    <div class="menu">
      <label>Page width (%)<br>
        <input class="page-size" type="number" min="25" max="100" step="1" value="100">
      </label>

      <label>Font size<br>
        <input class="font-size" type="number" min="8" step="1">
      </label>

      <div class="color-theme">
        <p>Color theme:</p>
        <label><input type="radio" name="theme" value="auto" checked> Auto</label>
        <label><input type="radio" name="theme" value="light"> Light</label>
        <label><input type="radio" name="theme" value="dark"> Dark</label>
      </div>
    </div>
  `
  document.body.prepend(menu);
}

