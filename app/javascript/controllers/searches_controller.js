import { Controller } from "stimulus"

const apiKey =  "pk.eyJ1IjoiYWxpYXNyZW1hZGUiLCJhIjoiY2wzNGhpemR6MGhwbTNncXNlcm41eGt4MiJ9.BE4h11obM10MVxBZzQgHZg"

const museumsByPostCode = {}

export default class extends Controller {
  static targets = ["lat", "long", "list"]

  connect() {
    console.log('Hello from stimulus!');
    console.log(this.hasLatTarget)
    console.log(this.latTarget)
  }

  latlong(event) {
    event.preventDefault();
    const latitude = this.latTarget.value
    const longitude = this.longTarget.value

    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/museum.json?limit=10&type=poi&proximity=${longitude},${latitude}&access_token=${apiKey}`

    console.log(mapboxUrl)

    fetch(mapboxUrl)
      .then(response => response.json())
      .then(data => data.features.forEach((feature) => {
        museumsByPostCode[feature.context[0].text] = new Array(feature.text)
      }))
      for (const [key, value] of Object.entries(museumsByPostCode)) {
        this.listTarget.insertAdjacentHTML("beforeend", `<ul> <li>${key}: ${value}</li> </ul>`)
      }
  }
}
