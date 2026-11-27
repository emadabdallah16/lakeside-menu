/* Edit items and prices here. A null price is hidden, not invented.
   Images are decorative; edited photo provenance is recorded in assets/README.md. */
window.LAKESIDE_MENU = {
  brand: 'Lakeside Convenience',
  screen1: {
    title: 'Strawberry cups, Sahlab, ice cream & waffle sticks',
    cups: [
      {
        name: 'Belgian Chocolate Strawberry Cup', price: '$9',
        note: 'Strawberries & Belgian Milk Chocolate',
        image: 'assets/chocolate-strawberry-cup-photo.png'
      },
      {
        name: 'Dubai Chocolate Strawberry Cup', price: '$13',
        note: 'Strawberries, Belgian Milk Chocolate, Pistachio Cream, Kataifi',
        image: 'assets/pistachio-strawberry-cup-photo.png'
      }
    ],
    drink: {
      name: 'Sahlab', price: '$4',
      note: 'Warm, rich Mediterranean milk drink with cinnamon, coconut and pistachio topping',
      sticker: 'Perfect for Winter!',
      image: 'assets/sahlab.png'
    },
    scoops: {
      name: 'Ice Cream',
      caption: 'Best-Priced Scoops in Sylvan Lake!',
      sizes: [
        { name: 'Kids Scoop', price: '$2.99' },
        { name: '1 Scoop', price: '$3.99' },
        { name: '2 Scoops', price: '$6.99' },
        { name: '3 Scoops', price: '$8.99' }
      ],
      addons: [
        { name: 'Waffle cone', price: '+$1.5' },
        { name: 'Fudge', price: '+$1' },
        { name: 'Toppings (up to 3)', price: '+$1.5' }
      ]
    },
    waffles: {
      name: 'Waffle Sticks', image: 'assets/waffle-stick.png',
      options: [
        { name: 'Belgian', note: 'Milk Chocolate, Oreo Crumb, White Drizzle', price: '$6' },
        { name: 'Biscoff', note: 'Biscoff Sauce, Biscoff Crumb, White Drizzle', price: '$6' },
        { name: 'Dubai Chocolate', note: 'Milk Chocolate, Pistachio Sauce, Kataifi, Crushed Pistachios', price: '$7' }
      ]
    },
    buildYourOwn: {
      sauceHeading: 'Sauces (Up to 2 + 1 Drizzle)',
      toppingHeading: 'Toppings (Up to 3)',
      name: 'Build-Your-Own Waffle Stick', price: '$7.5',
      sauces: [
        'Milk Chocolate', 'White Chocolate', 'Nutella',
        'Dark Chocolate', 'Pistachio', 'Biscoff', 'Caramel', 'Maple Syrup', 'Strawberry'
      ],
      recommendedSauces: ['Milk Chocolate', 'White Chocolate'],
      recommendationLabel: 'Recommended',
      toppings: ['Oreo Crumb', 'Biscoff Crumb', 'Pistachio', 'Marshmallow', 'M&Ms', 'Sprinkles']
    }
  }
};
