import React from 'react';

// UI components:
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';

// styles:
import './navigation.css';

export default () => (
  // Hide for mobile devices
  <Hidden smDown>
    <Grid container spacing={0} alignContent={'center'} justify={'space-between'} className={'main-nav'}>
      <Grid className={'main-nav--item'} item xs>
        <a href="">Clothing</a>
      </Grid>
      <Grid className={'main-nav--item'} item xs>
        <a href="">Nursery</a>
      </Grid>
      <Grid className={'main-nav--item'} item xs>
        <a href="">Strollers</a>
      </Grid>
      <Grid className={'main-nav--item'} item xs>
        <a href="">Carseats</a>
      </Grid>
      <Grid className={'main-nav--item'} item xs>
        <a href="">Feeding</a>
      </Grid>
      <Grid className={'main-nav--item'} item xs>
        <a href="">Bath Time</a>
      </Grid>
      <Grid className={'main-nav--item'} item xs>
        <a href="">Gifts</a>
      </Grid>
      <Grid className={'main-nav--item'} item xs>
        <a href="">Toys</a>
      </Grid>
      <Grid className={'main-nav--item'} item xs>
        <a href="">Offers</a>
      </Grid>
    </Grid>
  </Hidden>
);

