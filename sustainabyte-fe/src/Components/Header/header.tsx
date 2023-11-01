import './header.scss'
import { HeaderButton, StyledHeader, Title } from './headerStyle'


const Header = () => {
    return (
        <StyledHeader>
            <div className='header-container'>
                <Title></Title>
                <ul className='header-list'>
                    <HeaderButton>
                        <a href="#">
                            Item
                        </a>
                    </HeaderButton>
                    <HeaderButton>
                        <a href="#">
                            Item
                        </a>
                    </HeaderButton>
                    <HeaderButton>
                        <a href="#">
                            Item
                        </a>
                    </HeaderButton>
                    <HeaderButton>
                        <a href="#">
                            Item
                        </a>
                    </HeaderButton>
                </ul>
            </div>
        </StyledHeader>
    )
}

export default Header