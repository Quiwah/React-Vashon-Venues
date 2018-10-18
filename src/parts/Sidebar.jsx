import React from 'react';

export default class Sidebar extends React.Component {
  render(){
    const venuesList = this.props.venues
  return(
    <div id="sidebar">
      <i className="fas fa-folder-minus fa-2x" 
        onClick={this.handleSidebar}
        title="Close the sidebar"
      />
      <div id="menu">
        <h2>Filter by area:</h2>
        <menu>
          <a id="town" className="menu-item" href="/town" title="town">Town</a>
          <a id="burton" className="menu-item" href="/burton" title="burton">Burton</a>
          <a id="maury" className="menu-item" href="/maury" title="maury">Maury</a>
        </menu>
      </div>
      <input type="search" id="search" aria-describedby="search-field" placeholder="Search venues..." />
      <div id="list">
        <ul className="venue-list">
          {venuesList.map(venueItem => (
            <li key={venueItem.venue.id}>
              <div className="venue-name">{venueItem.venue.name}</div>
              <div className="venue-address">{venueItem.venue.location.address}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
}