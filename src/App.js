import React from 'react';
import './App.css';
import Header from './parts/Header';
import Sidebar from './parts/Sidebar';
import Map from './parts/Map';
import './responsive.css';
import axios from 'axios';
import Side from 'react-burger-menu/lib/menus/slide'

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.getClickedVenue = this.getClickedVenue.bind(this);
    // Store the data for later use
    this.state = {
      //map
      venues: [],
      markers: [],
      //search
      query: '',
      //sidebar
      menuOpen: true
    };
  }

  //For sidebar slide
  showSettings (event) {
    event.preventDefault();
  }

  // Open and close the sidebar by click the icons
  openClose () {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  // Call the function from below
  componentDidMount() {
    this.getVenues()
  }

  renderMap = () => {
    loadApi('https://maps.googleapis.com/maps/api/js?key=AIzaSyCe4r1pl_xLXiDj61hQQvWdEsqFnmtHgrE&v=3&callback=initMap');
    window.initMap = this.initMap;
  }

  getVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
    const parameters = {
      client_id: 'VPYE1ATQWP3JJ42VT0OWU42SVVP14CF5TIANTCAWHLVTKICP',
      client_secret: 'ZE20VQRHIA1NN2K5025Q5DYJKQHILLOLF4SVS3ELMSHGSZIH',
      ll: '47.424885, -122.470579',
      v: '20190323'
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        //Put the received data into the array
        this.setState({
          venues: response.data.response.groups[0].items
          //This needs to be done here otherwise the array would be empty
        }, this.renderMap());
      })
      .catch(error => {
        console.log('error!!' + error);
      });
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.425466, lng: -122.474015},
      zoom: 12
    });

    // Create infowindow (if put this in the 'this' below, it would duplicated)
    const infowindow = new window.google.maps.InfoWindow();

    // Map the places from Forsquare
    // eslint-disable-next-line
    this.state.venues.map(venue => {
      //Create marker
      let marker = new window.google.maps.Marker({
        position: {lat: venue.venue.location.lat, lng: venue.venue.location.lng},
        map: map,
        title: venue.venue.name,
        icon: {url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"},
        id: venue.venue.id,
        genre: venue.venue.categories[0].name,
        address: venue.venue.location.address
      });
      this.state.markers.push(marker);

      // eslint-disable-next-line
      let contentString = '<font style="color: #BD5A5A; font-weight: 800">' + marker.title + '</font>' + ' (' + marker.genre + ') ' + '<br>' + marker.address;

      // When a marker is clicked...
      marker.addListener('click', function() {
        // put the info in the infowindow
        infowindow.setContent(contentString);
        // open an infowindow
        infowindow.open(map, marker);
        // set the center of the map to the marker and zoom in
        map.setZoom(15);
        map.setCenter(marker.getPosition());
        // bounce the marker
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function(){
          marker.setAnimation(null);
        }, 1500);
      });

      //When user closes the infowindow, the map zooms out and back to the center of the island
      window.google.maps.event.addListener(infowindow,'closeclick',function(){
        map.setZoom(12);
        map.setCenter({lat: 47.425466, lng: -122.474015});
      });
  })
  }

  // When a venue is clicked in the sidebar, receive the ID
  getClickedVenue = (key) => {
    let clickedAtSide = this.state.markers.find(marker => marker.id === key);
    window.google.maps.event.trigger(clickedAtSide, 'click');
    // Bounce the marker on the map
    clickedAtSide.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(function(){
      clickedAtSide.setAnimation(null);
    }, 1500);
  }

  // Get filtered venues from sidebar
  sendVenues = (filteredVenues) => {
    this.setState({
      venues: filteredVenues
    });
    console.log(this.state.venues);
    this.initMap(this.venues);
  }
  
  render() {
    return (
      <div id="wrapper">
        <Header />
        <div className="main">
          <Side width={'35vw'} noOverlay isOpen={this.state.menuOpen}>
            <Sidebar
              venues={this.state.venues}
              toggle={() => {this.openClose()}} id={this.state.id}
              sendData={this.getClickedVenue}
              sendVenues={this.sendVenues}
            />
          </Side>
          <Map />
        </div>
      </div>
    );
  }
};

function loadApi(url) {
  const index = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
