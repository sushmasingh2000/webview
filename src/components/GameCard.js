
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const GameCard = ({ title, image, badge }) => {
  return (
    <Card sx={{ width: '100%', mb: 2, borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{ height: 100 }}
        />
        {badge && (
          <Box
            sx={{
              position: 'absolute',
              top: 5,
              right: 5,
              backgroundColor: '#00C853',
              color: '#fff',
              px: 1,
              borderRadius: '12px',
              fontSize: '10px',
            }}
          >
            {badge}
          </Box>
        )}
      </Box>
      <CardContent sx={{ p: 1 }}>
        <Typography variant="body2" align="center">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GameCard;
