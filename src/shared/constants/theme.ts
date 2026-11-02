import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';

export const theme = {
  token: {
    fontFamily: 'var(--font-family-base)',
    colorPrimary: '#158C4D',
    fontSize: 15,
    borderRadius: 6,
  },
  components: {
    Input: {
      controlHeight: 36,
      paddingSM: 17, // Input subtracts the 1px border, leaving 16px horizontal padding.
      colorTextPlaceholder: '#888888',
      colorBorder: '#DEDEDE',
    },
    Select: {
      controlHeight: 36,
      paddingSM: 17, // Select subtracts the 1px border, leaving 16px horizontal padding.
      colorBorder: '#DEDEDE',
    },
  },
} satisfies ThemeConfig;
