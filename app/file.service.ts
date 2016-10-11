import {Http, Headers} from "@angular/http";
import {Injectable} from "@angular/core";
import {AppSettings} from "./app.settings";

@Injectable()
export class FileService {

    documentApi = AppSettings.documentApi;

    constructor(private http: Http) {
    }

    download(documentId: number, filename: string) {
        var headers = new Headers();
        headers.append('responseType', 'arraybuffer');

        //I think the reason the file gets corrupted is because you are loading res into the blob and you actually want res._body . However _body is a private variable and not accessible.
        //As of today .blob() and .arrayBuffer() on a http response object have not been implemented in Angular 2.
        // text() and json() are the only two options but both will garble your body. Have you found a solution? – sschueller Mar 18 at 14:05

        this.http.get(this.documentApi + "documents/" + documentId, headers).toPromise().then((data) => {
            var blob = new Blob([data.text()]);
            var url = window.URL.createObjectURL(blob);
            var anchor = <any>(document.createElement("a"));
            anchor.download = filename;
            anchor.href = url;
            anchor.click();
        });
    }

    post(formData: FormData) {
        return this.http.post(this.documentApi + "/documents", formData).toPromise();
    }
}