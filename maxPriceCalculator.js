module.exports = (optlyInstance, location) => {
  const userId = Math.round(Math.random() * 100).toString();

  const normalLandPrice = 100;
  const normalSeaPrice = 250;

  let actualLandPrice = normalLandPrice;
  let actualSeaPrice = normalSeaPrice;

  const isSeaPriceHikeActivated = optlyInstance
    .isFeatureEnabled('bikini_bottom_price_hike', userId, { location });
  if (isSeaPriceHikeActivated) {
    actualSeaPrice += 100;
  }

  const isLandPriceHikeActivated = optlyInstance
    .isFeatureEnabled('texas_price_hike', userId, { location });
  if (isLandPriceHikeActivated) {
    actualLandPrice += 200;
  }

  const subtotal = location === 'land' ? actualLandPrice : actualSeaPrice;

  const isSaleActivated = optlyInstance
    .isFeatureEnabled('sale_promo', userId, { location });
  if (isSaleActivated) {
    return `$${ Math.round(subtotal * 0.8) }.00 (20% off!)`;
  }

  return `$${ subtotal }.00`;
};
