import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WooftimeServiceService {

  items: any[] = [];

  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "http://localhost:8080";

  constructor(public http: HttpClient) {
    console.log("Hello Wooftime-Service Service");
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }
  
  getItems(): Observable<any> {
    return this.http.get<any[]>(`${this.baseURL}/api/wooftime`).pipe(
      map((response: any[]) => {
        console.log('API response:', response);
        return response.map(item => {
          return {
            id: item._id, 
            name: item.name
          };
        });
      }),
      catchError(this.handleError)
    );
  }



  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return throwError(errMsg);
  }

  removeItem(itemId: number): Observable<any> {
    const url = `${this.baseURL}/api/wooftime/${itemId}`;
    return this.http.delete(url);
  }


  addItem(item: any) {
    this.http.post(`${this.baseURL}/api/wooftime/`, item).subscribe({
      next: () => {
        // Refresh the list of items after successfully adding an item
        this.refreshItems();
      },
      error: (error) => {
        console.error("Error adding item:", error);
      },
    });
  }

  refreshItems() {
    this.getItems().subscribe({
      next: (items) => {
        this.items = items;
        this.dataChangeSubject.next(true);
      },
      error: (error: HttpErrorResponse) => {
        console.error("Error fetching items:", error);
      },
    });
  }


}
