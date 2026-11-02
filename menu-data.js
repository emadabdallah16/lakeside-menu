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
      { name: 'Bubble Waffle Cup', note: 'Warm bubble waffle + ice cream', price: null },
      { name: 'Ice Cream Taco', note: 'A waffle-cone twist', price: null },
      { name: 'Cookie Dough Sundae', note: 'Vanilla, cookie dough + fudge', price: null },
      { name: 'Big Cookie Sandwich', note: 'Ice cream between cookies', price: null }
    ],
    footer: [
      { name: 'Waffle cone upgrade', price: '+$1.25' },
      { name: 'Waffle bowl upgrade', price: '+$2.50' }
    ]
  },
  screen2: {
    title: 'Sweet', emphasis: 'creations',
    feature: {
      name: 'Dubai Chocolate Cup', price: null,
      note: 'Pistachio • crunchy kataifi • chocolate',
      image: 'assets/dubai-cup-illustration.jpg'
    },
    cards: [
      { name: 'Chocolate Strawberry Cup', note: 'Fresh strawberries + chocolate', price: null },
      { name: 'Dubai Ice Cream', note: 'Pistachio + kataifi crunch', price: null },
      { name: 'Milkshakes', note: 'Nutella • Biscoff • Strawberry • Banana', price: null },
      { name: 'Hot Chocolate & Sahlab', note: 'Cozy up with something warm', price: null }
    ],
    footer: [
      { name: 'Ask about seasonal flavours', price: null },
      { name: 'Made fresh to order', price: null }
    ]
  }
};
