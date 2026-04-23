import { lowerCase } from 'lodash-es';

import { asciify } from '@/helpers';

export const filterSelectOption = (input: string, label: any) => {
  return smoothedStrToSearch(label).indexOf(smoothedStrToSearch(input)) >= 0;
};

export const smoothedStrToSearch = (str: string): string => {
  return lowerCase(asciify(str));
};
