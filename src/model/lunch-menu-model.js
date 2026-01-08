import { Console, MissionUtils } from '@woowacourse/mission-utils';
import { parseDataList, parseFoodCategory, returnDayName } from '../utils/parse-data.js';
import InputView from '../view/input-view.js';

class LunchMenuModel {
  constructor() {
    this.coachNameList = null; // [ '토미', '제임스', '포코' ]
    this.categoryFoodObject = null; // [{월:"한식"}, {화:"중식"}]
    this.nonMenuRecommandObject = null; // {토미:[우동, 스시], 제임스:[뇨끼,월남쌈..]}
    this.menuRecommandObject = null;
  }

  getCoachNameList(names) {
    const namesArr = parseDataList(names);
    this.coachNameList = namesArr;
  }

  async getNonMenuRecommandList() {
    const recommandObject = {};
    for (let i = 0; i < this.coachNameList.length; i++) {
      const name = this.coachNameList[i];
      const input = await InputView.readRestrictedFood(name);
      const trimmedInput = input.trim();
      const restrictedFoods = parseDataList(trimmedInput);
      recommandObject[name] = restrictedFoods;
    }
    this.nonMenuRecommandObject = recommandObject;
  }
  getFoodCategoryList() {
    const cateGoryNums = parseFoodCategory();
    const cateGoryFood = returnDayName(cateGoryNums);
    this.categoryFoodObject = cateGoryFood;
    const values = Object.values(this.categoryFoodObject);
    Console.print(`[ 카테고리 | ${values.join(' | ')} ]`);
  }

  getMenuRecommandList(parseObject) {
    const categoryMenus = Object.values(this.categoryFoodObject); // [아시안, 한식, 아시안, 중식, 양식 ]
    const recommandObject = {};
    for (let i = 0; i < this.coachNameList.length; i++) {
      const coachName = this.coachNameList[i];
      const nonRecommanList = this.nonMenuRecommandObject[coachName];

      if (!recommandObject[coachName]) {
        recommandObject[coachName] = [];
      }

      for (let j = 0; j < categoryMenus.length; j++) {
        const category = categoryMenus[j];
        const targetMenuList = parseObject[category];
        const targetMenuArray = Array.from({ length: targetMenuList.length }, (_, index) => index);
        while (true) {
          const selectedMenuIndex = MissionUtils.Random.shuffle(targetMenuArray)[0];
          const selectedMenu = targetMenuList[selectedMenuIndex];
          const selectedMenuList = recommandObject[coachName];
          if (!nonRecommanList.includes(selectedMenu) && !selectedMenuList.includes(selectedMenu)) {
            recommandObject[coachName].push(selectedMenu);
            break;
          }
        }
      }
    }
    this.menuRecommandObject = recommandObject;
    for (const [key, value] of Object.entries(this.menuRecommandObject)) {
      console.log(`[ ${key} | ${value.join(' | ')} ] `);
    }
  }
}

export default LunchMenuModel;
