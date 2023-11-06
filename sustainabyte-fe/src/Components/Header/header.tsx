import './header.scss'
import Button from "@mui/material/Button";

const Header = () => {
    return (
        <header>
            <div className='header-container'>
                <h2></h2>
                <ul className='header-list'>
                    <Button>
                        <a href="#">
                            Item
                        </a>
                    </Button>
                    <Button>
                        <a href="#">
                            Item
                        </a>
                    </Button>
                    <Button>
                        <a href="#">
                            Item
                        </a>
                    </Button>
                    <Button>
                        <a href="#">
                            Item
                        </a>
                    </Button>
                </ul>
            </div>
        </header>
    )
}

export default Header