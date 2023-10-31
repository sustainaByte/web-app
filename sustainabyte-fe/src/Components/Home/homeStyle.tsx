import styled from 'styled-components'

export const Title = styled.h1`
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.fontSize.extra_large};
`

export const Description = styled.p`
    color: ${props => props.theme.colors.secondary};
    font-size: ${props => props.theme.fontSize.medium};
`

export const Button = styled.button`
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.fontSize.medium};
    padding: ${props => props.theme.padding.small};
    border-radius: ${props => props.theme.border_radius};
`