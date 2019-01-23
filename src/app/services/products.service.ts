import { Product } from '../products/product.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';



const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products: Product[] = [];
  private productUpdated = new Subject<Product[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getProducts() {
    this.http.get<{ message: string, Products: Product[] }>(baseUrl)
      .subscribe((response) => {
        this.products = response.Products;
        this.productUpdated.next([...this.products]);
      });
  }
  getProduct(id: string) {
    return this.http.get<Product>(baseUrl + '/' + id);
  }

  addProduct(product: Product) {
    return this.http.post<Product>(baseUrl, product).pipe(tap(newProduct => {
      this.products.push(newProduct);
      this.productUpdated.next([...this.products]);
    }));
    /* .subscribe((newProduct) => {
      this.products.push(newProduct);
      this.productUpdated.next([...this.products]);
      this.router.navigate(['/']);
    }); */
  }
  updateProduct(product: Product) {
    return this.http.put(baseUrl + '/' + product._id, product);
    /*  .subscribe((result) => {
       console.log(result);
       this.router.navigate(['/']);
     }); */
  }
  deleteProduct(id: string) {
    this.http.delete(baseUrl + '/' + id)
      .subscribe(() => {
        this.products = this.products.filter(product => product._id !== id);
        this.productUpdated.next([...this.products]);
        this.router.navigate(['/']);
      }, () => {
        this.router.navigate(['/']);
      });
  }
  getProductUpdates() {
    return this.productUpdated.asObservable();
  }
  updateProductlikes(product: Product) {
    // product.likes = + 1;
    return this.http.put(baseUrl + '/' + product._id, product);

  }
}
