import React from 'react';

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //searched term
      query: '',
      //searched results
      foundVenues: []
    };
  }

  // Send the ID of clicked venue to the parent component
  sendClickedVenue(key){
    this.props.sendData(key);
  }

  // When the close/open button at sidebar clicked, toggle the booleans
  clickIcon() {
    return this.props.toggle();
  }

  // Search function
  updateQuery(event){
    this.setState({query: event.target.value});
  }

  // Handle the inputed words
  updateFoundVenues (event, foundVenues){
    event.preventDefault();
    this.props.venues.filter(this.state.query)
    .then((foundVenues) => {
      if (foundVenues.error) {
        this.setState({ foundVenues: [] });
      } else {
        this.setState({ foundVenues: foundVenues });
      }
  });
    console.log(foundVenues)
  }

  render(){
    const venuesList = this.props.venues;

    return(
      <div id="sidebar">
        <div id="sidebar-contents">
          <div id="menu">
            <h2>Filter by category:</h2>
              <menu>
                <a id="Eat" className="menu-item" href="/eat" title="town">Eat</a>
                <a id="Shop" className="menu-item" href="/shop" title="burton">Shop</a>
                <a id="Other" className="menu-item" href="/other" title="maury">Other</a>
              </menu>
          </div>
          <input
            type="search" id="search"
            aria-label="Search through the venues"
            placeholder="Search venues..."
            value={this.state.value}
            onChange={this.updateQuery}
          />
          <div id="list">
            <ul className="venue-list">
              {venuesList.map(venueItem => (
                <li key={venueItem.venue.id} className="venue-item" aria-label={`${venueItem.venue.name} ${venueItem.venue.location.formattedAddress} ${venueItem.venue.categories[0].name}`}
                    onClick={(event) => {this.sendClickedVenue(venueItem.venue.id)}}>
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