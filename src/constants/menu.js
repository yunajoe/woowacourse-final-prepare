export const MENU_DOMAIN = {
  양송이수프: 'appetizer',
  타파스: 'appetizer',
  시저샐러드: 'appetizer',
  티본스테이크: 'main',
  바비큐립: 'main',
  해산물파스타: 'main',
  크리스마스파스타: 'main',
  초코케이크: 'dessert',
  아이스크림: 'dessert',
  제로콜라: 'drink',
  레드와인: 'drink',
  샴페인: 'drink',
};

export const MENU = Object.freeze({
  appetizer: {
    양송이수프: 6000,
    타파스: 5500,
    시저샐러드: 8000,
  },
  main: {
    티본스테이크: 55000,
    바비큐립: 54000,
    해산물파스타: 35000,
    크리스마스파스타: 25000,
  },
  dessert: {
    초코케이크: 15000,
    아이스크림: 5000,
  },
  drink: {
    제로콜라: 3000,
    레드와인: 60000,
    샴페인: 25000,
  },
});
