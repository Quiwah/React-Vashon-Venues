import React from 'react';
import Search from './Search';

export default class Sidebar extends React.Component {
  constructor(props){
    super(props);
    this.updateVenues = this.updateVenues.bind(this);

    this.state = {
      query: '',
      //searched results
      filteredVenues: ''
    };
  }

  updateVenues(e) {
    const { venues } = this.props;
    const { value } = e.target;
    let filteredVenues = [];

    // Filter venues by the query
    venues.forEach(
      venue => {
      let checkName = venue.venue.name.toLowerCase().indexOf(value.toLowerCase());
      let checkCategory = venue.venue.categories[0].name.toLowerCase().indexOf(value.toLowerCase());

      if(checkName >= 0 || checkCategory >= 0){
        filteredVenues.push(venue);
      } else {
        this.setState({filteredVenues: venues});
      }
      }
    );
    this.props.sendVenues(filteredVenues);
  }

  // Send the ID of clicked venue to the parent component
  sendClickedVenue(key){
    this.props.sendData(key);
  }

  // When the close/open button at sidebar clicked, toggle the booleans
  clickIcon() {
    const icon = window.document.getElementById('icon');
    if(icon.className === "far fa-arrow-alt-circle-left fa-2x"){
      icon.className = "far fa-arrow-alt-circle-right fa-2x";
    } else {
      icon.className = "far fa-arrow-alt-circle-left fa-2x";
    }
    return this.props.toggle();
  }

  render(){
    return(
      <div id="sidebar">
        <div id="sidebar-contents">
          {/* <div id="menu">
            <h2>Filter by category:</h2>
              <menu>
                <a id="Eat" className="menu-item" href="/eat" title="town">Eat</a>
                <a id="Shop" className="menu-item" href="/shop" title="burton">Shop</a>
                <a id="Other" className="menu-item" href="/other" title="maury">Other</a>
              </menu>
          </div> */}
            <Search
              query={this.state.query}
              updateVenues={this.updateVenues}
            />
          <div id="list">
            <ul className="venue-list">
              {this.props.venues.map(venues => (
                <li key={venues.venue.id} className="venue-item" aria-label={`${venues.venue.name} ${venues.venue.location.formattedAddress} ${venues.venue.categories[0].name}`}
                    onClick={(event) => {this.sendClickedVenue(venues.venue.id)}}>
                  <div className="venue-name">{venues.venue.name}</div>
                  <div className="venue-address">{venues.venue.location.address}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button onClick={() => {this.clickIcon();}}>
          <i id="icon" className="far fa-arrow-alt-circle-left fa-2x"></i>
        </button>
      </div>
    );
  }
}
