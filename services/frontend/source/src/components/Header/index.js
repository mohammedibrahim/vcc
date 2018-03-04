import React from 'react';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Logo from '../../images/logo.svg';
import MenuIcon from '../../images/menu.png';
import BagIcon from '../../images/bag.png';
import './header.css';

export default () => (
  <Grid className={'main-strip'} container justify={'space-between'} spacing={0}>
    <Hidden smUp>
      <Grid container alignItems={'flex-end'} justify={'space-between'} spacing={0}>
        <Grid item xs={1} className={'header-icon--mobile'}>
          <img src={MenuIcon} />
        </Grid>
        <Grid item xs={1} className={'header-icon--mobile'}>
          <img src={BagIcon} />
        </Grid>
      </Grid>
    </Hidden>
    <Hidden smDown>
      <Grid item xs={4} />
    </Hidden>
    <Grid item xs={12} md={4} lg={4} xl={4} className={'logo-container'}>
      <a href="/">
        <img alt={'Mamas & Papas'} src={Logo} />
      </a>
    </Grid>
    <Hidden smUp>
      <Grid item xs={12} className={'user-menu--mobile'}>
        Sign in/Register | Stores/Stockists
      </Grid>
    </Hidden>
    <Hidden smDown>
      <Grid item xs={4} className={'user-menu'}>
        Sign in/Register | Stores/Stockists | Your bag (2)
      </Grid>
    </Hidden>
  </Grid>
);
