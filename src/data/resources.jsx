import {
  FileText,
  Sparkles,
  Calculator
} from 'lucide-react';

const resources = [
  {
    id: 'number-friends',
    title: 'Number Friends Worksheet Pack',
    subtitle: 'Friends of 3–10',
    description:
      'Make number bonds fun! This colourful worksheet pack helps children practise number friends from 3 to 10.',
    features: [
      'Friends of 3 through 10',
      'Colourful number-bond puzzles',
      'Matching and number-bond activities',
      'Great for home or classroom practice'
    ],
    downloadLink: '/worksheets/number-friends-3-10.pdf',
    downloadText: 'Download Free Worksheet',
    badge: 'FREE MATH RESOURCE',
    icon: Sparkles,
    fileIcon: FileText,
    fileLabel: 'Number Friends',
    fileSub: 'Friends of 3–10'
  },

  {
    id: 'abacus',
    title: 'One-Column Abacus Practice Pack',
    subtitle: 'One-Column, No Compliment Practice Questions',
    description:
      'Help your child strengthen their abacus skills with this printable practice pack. Children can practise one-column addition and subtraction while developing speed, accuracy, and confidence.',
    features: [
      'One-column abacus practice questions',
      'Addition and subtraction practice',
      'Builds speed and calculation accuracy',
      'Great for home or classroom practice'
    ],
    downloadLink: '/worksheets/free-abacus-practice.pdf',
    downloadText: 'Download Free Abacus Practice',
    badge: 'FREE ABACUS RESOURCE',
    icon: Calculator,
    fileIcon: FileText,
    fileLabel: 'Free Abacus Practice',
    fileSub: 'One-Column, No Compliment Practice Questions'
  },

  {
    id: 'break-it-apart',
    title: 'Break-It-Apart Worksheet',
    subtitle: 'Number Town Mission',
    description:
      'Help children master place value and addition with this engaging "Break-It-Apart" worksheet. Kids break numbers into tens and ones, add the parts, then put them back together.',
    features: [
      'Step-by-step number breaking strategy',
      'Worked example with guided practice',
      '6 practice cases with self-assessment',
      'Bonus: "Make Your Own Mystery" section'
    ],
    downloadLink: '/worksheets/break-it-apart.pdf',
    downloadText: 'Download Break-It-Apart Worksheet',
    badge: 'FREE MATH RESOURCE',
    icon: Sparkles,
    fileIcon: FileText,
    fileLabel: 'Break-It-Apart',
    fileSub: 'Number Town Mission'
  },

  {
    id: 'spillover-worksheet',
    title: 'Spillover Worksheet',
    subtitle: 'Number Town Mission: Regrouping',
    description:
      'Help children master regrouping with this fun Spillover Worksheet. Children practise adding ones, exchanging ten ones for one ten, and solving two-digit addition problems with confidence.',
    features: [
      'Practise two-digit addition with regrouping',
      'Learn how ones spill over into the tens',
      'Step-by-step addition practice',
      'Great for home or classroom practice'
    ],
    downloadLink: '/worksheets/spillover-worksheet.pdf',
    downloadText: 'Download Spillover Worksheet',
    badge: 'FREE MATH RESOURCE',
    icon: Sparkles,
    fileIcon: FileText,
    fileLabel: 'Spillover Worksheet',
    fileSub: 'Number Town Mission: Regrouping'
  }
];

export default resources;