import React from 'react'
import Venues from './Venues'

export default class Sidebar extends React.Component {
    //別の場所で使うデータを格納する
    state = {
    query: ''
  }

  render(){
    console.log(this.props.myVenue)
    return(
      <div id="sidebar">
        <i className="fas fa-folder-minus fa-2x" 
          onClick={this.handleSidebar}
        />
        <div className="menu">
          Select the area:
          <a id="town" className="menu-item" href="/">Town</a>
          <a id="burton" className="menu-item" href="/about">Burton</a>
          <a id="maury" className="menu-item" href="/contact">Maury</a>
          {/* <a onClick={ this.showSettings } className="menu-item--small" href="/">Settings</a> */}
        </div>
        <div id="list">
          <ul className="venue-list">
            <li>
              <Venues eachVenue={this.props.myVenue}/>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}