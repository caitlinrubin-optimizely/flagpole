const homePage = (optlyInstance, req, res) => {
  const userId = '1';

  const location = (
    ['land', 'sea'].includes(req.query.location) ? req.query.location : 'land'
  );

  const isSeaLandingPageActivated = optlyInstance
    .isFeatureEnabled('sea_landing_page', userId, { location });

  let pageData = {};
  if (isSeaLandingPageActivated) {
    pageData = {
      locationName: 'Bikini Bottom',
      locationImageUrl: '/images/seaBackground.jpg',
      amenities: ['The Krusty Krab', 'Goo Lagoon', 'Jellyfish Fields'],
    };
  } else {
    pageData = {
      locationName: 'Texas',
      locationImageUrl: '/images/texasBackground.png',
      amenities: ['Barbeque', 'Pecan Pie'],
    };
  }

  res.render('landing', pageData);
};

module.exports = {
  homePage,
};
