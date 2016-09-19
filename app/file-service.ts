import {Http, Headers} from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class FileService {

    constructor(private http: Http) {
    }

    download(documentId: number, filename: string) {
        var headers = new Headers();
        headers.append('responseType', 'arraybuffer');

        this.http.get("http://localhost:60646/documents/" + documentId, headers).toPromise().then((data) => {
            var blob = new Blob([data.text()]);
            var url = window.URL.createObjectURL(blob);
            var anchor = <any>(document.createElement("a"));
            anchor.download = filename;
            anchor.href = url;
            anchor.click();
        });
    }
}