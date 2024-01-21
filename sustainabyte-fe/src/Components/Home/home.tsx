import './home.scss'
import Container from "@mui/material/Container";
import {useAuth} from "../Login/login";
import {ButtonGroup, useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useFetchPosts, {useFetchEvents} from "../Posts/useFetchPosts";
import useFetchStatistics  from "../Statistics/useFetchStatistics";
import useFetchCreateStatistics from "../Statistics/useFetchCreateStatistics";
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
import {BarChart} from "@mui/icons-material";
import EventPost from "../Posts/EventPost/eventPost";
import { Typography } from '@mui/material';
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

const EventsFeed = () => {
    // @ts-ignore
    const {authKey} = useAuth()
    // @ts-ignore
    const userFetch = useFetchUser(authKey?.data?.jwtToken)['data']
    const user = userFetch ? userFetch: null
    // @ts-ignore
    const events = useFetchEvents()['data']

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
            {events?.map((event: any) => <EventPost
                post={event}
                user={user}
                key={event._id}
            />)}
        </Box>
    )
}

const RightFeed = (props: {seePosts: boolean, setSeePosts: any}) => {
    // @ts-ignore
    const { authKey } = useAuth()
    const navigate = useNavigate()

    useFetchCreateStatistics();

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


    const data = [];
    let total = 0;

    for (let i = 0; i < valuesArray.length; i++) {
        total += valuesArray[i]
    }

    for (let i = 0; i < keysArray.length; i++) {
        const percentage = ((valuesArray[i] / total) * 100).toFixed(1);
        data.push({
            name: keysArray[i] + " " + percentage + "%",
            value: valuesArray[i],
        });
    }
    data.sort((a, b) => b.value - a.value);
    const COLORS = ['#0088FE'];

    for (let i = 0; i < data.length; i++) {
        const randomColor = '#' + (Math.floor(Math.random() * 127) + 127).toString(16) + (Math.floor(Math.random() * 127) + 127).toString(16) + (Math.floor(Math.random() * 127) + 127).toString(16);
        COLORS.push(randomColor);
    }
    const theme = useTheme();
    return (
        <Box component={"div"} sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px"
        }}>
            <ButtonGroup>
                <Button sx={{
                    backgroundColor: props.seePosts ? `${theme.palette.text.disabled}`: "inherit"
                }} onClick={() => props.setSeePosts(true)}>Posts</Button>
                <Button sx={{
                    backgroundColor: !props.seePosts ? `${theme.palette.text.disabled}`: "inherit"
                }}  onClick={() => props.setSeePosts(false)}>Events</Button>
            </ButtonGroup>

            { !authKey &&
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
                <Typography variant="h4" sx={{ textAlign: 'center', color: `${theme.palette.text.primary}`, fontSize: '1.5rem' }}>
                    County statistics
                </Typography>
                <PieChart width={280} height={600}>
                    <Pie
                        data={data}
                        cx={143}
                        cy={130}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {
                            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                        }
                    </Pie>
                    <Legend verticalAlign="bottom" height={300}/>
                </PieChart>
                <Typography height={50}  variant="h4" sx={{ textAlign: 'center', color: `${theme.palette.text.secondary}`, fontSize: '1.2rem' }}>
                    Top county: {data.at(0)?.name.replace(/[^a-zA-Z]/g, '')} with {data.at(0)?.value } posts
                </Typography>
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
    const [seePosts, setSeePosts] = useState(true)

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
                    {
                        seePosts ? <PostsFeed title={title} />: <EventsFeed />
                    }
                    <RightFeed seePosts={seePosts} setSeePosts={setSeePosts} />
                </>
            ):
                <>
                    <LeftFeed />
                    <RightFeed seePosts={seePosts} setSeePosts={setSeePosts} />
                    {
                        seePosts ? <PostsFeed title={title} />: <EventsFeed />
                    }
                </>
            }

        </Container>
    )
}

export default Homepage