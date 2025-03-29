import React from 'react';
import { Box, Container, Typography, styled } from '@mui/material';
import { LocalShipping, ThumbUp, Security } from '@mui/icons-material';

const WhyCromaContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  backgroundColor: '#000000',
}));

const GradientBox = styled(Box)(({ theme }) => ({

  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    textAlign: 'center',
    gap: theme.spacing(6),
  },
}));


const Title = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 600,
  marginBottom: theme.spacing(4),
}));


const WhyCroma = () => {
  return (
    <WhyCromaContainer>
      <Container maxWidth="lg">
        <Title variant="h2">Why Croma?</Title>
        <GradientBox>
          <img
            style={{ borderRadius: "10px" }}
            height={"100%"}
            width={"100%"}
            src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1710743309/Croma%20Assets/CMS/Testing/2024/March/18th/Why%20Croma/Desktop/JPG/Why-Croma_t2lgxr.png?tr=w-1024"
            alt="croma"
          />
          
        </GradientBox>
      </Container>
    </WhyCromaContainer>
  );
};

export default WhyCroma; 