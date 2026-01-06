import OutputView from '../view/output-view.js';

// 주문한 메뉴를 저장
class MenuModel {
  constructor(menus) {
    this.menus = menus;
  }

  printMenuList() {
    const arr = this.menus.split(',').map(item => item.trim());
    const result = arr.map(menu => {
      let menuObject = {};
      const [menuName, menuCount] = menu.split('-');
      menuObject = {
        menu: menuName,
        count: Number(menuCount),
      };
      return menuObject;
    });
    OutputView.printMenu(result);
  }
}

export default MenuModel;
