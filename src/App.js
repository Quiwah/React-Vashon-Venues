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
    this.bounceMarkerbyClickName = this.bounceMarkerbyClickName.bind(this);
    this.bounceMarker = this.bounceMarker.bind(this);
    // Store the data for later
    this.state = {
      venues: [],
      query: '',
      menuOpen: true,
      clickInSidebar: ''
    };
  }

  // When a venue is clicked in sidebar, the marker bounces
  bounceMarkerbyClickName(key){
    this.setState({
      clickInSidebar: key
    });
    console.log(this.clickInSidebar);
  }

  bounceMarker = (key) => {
    this.state.marker.setAnimation(window.google.maps.Animation.BOUNCE);
    console.log(this.key + 'もらった！')
  }

  showSettings (event) {
    event.preventDefault();
  }

  // Open and close the sidebar by click the icons
  openClose () {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  // Call the function from below
  componentDidMount() {
    this.getVenues();
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
      query: 'food',
      ll: '47.424885, -122.470579',
      v: '20190323'
    }

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        //ここで、上で作った配列にデータを入れる
        this.setState({
          venues: response.data.response.groups[0].items
          //ここより前に実行すると配列が空になってしまう
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
  this.state.venues.map(myVenue => {
    // eslint-disable-next-line
    let contentString = '<font style="color: #BD5A5A; font-weight: 800">' + `${myVenue.venue.name}` + '</font>' + ' (' + `${myVenue.venue.categories[0].name}` + ') ' + '<br>' + `${myVenue.venue.location.address}`;

    //Create marker
    let marker = new window.google.maps.Marker({
      position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
      map: map,
      title: myVenue.venue.name,
      icon: {url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
    });

    // When an marker is clicked
    marker.addListener('click', function() {
      // Put the info in the infowindow
      infowindow.setContent(contentString);
      // Open an infowindow
      infowindow.open(map, marker);
      // Set the center of the map to the marker and zoom in
      map.setZoom(15);
      map.setCenter(marker.getPosition());
    });

      //When user closes the infowindow, the map zooms out
      window.google.maps.event.addListener(infowindow,'closeclick',function(){
        map.setZoom(12);
      });
  })
  }
  
  render() {
    //後で消す
    console.log(this.state.venues);
    return (
      <div id="wrapper">
        <Header />
        <div className="main">
          <Side width={'35vw'} noOverlay isOpen={this.state.menuOpen}>
            <Sidebar venues={this.state.venues} toggle={() => {this.openClose(); }} id={this.state.id} clickBounce={this.bounceMarkerbyClickName}/>
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
