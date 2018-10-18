import React from 'react'
import PropTypes from 'prop-types';

export default class Venues extends React.Component {
    constructor(props){
        super(props)
        // this.props.venue = this.props.venue.bind(this)
        console.log(this.eachVenues)
    }

    componentDidMount() {
        this.eachVenues()
      }

// componentDidMount() {
//     this.displayVenue()
//   }

// displayVenue = () => {
//     let venueName = window.document.getElementById('list')
//     let venueAddress = window.document.getElementsByClassName('venue-address')

//     venueToShow.map(thisVenue => {
//         var nameOfTheVenue = this.props.venue.name
//         var addressOfTheVenue = `${thisVenue.venue.location.address}`
        
//           //display venue's name and address to the divs
//           venueName.innerHTML(nameOfTheVenue)
//           venueAddress.setContent(addressOfTheVenue)
// })
// }

    render(){
        console.log(this.props.areas[2])
        return(
        {/* {this.props.venues && this.props.venues.map((venue.idx) => )} */}
        )
    }
} 

Venues.propTypes = {
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired
}