import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from './product.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:4001/products"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string) {
    this.snackBar.open(msg, 'X', {
      duration: 1200,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product)
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
  }
}