export const environment = {
    production: true,
    mapboxToken:
        'pk.eyJ1IjoiYWtvem1hIiwiYSI6ImNscXVhNzJwMjRuMTYydW1rNjJmaDJ1bHgifQ._zGh4ReI3bon-p8StuMufQ',
    apiUrl: 'https://codingcase.bluesky-ff1656b7.westeurope.azurecontainerapps.io/api/v1',
    wsUrl: 'wss://codingcase.bluesky-ff1656b7.westeurope.azurecontainerapps.io/socket/',
    settings: {
        placeAccuracyInKm: 40,
        notificationFrequency: 2000,
        notificationLevel: {
            idle: false,
            running: false,
            errored: true,
            repaired: true,
            finished: false,
        },
        tablePageSize: 10,
    },
};
