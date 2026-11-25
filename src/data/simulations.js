// src/data/simulations.js
// To add a new simulation: add an object here and (optionally) a page + route for it.
import { Microscope } from 'lucide-react';

export const simulations = [
  {
    slug: 'microscope',
    title: 'Virtual Microscope Simulation',
    description:
      'Focus, change lenses and explore six specimens: onion skin, cheek cells, puff-puff yeast, garri starch, mosquito wrigglers and pond water.',
    href: '/virtual-science-lab/microscope',
    icon: Microscope,
    tags: ['Grades 5–6', 'Cells', '6 specimens'],
  },
];
