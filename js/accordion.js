const classHeader = 'questions_active';
const classBody = 'questions_content';
const classActive = 'questions_content_active';

const accordions = document.querySelector('.accordions');
const items = accordions.querySelectorAll('.questions_accordion');

function closeAll(items, current) {
  Array.prototype.forEach.call(
    Array.prototype.filter.call(items, item => item != current),
    item => item.querySelector(`.${classBody}`).classList.remove(classActive)
  );
}

Array.prototype.forEach.call(items, item => {
  const header = item.querySelector(`.${classHeader}`);
  const body = item.querySelector(`.${classBody}`);
  header.addEventListener('click', () => {
    body.classList.toggle(classActive);
    if (body.classList.contains(classActive)) {
      closeAll(items, item);
    }
  });
});