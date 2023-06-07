// Create an html list of tickets when a button in navbar is clicked on

import { useEffect, useState } from "react"
import "./Locations.css"

export const LocationList = () => {
    const [locations, setlocations] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationArray) => {
                    setlocations(locationArray)
                })
        },
        []
    )

    return <>
        <div className="location__header">List of Locations</div>

        <article className="locations">
            {
                locations.map(
                    (location) => {
                        return <section className="location" key={location.id}>
                            <h3>Location #{location.id}</h3>
                            <h4>Address: {location.address}</h4>
                            <h4>{location.squareFootage} sqft</h4>
                        </section>
                    }
                )
            }
        </article>
    
    </>

}