import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea,
  CardActions,
  Button,
} from "@mui/material";

const ItemCard = ({ name, count }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        bgcolor: "primary.dark",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea sx={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          sx={{ height: 200 }}
          image="/images/gwen.png"
          alt="gwen image"
        />
        <CardContent >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            textTransform={"capitalize"}
            color="primary.contrastText"
          >
            {name}
          </Typography>
          <Typography variant="body1" color="primary.contrastText">
            Count: {count}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
};
export default ItemCard;
