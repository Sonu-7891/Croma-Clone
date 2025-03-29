import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Container, Grid } from "@mui/material";

const CategoryPage = ({ type }) => {
  const { category } = useParams();

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {type
          ? type.charAt(0).toUpperCase() + type.slice(1)
          : category.charAt(0).toUpperCase() + category.slice(1)}
      </Typography>
      <Grid container spacing={3}>
        {/* Add your category content here */}
        <Grid item xs={12}>
          <Typography>Content coming soon...</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CategoryPage;
