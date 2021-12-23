export class OldVersions {
  init() {
    const oldVersionItems = document.querySelectorAll('select.oldverdrop');
    oldVersionItems.forEach(item => {
      item.addEventListener('focus', ev => {
        alert(1);
      });
    });
  }
}
