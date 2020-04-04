import { AbstractControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

export const mimeType = (control: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  const file = control.value as File;
  // read the value of the file
  const fileReader = new FileReader();
  const frObs = Observable.create((observer: Observer<{ [key: string]: any }>) => {
    fileReader.addEventListener('loadend', () => {
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
      let header;
      let isValid = false;
      for (let i = 0; i < arr.length; i++) {
        // build a string of hexadecimal values
        header += arr[i].toString(16);
      }
      // check file types, ie png jpeg etc
      switch (header) {
        case "89504e47":
          isValid = true;
          break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          isValid = true;
          break;
        default:
          isValid = false; // Or you can use the blob.type as fallback
          break;
      }
      if (isValid) {
        observer.next(null); // when validator returns null then it passes i.e angular expects null
      } else {
        observer.next({ invalidMimeType: true });
      }
      observer.complete();

    });
    // read in file as array buffer
    fileReader.readAsArrayBuffer(file); // when down will trigger the loadend event
  });
  return frObs;

};