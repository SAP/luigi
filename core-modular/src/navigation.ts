export class Navigation {
    luigi: any;
    hashRouting: boolean = false;

    constructor(luigi: any) {
        this.luigi = luigi;
        this.hashRouting = luigi.getConfig().routing?.useHashRouting;
    }
    navigate(path: string) {
        let normalizedPath = path.replace(/\/\/+/g, '/');
        if(this.hashRouting) {
            location.hash = normalizedPath;
        } else {
            console.log('path routing not yet implemented');
        }
    }
}
