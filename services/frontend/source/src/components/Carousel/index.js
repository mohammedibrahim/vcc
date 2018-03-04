import React from 'react';
import Grid from 'material-ui/Grid';

import { Carousel } from 'react-responsive-carousel';

// Styles
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Slide1 from '../../images/slide1.jpg';
import Slide2 from '../../images/slide2.jpg';
import Slide3 from '../../images/slide3.jpeg';

export default () => (
  <Grid container spacing={24}>
    <Grid item xs>
      <Carousel
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        infiniteLoop
        autoPlay
        stopOnHover
        swipeable
        emulateTouch
      >
        <div style={{
          backgroundImage: `url(${Slide1})`,
          height: 375,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />
        <div style={{
          backgroundImage: `url(${Slide2})`,
          height: 375,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />
        <div style={{
          backgroundImage: `url(${Slide3})`,
          height: 375,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />
      </Carousel>
    </Grid>
  </Grid>
);
