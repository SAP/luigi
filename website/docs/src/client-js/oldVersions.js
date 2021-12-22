export class OldVersions {
  init() {
    const oldVersionItems = document.querySelectorAll('div.oldverdrop');
    oldVersionItems.forEach(item => {
      const select = document.createElement('select');
      select.addEventListener('focus', ev => {
        alert(1);
      });
      item.appendChild(select);
    });
  }
}
