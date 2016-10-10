import {Http, Headers} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class FileService {

    documentApi = "http://localhost:60646/";

    constructor(private http: Http) {
    }

    download(documentId: number, filename: string) {
        var headers = new Headers();
        headers.append('responseType', 'arraybuffer');

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