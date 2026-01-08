const RestrictedFoodInputValidate = {
  validate(foods) {
    const foodmap = foods.split(',').map(food => food.trim());
    return foodmap;
  },
};

export default RestrictedFoodInputValidate;
