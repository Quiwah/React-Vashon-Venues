import React from 'react';

const Sidebar = () => (
  <div class="menu">
    Select the area:
      <a id="town" className="menu-item" href="/">Town</a>
      <a id="burton" className="menu-item" href="/about">Burton</a>
      <a id="maury" className="menu-item" href="/contact">Maury</a>
      {/* <a onClick={ this.showSettings } className="menu-item--small" href="/">Settings</a> */}
  </div>
)

export default Sidebar