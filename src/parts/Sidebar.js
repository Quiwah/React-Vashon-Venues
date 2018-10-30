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

  // componentDidMount() {
  //   this.setState({
  //     venues: this.props.venues,
  //     filteredVenues: this.props.venues
  //   })
  // }

  updateVenues = event => {
    const { venues } = this.props;
    const { value } = event.target;
    const filteredVenues = [];
    // Filter venues by the query
    venues.forEach(
      venue => {
      if(venue.venue.name.toLowerCase().indexOf(value.toLowerCase()) >= 0){
        filteredVenues.push(venue);
        this.props.sendVenues(filteredVenues);
      }
}
    );
    this.setState({
      filteredVenues: filteredVenues,
      query: value
    });

    this.componentWillMount = () => {
      const { filteredVenues } = this.props;
      this.setState({
        filteredVenues: filteredVenues
      });
    };

    this.setState({filteredVenues: []});
  }

  // Send the ID of clicked venue to the parent component
  sendClickedVenue(key){
    this.props.sendData(key);
  }

  // When the close/open button at sidebar clicked, toggle the booleans
  clickIcon() {
    return this.props.toggle();
  }

  render(){
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
          <i className="fas fa-folder-minus fa-2x" title="Close the sidebar"/>
          <i className="fas fa-folder-open fa-2x" title="Open the sidebar"/>
        </button>
      </div>
    );
  }
}
