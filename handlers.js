const maxPriceCalculator = require('./maxPriceCalculator');

const homepageData = {
  amenities: {
    barbeque: { src: '/images/barbeque.png', text: 'Barbeque' },
    gooLagoon: { src: '/images/gooLagoon.jpg', text: 'Goo Lagoon' },
    jellyfishFields: { src: '/images/jellyfishFields.png', text: 'Jellyfish Fields' },
    krustyKrab: { src: '/images/krustyKrab.png', text: 'Krusty Krab' },
    pecanPie: { src: '/images/pecanPie.jpg', text: 'Pecan Pie' },
  }
};

const homePage = (optlyInstance, req, res) => {
  const userId = '1';

  const location = (
    ['land', 'sea'].includes(req.query.location) ? req.query.location : 'land'
  );

  const isSeaLandingPageActivated = optlyInstance
    .isFeatureEnabled('sea_landing_page', userId, { location });

  const price = maxPriceCalculator(optlyInstance, location);

  let pageData = {};
  if (isSeaLandingPageActivated) {
    pageData = {
      locationName: 'Bikini Bottom',
      locationImageUrl: '/images/seaBackground.jpg',
      amenities: [
        homepageData.amenities.krustyKrab,
        homepageData.amenities.gooLagoon,
        homepageData.amenities.jellyfishFields,
      ],
      backgroundColor: 'rgba(0, 0, 127, 0.5)',
      accentColor: '#aaf',
      price,
    };
  } else {
    const isPecanPiePromoActivated = optlyInstance
      .isFeatureEnabled('pecan_pie_promo', userId, { location });

    const amenities = [
      homepageData.amenities.barbeque,
    ];

    if (isPecanPiePromoActivated) {
      amenities.push(homepageData.amenities.pecanPie);
    }

    pageData = {
      locationName: 'Texas',
      locationImageUrl: '/images/texasBackground.png',
      amenities,
      backgroundColor: 'rgba(127, 0, 0, 0.5)',
      accentColor: '#faa',
      price,
    };
  }

  res.render('landing', pageData);
};

module.exports = {
  homePage,
};
