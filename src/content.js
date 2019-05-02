import './content.css';

const BTN_TOGGLE = 'jw-btn-toggle';
const DOTS = 'jw-dots';
const COLLAPSED = 'jw-collapsed';
const VIEWER = 'jw-viewer';
const BODY = 'jw-body';
const PRE = 'jw-pre';

const bindToggleClicked = () => {
  document.addEventListener('click', evt => {
    const $elm = evt.target;
    const $classList = $elm.parentNode.classList;
    const hasClass = params => $elm.classList.contains(params);
  
    if (!hasClass(BTN_TOGGLE) && !hasClass(DOTS)) {
      return;
    }

    if (!$classList.contains(COLLAPSED)) {
      $classList.add(COLLAPSED);
    } else {
      $classList.remove(COLLAPSED);
    }
  });
}

const prepare = (content) => {
  const port = chrome.runtime.connect({name: 'knockknock'});
  port.postMessage({body: content});
  port.onMessage.addListener(function(msg) {
    const node = document.createElement('div');

    node.classList.add(VIEWER);
    node.innerHTML = msg.body;
    document.body.appendChild(node);
  });
};

const onLoad = () => {
  const firstChild = document.body.firstChild;
  const nodeName = firstChild.nodeName.toLowerCase();

  if (!nodeName === 'pre' || document.body.childElementCount != 1) {
    return;
  };

  document.body.classList.add(BODY);
  firstChild.classList.add(PRE);

  const content = JSON.parse(firstChild.innerText);
  prepare(content);
  bindToggleClicked();
};

window.addEventListener('load', onLoad);
