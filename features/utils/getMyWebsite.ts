export default function (websiteName: string): string {
    let website: string;

    switch (websiteName.trim().toLowerCase()) {
        case 'saucedemo':
            website = "https://www.saucedemo.com/"
            break;
        default:
            website = "https://www.google.com/"
    }
    return website;
}
