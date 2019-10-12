// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    api_url: 'http://localhost:4200',
    package_manager_path: '/assets/data/carwash.json',
    static_package_items_url: '/assets/data/all-package-items.json',
    geolocation_base_url: 'https://maps.googleapis.com/maps/api/geocode/json',
    GOOGLE_API_KEY: 'AIzaSyBmP-8g9b_1PsCHdNnlkThfMwLA1ADlrNU'
};
