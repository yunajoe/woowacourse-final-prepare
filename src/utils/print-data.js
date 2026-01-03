export const printProductsData = data => {
  for (const [key, values] of Object.entries(data)) {
    values.forEach(value => {
      let line = '';
      const { name, price, count, promotion } = value;
      line = `- ${name} ${price}원 ${count}개 ${promotion && promotion}`;
      console.log(line);
    });
  }
};
