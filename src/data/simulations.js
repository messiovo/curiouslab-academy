// src/data/simulations.js
// To add a new simulation: add an object here and (optionally) a page + route for it.
// `featured: true` gives the card the big yellow-border treatment. `art` picks the illustration in SimulationCard.
export const simulations = [
  {
    slug: 'microscope',
    title: 'Virtual Microscope Simulation',
    description:
      'Focus, change lenses and explore six specimens: onion skin, cheek cells, puff-puff yeast, garri starch, mosquito wrigglers and pond water.',
    href: '/virtual-science-lab/microscope',
    art: 'microscope',
    featured: true,
    tags: ['Grades 5–6', 'Cells', '6 specimens'],
  },
  {
    slug: 'heart-rate',
    title: 'Heart Rate Investigation',
    description:
      'Predict, count Isio’s pulse, compare resting, walking and running, then graph what happens to a heartbeat.',
    href: '/virtual-science-lab/heart-rate',
    art: 'heart',
    featured: true,
    tags: ['Grades 5–6', 'Human body', '3 activities'],
  },
  {
    slug: 'food-web',
    title: 'Food Web Lab',
    description:
      'Build two food webs yourself, one in a Nigerian savanna and one in a woodland, then remove an organism and see who is affected.',
    href: '/virtual-science-lab/food-web',
    art: 'web',
    featured: true,
    tags: ['Grades 5–6', 'Ecosystems', '2 food webs'],
  },
];
