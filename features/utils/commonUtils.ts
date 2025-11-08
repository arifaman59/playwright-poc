export class CommonUtils {
    static getMyWebsite(websiteName: string): string {
        let website: string;

        switch (websiteName.trim().toLowerCase()) {
            case 'saucedemo':
                website = "https://www.saucedemo.com/"
                break;
            case 'demoqa':
                website = "https://demoqa.com/"
                break;
            default:
                website = websiteName;
        }
        return website;
    }
}