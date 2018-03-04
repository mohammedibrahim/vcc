import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import List, {
  ListItem,
  ListItemText
} from 'material-ui/List';

// Loading SVG image
import Loading from '../../images/dots.svg';

// Styles:
import './search.css';

export const ResultsBox = props => {
  if (props.loading) {
    return (
      <Paper className={'search-results'}>
        <img src={Loading} alt="Loading..." />
      </Paper>
    );
  }
  if (props.results.length > 0 && !props.loading) {
    return (
      <Paper className={'search-results'}>
        <List>
          {props.results.map(result => (
            <ListItem button key={result._id}>
              <ListItemText
                primary={result._source.name}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    );
  }
  return null;
};

ResultsBox.propTypes = {
  results: PropTypes.array,
  loading: PropTypes.bool
};
