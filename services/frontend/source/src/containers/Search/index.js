import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input, { InputAdornment } from 'material-ui/Input';
import Grid from 'material-ui/Grid';
import SearchIcon from 'material-ui-icons/Search';
import Hidden from 'material-ui/Hidden';

import SearchActions from '../../state/searchRedux';

import { ResultsBox } from '../../components/Search';

// Styles:
import './search.css';

class Search extends Component {
  render() {
    return (
      <Grid
        container
        alignContent={'center'}
        justify={'center'}
        spacing={24}>
        <Grid
          item
          xs={12}
          md={5}
          lg={5}
          className={'search-container'}>
          <Hidden smDown>
            <Input
              className={'search-input'}
              placeholder="Hello, I'm looking for..."
              type="search"
              fullWidth
              autoFocus
              inputProps={{
                autoComplete: 'false'
              }}
              margin="none"
              onChange={e => this.props.searchNew(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </Hidden>
          <Hidden smUp>
            <Input
              className={'se  arch-input'}
              placeholder="Hello, I'm looking for..."
              type="search"
              fullWidth
              autoFocus
              inputProps={{
                autoComplete: 'false'
              }}
              margin="none"
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </Hidden>
          <ResultsBox results={this.props.search.results} loading={this.props.search.loading} />
        </Grid>
      </Grid>
    );
  }
}

Search.propTypes = {
  search: PropTypes.object,
  searchNew: PropTypes.func
};


const mapStateToProps = store => ({
  search: store.search
});

const mapDispatchToProps = dispatch => ({
  searchNew: keyword => dispatch(SearchActions.searchNew(keyword))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
