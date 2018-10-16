import React from 'react'
import classNames from 'classnames'

export default class Header extends React.Component {
    handleSidebar = this.handleSidebar.bind(this)
    state = {
        sidebarStatus: ''
    }

    handleSidebar(props, e) {
        e.preventDefault()
        console.log('clicked')
        classNames('show', {
            'is_active' : this.state.isActive
        })
    }

    render(){
        return(
            <div className="header">
                <h1>Vashon Venues</h1>
                <input type="search" aria-describedby="search-field" placeholder="Search..." />
            </div>
        )
    }
}