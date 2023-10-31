export interface ThemeSchema {
    colors: colors,
    fontSize: fontSize,
    margin: margin,
    padding: padding,
    border_radius: string,
}

interface colors {
    primary: string,
    secondary: string,
    text: string,
    background: string,
}

interface fontSize {
    small: string,
    medium: string,
    large: string,
    extra_large: string,
}

interface margin {
    small: string,
    medium: string,
    large: string,
}

interface padding {
    small: string,
    medium: string,
    large: string,
}