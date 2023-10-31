import { ThemeSchema } from "./theme-schema";

export const defaultTheme: ThemeSchema = {
    colors: {
        primary: '#EE9790',
        secondary: '#A890CC',
        background: 'inherit',
        text: 'white',
      },
    fontSize: {
      small: '12px',
      medium: '18px',
      large: '30px',
      extra_large: '46px',
    },
    margin: {
      small: '0 8px',
      medium: '0 16px',
      large: '0 64px',
    },
    padding: {
      small: '8px',
      medium: '16px',
      large: '32px',
    },
    border_radius: '0.5rem'
}