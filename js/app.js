import geoJSONData from "../geo/ethiopia.json" assert { type: "json" };

// Some regions coordinates to set the markers on the map
const regionsCoords = [
    {
        name: "Afar",
        description: "description 1",
        total: 1,
        coordinates: [12.286333810713812, 40.96801757812501],
    },
    {
        name: "Amhara",
        description: "description 2",
        total: 4,
        coordinates: [11.598431619860792, 38.15551757812501],
    },
    {
        name: "Benishangul-Gumuz",
        description: "description 3",
        total: 7,
        coordinates: [10.622817137954696, 35.43914794921876],
    },
];

// Country (Ethiopia) center Point to set the view
const countryCoords = [9.002254, 39.639931];
const map = L.map("leafletmap").setView(countryCoords, 6);

// Adding "open street map" layout
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 6,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Adding the Ethiopia Map (Polygon) that it's beign imported on the top of the file
L.geoJSON(geoJSONData).addTo(map);

// Creating / Adding the markers to the map, using the default icon (pin-icon)
for (let i = 0; i < regionsCoords.length; i++) {
    const region = regionsCoords[i];
    new L.marker(region.coordinates)
        .bindPopup(
            `<h3 style="font-size: 16px; font-weight: 600;">${region.name}</h3><p>${region.description}</p>
                    <p><span style="font-size: 12px; font-weight: 600;">Total: </span>${region.total}</p> `
        )
        .addTo(map);
}

// Gambella region information used to show an example of how to create a custom-icon for the marker.
const gambellaRegion = {
    name: "Gambella",
    description: "description 4",
    total: 12,
    coordinates: [7.776308503776205, 34.33776855468751],
};

// Creating the custom icon for the marker
const icon = L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: #032a34; border-radius: 50px; border: 1px solid #d6d6d6;
                        font-weight: 300; color: white; font-size: 16px; text-align: center; padding: 2px 4px; cursor: pointer;">
                        ${gambellaRegion.total}</div>`,
    iconSize: [32, 0],
    iconAnchor: [10, 30],
    popupAnchor: [6, -16],
    shadowSize: [10, 10],
});

// Create the marker with the custom icon
L.marker(gambellaRegion.coordinates, { icon: icon })
    .bindPopup(
        `<h3 style="font-size: 16px; font-weight: 600;">${gambellaRegion.name}</h3><p>${gambellaRegion.description}</p>
                    <p><span style="font-size: 12px; font-weight: 600;">Total: </span>${gambellaRegion.total}</p> `
    )
    .addTo(map);
