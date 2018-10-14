import React from 'react'

const Header = () => (
    <div className="header">
        <i class="fas fa-filter" onClick={()=>this.showSidebar()}></i>
        <h1>Vashon Venues</h1>
        <i class="fas fa-search-location"></i>
    </div>
)

export default Header