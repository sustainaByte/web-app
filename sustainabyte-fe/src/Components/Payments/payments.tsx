import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Post } from '../Posts/posts';
import { useTheme } from '@emotion/react';
import PaypalDonate from '../Paypal/paypalDonations';


const PaymentsPage = (props: {post: any}) => {

    const theme = useTheme()

    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        >
      <Box
        border="5px solid #000" 
        borderRadius={12} 
        padding={5}
        maxWidth={600} 
        width="100%" 
        overflow="hidden" 
        sx={{
          wordWrap: 'break-word', 
          overflowWrap: 'break-word',
          backgroundColor: 'black'
        }}
      >
            <CardContent>
                <Typography variant="h3" sx={{ 
                    color: '#027d51'
                }} gutterBottom>
                    {props.post.title}
                </Typography>

                <Typography variant="h5" sx={{ color: '#60796e'}}>
                    {props.post.content}
                </Typography>
                </CardContent>
                <PaypalDonate postID={props.post._id} collectedMoney={props.post.collectedMoney} />
        </Box>
        </Box>
    );
}

export default PaymentsPage;