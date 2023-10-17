import * as React from 'react';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function StarRating({ averageRating }) {
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating % 1 !== 0;

  const stars = Array.from({ length: 5 }, (_, index) => {
    if (index < fullStars) {
      return <StarIcon key={index} color="primary" />;
    } else if (hasHalfStar && index === fullStars) {
      return <StarHalfIcon key={index} color="primary" />;
    } else {
      return <StarBorderIcon key={index} color="primary" />;
    }
  });

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {stars}
    </Box>
  );
}