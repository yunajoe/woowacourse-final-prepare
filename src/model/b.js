purchaseProducts({ productName, productAmount }) {
  const grouped = groupingData(this.products)[productName];

  const promoProduct = grouped.find(p => p.promotion !== null);
  if (!promoProduct) {
    return { productName, productAmount, freeCount: 0 };
  }

  const promotionName = promoProduct.promotion;

  const promotionsRaw = loadData('public/promotions.md');
  const promotions = parsePromotionData(promotionsRaw);
  const promotion = promotions[promotionName];

  if (!promotion) {
    return { productName, productAmount, freeCount: 0 };
  }

  const { buy, get, startDate, endDate } = promotion;

  if (!this.isPromotionPeriod(startDate, endDate)) {
    return { productName, productAmount, freeCount: 0 };
  }

  // 🔥 여기부터 완전 범용
  const unit = buy + get;
  const freeCount = Math.floor(productAmount / unit) * get;
  const payCount = productAmount - freeCount;

  return {
    productName,
    productAmount,
    payCount,
    freeCount,
    promotionName,
  };
}
