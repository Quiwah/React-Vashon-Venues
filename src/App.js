import React, { Component } from 'react';
import './App.css';
import Header from './parts/Header';
import './responsive.css';
import axios from 'axios';

class App extends Component {

  //別の場所で使うデータを格納する
  state = {
    venues: []
  }

  //下に書いたファンクションをここで呼ぶ
  componentDidMount() {
    this.getVenues()
  }

  renderMap = () => {
    loadApi('https://maps.googleapis.com/maps/api/js?key=AIzaSyCe4r1pl_xLXiDj61hQQvWdEsqFnmtHgrE&v=3&callback=initMap')
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
    const parameters = {
      client_id: 'VPYE1ATQWP3JJ42VT0OWU42SVVP14CF5TIANTCAWHLVTKICP',
      client_secret: 'ZE20VQRHIA1NN2K5025Q5DYJKQHILLOLF4SVS3ELMSHGSZIH',
      query: 'food',
      ll: '47.424885, -122.470579',
      v: '20190323'
    };

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        //ここで、上で作った配列にデータを入れる
        console.log(response.data.response.groups[0].items);
        this.setState({
          venues: response.data.response.groups[0].items
          //ここより前に実行すると配列が空になってしまう
        }, this.renderMap())
      })
      .catch(error => {
        console.log('error!!' + error);
      })
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 47.424885, lng: -122.470579},
      zoom: 12
    });

  //Create infowindow 下のthis.の中に入れちゃうと重複する
  var infowindow = new window.google.maps.InfoWindow();

  //フォースクエアから引っ張ってきた場所ひとつひとつに対してマーカーを作る
  this.state.venues.map(myVenue => {
    var contentString = '<font style="color: #BD5A5A; font-weight: 800">' + `${myVenue.venue.name}` + '</font>' + ' (' + `${myVenue.venue.categories[0].name}` + ') ' + '<br>' + `${myVenue.venue.location.address}`;

    //Create marker
    var marker = new window.google.maps.Marker({
      position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
      map: map,
      title: myVenue.venue.name,
      icon: {                             
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
    })

    //マーカーがクリックされると
    marker.addListener('click', function() {
      //インフォウインドウの内容を変更
      infowindow.setContent(contentString)
      //インフォウインドウを開く
      infowindow.open(map, marker)
    });
  })
  }

  render() {
    return (
      <div id="wrapper">
        <Header />
        <div id="map"></div>
      </div>
    )
  }
}

function loadApi(url) {
  const index = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
