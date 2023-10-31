import styled from 'styled-components'

export const Title = styled.h2`
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.fontSize.medium};
`

export const HeaderButton = styled.li`
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.fontSize.medium};
`

export const StyledHeader = styled.header`
    background-color: ${props => props.theme.colors.background}
`