import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  toggle: PropTypes.func,
};

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    //clicked venue in sidebar
    this.clickedVenue = this.clickedVenue.bind(this);
    this.state = {
      query: '',
      //searched venues
      foundVenues: []
    };
  }

  clickedVenue = (key) => {
    this.setState({ key: key })
    console.log(key);
  }

  // When the close/open button clicked, toggle the booleans
  clickIcon() {
    return this.props.toggle();
  }

  //検索機能ーTODO
  updateQuery = (query) => {
    this.setState({
      query: query
    })
    this.updateFoundVenues(query);
  }

  //検索機能ーTODO
  updateFoundVenues = (query) => {
    if (query) {
      this.props.venues.search(query)
      .then((foundVenues) => {
        if (foundVenues.error) {
          this.setState({ foundVenues: [] });
        } else if (this.state.query === query) {
          this.setState({ foundVenues: foundVenues });
        }
      })
      console.log(this.foundVenues)
    } else {
      this.setState({ foundVenues: [] });
    }
  }

  render(){
    const venuesList = this.props.venues;

    return(
      <div id="sidebar">
        <div id="sidebar-contents">
          <div id="menu">
            <h2>Filter by area:</h2>
              <menu>
                <a id="town" className="menu-item" href="/town" title="town">Town</a>
                <a id="burton" className="menu-item" href="/burton" title="burton">Burton</a>
                <a id="maury" className="menu-item" href="/maury" title="maury">Maury</a>
              </menu>
          </div>
          <input
            type="search" id="search"
            aria-describedby="search-field"
            placeholder="Search venues..."
            onChange={(event) => this.updateQuery(event.target.value)}
          />
          <div id="list">
            <ul className="venue-list">
              {venuesList.map(venueItem => (
                <li key={venueItem.venue.id} className="venue-item"
                    onClick={(event) => this.clickedVenue(venueItem.venue.id)}>
                  <div className="venue-name">{venueItem.venue.name}</div>
                  <div className="venue-address">{venueItem.venue.location.address}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button onClick={() => {this.clickIcon();}}>
          <i className="fas fa-folder-minus fa-2x" title="Close the sidebar"/>
          <i className="fas fa-folder-open fa-2x" title="Open the sidebar"/>
        </button>
      </div>
    );
  }
}

Sidebar.propTypes = propTypes;