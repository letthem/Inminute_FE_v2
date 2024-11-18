const colorPalette = {
  orange: {
    main: '#FFA800',
    bg: '#FCF2EB',
    text: '#DB7A08',
    border: '#FFD6A6',
  },
  pink: {
    main: '#FF94A4',
    bg: '#FCF3FD',
    text: '#E7546A',
    border: '#FFCBD3',
  },
  green: {
    main: '#5CC688',
    bg: '#EAFBEC',
    text: '#489D06',
    border: '#BCEAC1',
  },
  blue: {
    main: '#7582FF',
    bg: '#EDF3FA',
    text: '#4152F1',
    border: '#C1D0FF',
  },
  purple: {
    main: '#BE5BFF',
    bg: '#F3E9FF',
    text: '#BE5BFF',
    border: '#E4CEFF',
  },
} as const;

export type ColorGroup = keyof typeof colorPalette;
export type ColorVariant = keyof (typeof colorPalette)[ColorGroup];

export const getColor = (colorGroup: ColorGroup, variant: ColorVariant = 'main') => {
  return colorPalette[colorGroup][variant];
};

export default colorPalette;
