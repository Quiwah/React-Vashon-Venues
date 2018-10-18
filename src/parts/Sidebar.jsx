import React from 'react';
// import Venues from './Venues'

export default class Sidebar extends React.Component {
  state = {
    value: '',
    open: true,
    areas: [
      'Burton',
      'Town',
      'Maury'
    ],
    venues: []
  };

  // eachVenue = () => {
  //   for (var i = 0; i < v.length; i++){
  //     eachVenues.push(

  //   }

  //   return newValues;
  // }

  render(){
    <ul className="venue-list">
      {this.props.venues.map(name, address => (
        <li key={venue.name}>
          <div className="venue-name">{venueList}</div>
          <div className="venue-address">{venueAddress}</div>
        </li>
    ))}
    </ul>
  }

    return(
      <div id="sidebar">
        <i className="fas fa-folder-minus fa-2x" 
          onClick={this.handleSidebar}
        />
        <div id="menu">
          Select the area:
          <a id="town" className="menu-item" href="/town">Town</a>
          <a id="burton" className="menu-item" href="/burton">Burton</a>
          <a id="maury" className="menu-item" href="/maury">Maury</a>
        </div>
        <div id="list">
        </div>
      </div>
    );
  }
};