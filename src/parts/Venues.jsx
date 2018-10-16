import React from 'react'

export default class Venues extends React.Component {
    // venueData({this.props.eachVenue}) = ({name, address}) => {
    //     {this.props.eachVenue}.map(info) => (
    //         name : {info.name},
    //         address : {info.location.address}
    //     )
    //     let eachName = receivedData.name
    //     let eachAddress = receivedData.location.address

    //     this.state.name.map(receivedData => {
    //         name = eachName
    //         return(window.document.getElementsByClassName('venue-name').textContent(eachName))
    //     })
    //     console.log(eachName)
    //     this.state.address.map(receivedData => {
    //         address = eachAddress
    //         return(console.log(eachAddress))
    //     })
    // }

    render(){
        console.log(this.props.eachVenue)
        return(
        <div className="venue">
            <div className="venue-name">{this.props.name}</div>
            <div className="venue-address"></div>
        </div>
        )
    }
} 


    // render()
    //  {
    //     
    //     //

    //     return(
    //       <div className="venue">
    //         {/* <div className="venue-name">{eachData.venue.name}</div>
    //         <div className="venue-address">{eachData.venue.location.address}</div> */}
    //       </div>
    //     )
    //}
