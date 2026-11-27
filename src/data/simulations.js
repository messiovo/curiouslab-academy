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
];
