import './home.scss'
import Container from "@mui/material/Container";
import {useAuth} from "../Login/login";
import {useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useFetchPosts from "../Posts/useFetchPosts";
import useFetchStatistics from "../Statistics/useFetchStatistics";
import SettingsIcon from '@mui/icons-material/Settings';
import HomepagePost from "../Posts/HomepagePost/homepagePost";
import {Post} from "../Posts/posts";
import {Statistics} from "../Statistics/statistics";
import {useNavigate} from "react-router-dom";
import SimplePopup from '../Posts/PopupCreatePost/popupCreatePost';
import {createOrder} from "../Paypal/paypalHelper";
import PaypalDonate from "../Paypal/paypalDonations";
import useFetchUser from "../Login/useFetchUser";
import React, {useEffect, useState} from "react";
import { PieChart, Pie, Cell, Legend } from 'recharts';
interface PostsFeedProps {
    title: string;
}
const PostsFeed:React.FC<PostsFeedProps> = ({title}) => {
    // @ts-ignore
    const {authKey} = useAuth()
    // @ts-ignore
    const postsFetch = useFetchPosts()['data']
    const [posts, setPosts] = useState([])

    // @ts-ignore
    const userFetch = useFetchUser(authKey?.data?.jwtToken)['data']
    const user = userFetch ? userFetch: null

    useEffect(() => {
        if (postsFetch?.length > 0) {
            setPosts(postsFetch.filter((post: any) => post.title.toLowerCase().includes(title.toLowerCase())))
        }
    }, [postsFetch, title]);

    return (
        <Box
            component="div"
            sx={{
                width: "60%",
                display: "flex",
                flexDirection: 'column',
                gap: '20px'
            }}
        >
            {posts?.map((post: Post) => <HomepagePost
                post={post}
                user={user}
                showComments={true}
                key={post._id}
            />)}
        </Box>
    )
}


const RightFeed = () => {
    // @ts-ignore
    const { authKey } = useAuth()
    const navigate = useNavigate()

    const statisticsFetch = useFetchStatistics();
    const [statistics, setStatistics] = useState<Statistics>();

    useEffect(() => {
        if (statisticsFetch && statisticsFetch.Locations) {
            setStatistics(statisticsFetch);
        }
    }, [statisticsFetch]);

    let keysArray: any[] = [];
    let valuesArray = [];
    if (statistics?.Locations) {
        console.log(statistics.Locations)
         keysArray = Array.from(Object.keys(statistics.Locations));
         valuesArray = Array.from(Object.values(statistics.Locations));
    }

    const data = [
        { name: keysArray[0], value: statistics?.Locations ? Array.from(Object.keys(statistics.Locations))[0] : 0 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <Box component={"div"} sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
        }}>
            {!authKey &&
                <Box
                    component="div"
                    sx={{
                        width: "100%",
                        borderRadius: '1rem',
                        backgroundColor: 'black',
                        p: 1,
                        height: 'max-content'
                    }}
                    className="register-box"
                >
                    <h2>New to SustainaByte?</h2>
                    <Button
                        color={"inherit"}
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </Button>
                </Box>
            }
            <Box
                component="div"
                sx={{
                    width: "100%",
                    borderRadius: '1rem',
                    backgroundColor: 'black',
                    p: 1,
                    height: 'max-content'
                }}
            >
                <PieChart width={220} height={400}>
                    <Pie
                        data={data}
                        cx={100}
                        cy={100}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>
                    <Legend verticalAlign="bottom" height={200}/>
                </PieChart>
            </Box>
        </Box>
    )
}

const LeftFeed = () => {
    const navigate = useNavigate()

    return (
        <Box
            component="div"
            sx={{
                width: "20%"
            }}
        >
            <SimplePopup></SimplePopup>
            <Button
                sx={{
                    color: "inherit"
                }}
                onClick={() => navigate("/settings")}
            >
                <SettingsIcon
                    sx={{
                        marginRight: '5px'
                    }}
                />
                <p>Settings</p>
            </Button>
        </Box>
    )
}
interface HomepageProps {
    title: string;
}
const Homepage:React.FC<HomepageProps> = ({title}) => {
    const theme = useTheme()
    return (
        <Container
            component="div"
            sx={{
                marginTop: "20px",
                display: "flex",
                color: `${theme.palette.text.primary}`,
            }}
            className="homepage-container"
        >
            {window.innerWidth > 767 ? (
                <>
                    <LeftFeed />
                    <PostsFeed title={title}/>
                    <RightFeed />
                </>
            ):
                <>
                    <LeftFeed />
                    <RightFeed />
                    <PostsFeed title={title}/>
                </>
            }

        </Container>
    )
}

export default Homepage