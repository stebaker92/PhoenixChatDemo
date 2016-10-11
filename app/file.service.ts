import {Http, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {AppSettings} from "./app.settings";

@Injectable()
export class FileService {

    documentApi = AppSettings.documentApi;

    constructor(private http: Http) {
    }

    download(documentId: number, filename: string) {

        //I think the reason the file gets corrupted is because you are loading res into the blob and you actually want res._body . However _body is a private variable and not accessible.
        //As of today .blob() and .arrayBuffer() on a http response object have not been implemented in Angular 2.
        // text() and json() are the only two options but both will garble your body. Have you found a solution? – sschueller Mar 18 at 14:05

        // var headers = new Headers();
        // headers.append('responseType', 'arraybuffer');

        // this.http.get(this.documentApi + "documents/" + documentId, headers).toPromise().then((data) => {
            // var blob = new Blob([data.text()]);
            // var url = window.URL.createObjectURL(blob);
            // var anchor = <any>(document.createElement("a"));
            // anchor.download = filename;
            // anchor.href = url;
            // anchor.click();
        // });


        // Xhr creates new context so we need to create reference to this
        var pending: boolean = true;

        // Create the Xhr request object
        let xhr = new XMLHttpRequest();

        let url = this.documentApi + "documents/" + documentId;
        xhr.open('GET', url, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.responseType = 'blob';

        // Xhr callback when we get a result back
        // We are not using arrow function because we need the 'this' context
        xhr.onreadystatechange = function () {

            // We use setTimeout to trigger change detection in Zones
            setTimeout(() => {
                pending = false;
            }, 0);

            // If we get an HTTP status OK (200), save the file using fileSaver
            if (xhr.readyState === 4 && xhr.status === 200) {
                var blob = new Blob([this.response]);
                // this.saveAs(blob, 'project.zip');

                // var blob = new Blob([data.text()]);
                var url = window.URL.createObjectURL(blob);
                var anchor = <any>(document.createElement("a"));
                anchor.download = filename;
                anchor.href = url;
                anchor.click();
            }
        };

        // Start the Ajax request
        // xhr.send(JSON.stringify(model));
        xhr.send();
    }

    post(formData: FormData) {
        return this.http.post(this.documentApi + "/documents", formData).toPromise();
    }
}