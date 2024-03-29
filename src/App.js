import React, { useState, useEffect } from "react"
import { CssBaseline, Grid } from "@material-ui/core"

import { getPlacesData } from "./api"
import Header from "./components/Header/Header"
import List from "./components/List/List"
import Map from "./components/Map/Map"

const App = () => {
  const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])

  const [coords, setCoords] = useState({})
  const [bounds, setBounds] = useState({})

  const [type, setType] = useState("restaurants")
  const [rating, setRating] = useState("")

  const [childClicked, setChildClicked] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude })
      }
    )
  }, [])

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating)

    setFilteredPlaces(filteredPlaces)
  }, [rating, places])

  useEffect(() => {
    async function main() {
      if (bounds.sw && bounds.ne) {
        setIsLoading(true)

        try {
          const data = await getPlacesData(type, bounds.sw, bounds.ne)

          setPlaces(
            data?.filter((place) => place.name && place.num_reviews > 0)
          )
          setFilteredPlaces([])
          setRating("")
          setIsLoading(false)
        } catch (err) {
          console.log(err)
        }
      }
    }

    main()
  }, [type, bounds])

  return (
    <>
      <CssBaseline />
      <Header setCoords={setCoords} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App
