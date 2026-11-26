const legacyScreen = new URLSearchParams(location.search).get('screen');
if (legacyScreen === '1' || legacyScreen === '2') {
  location.replace('screen' + legacyScreen + '.html');
}

const screens = Array.from(document.querySelectorAll('nav a'));
function focusMenu() {
  const selected = screens.find(link => link.href === history.state?.selected);
  (selected || screens[0])?.focus();
}
addEventListener('pageshow', focusMenu);
document.querySelector('nav').addEventListener('click', event => {
  const link = event.target.closest('a');
  if (link) history.replaceState({ selected: link.href }, '');
});
document.addEventListener('keydown', event => {
  const steps = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
  if (!(event.key in steps) || !screens.length) return;
  event.preventDefault();
  const next = screens.indexOf(document.activeElement) + steps[event.key];
  screens[Math.max(0, Math.min(next, screens.length - 1))].focus();
});
