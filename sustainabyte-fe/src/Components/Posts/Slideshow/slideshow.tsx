import { useState } from 'react';
import {Post} from '../posts';
import Button from '@mui/material/Button/Button';
import {Box, MobileStepper, useTheme} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';


const CustomSlideshow = (post: Post) => {
    const [activeStep, setActiveStep] = useState(0);
  
    const handleNext = () => {
      setActiveStep((activeStep + 1) % maxSteps);
    };
  
    const handlePrevious = () => {
      setActiveStep(activeStep === 0 ? maxSteps - 1 : activeStep - 1);
    };
  
  
    const theme = useTheme();
    const images = post.mediaUrl;
    const maxSteps = images.length;

return (
    <Box>
    {post && post.mediaUrl && post?.mediaUrl.length > 0 ? (
        <Box sx={{ 
          maxWidth: 600,
          flexGrow: 1,
          borderRadius: 5, 
          overflow: 'hidden',
          
          }}>

          {images.map((imageUrl, index) => (
            <div key={index} style={{ display: index === activeStep ? 'block' : 'none' }}>
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 600,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src=""
                alt={`Image ${index + 1}`}
              />
            </div>
          ))}

          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext}>
                Next
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handlePrevious}>
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Previous
              </Button>
            }
          />
        </Box>
      ) : null}
      </Box>
    );
}

export default CustomSlideshow