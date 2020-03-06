// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    api_url: 'http://localhost:4200',
    carwash_url: '/assets/data/carwash.json',
    display_package_items_url: '/assets/data/all-package-items.json',
    all_employees_url: '/assets/data/all-employees.json',
    register_url: '',
    signIn_url: '',
    logout_url: '',
    assets_url_base: '/assets/data/',
    geolocation_base_url: 'https://maps.googleapis.com/maps/api/geocode/json',
    GEOLOCATION_API_KEY: 'AIzaSyD7atM2VoIc3rVVUnDaTmxiFbPO6TVIkLc',
    new_store_url: '',
    new_package_url: '',
    new_promotion_url: '',
    update_store_url: '',
    update_package_url: '',
    update_package_array_url: '',
    update_promotion_url: '',
    delete_store_url: '',
    delete_package_url: '',
    delete_promotion_url: '',
    new_employee_url: '',
    update_employee_url: '',
    delete_employee_url: ''
};
