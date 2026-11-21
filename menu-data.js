/* Edit items and prices here. A null price is hidden, not invented.
   Feature images are decorative illustrations; replace them with your own artwork if desired. */
window.LAKESIDE_MENU = {
  brand: 'Lakeside',
  subtitle: 'CONVENIENCE / DESSERT BAR',
  screen1: {
    title: 'Ice cream', emphasis: '& waffles',
    feature: {
      name: 'Scoop Ice Cream', price: '$2.99',
      note: 'Single scoop • Choose your flavour',
      image: 'assets/scoop-illustration.jpg'
    },
    cards: [
      { image: 'assets/bubble-waffle.png', name: 'Bubble Waffle Cup', note: 'Warm bubble waffle + ice cream', price: null },
      { image: 'assets/ice-cream-taco.png', name: 'Ice Cream Taco', note: 'A waffle-cone twist', price: null },
      { image: 'assets/cookie-dough-sundae.png', name: 'Cookie Dough Sundae', note: 'Vanilla, cookie dough + fudge', price: null },
      { image: 'assets/cookie-sandwich.png', name: 'Big Cookie Sandwich', note: 'Ice cream between cookies', price: null }
    ],
    footer: [
      { image: 'assets/waffle-cone.png', name: 'Waffle cone upgrade', price: '+$1.25' },
      { image: 'assets/waffle-bowl.png', name: 'Waffle bowl upgrade', price: '+$2.50' }
    ]
  },
  screen2: {
    title: 'Sweet', emphasis: 'creations',
    feature: {
      name: 'Dubai Chocolate Cup', price: '$6.99',
      note: 'Pistachio • crunchy kataifi • chocolate',
      image: 'assets/dubai-cup-illustration.jpg'
    },
    cards: [
      { image: 'assets/strawberry-cup.png', name: 'Belgian Chocolate Strawberry Cup', note: 'Fresh strawberries + chocolate', price: '$6.99' },
      { image: 'assets/dubai-ice-cream.png', name: 'Dubai Ice Cream', note: 'Pistachio + kataifi crunch', price: '$6.99' },
      { image: 'assets/milkshake.png', name: 'Milkshakes', note: 'Nutella • Biscoff • Strawberry • Banana', price: '$6.99' },
      { image: 'assets/hot-chocolate-sahlab.png', name: 'Hot Chocolate & Sahlab', note: 'Cozy up with something warm', price: '$6.99' }
    ],
    footer: [
      { name: 'Ask about seasonal flavours', price: null },
      { name: 'Made fresh to order', price: null }
    ]
  }
};
