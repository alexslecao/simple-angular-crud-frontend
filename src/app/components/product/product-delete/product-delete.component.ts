import { Component } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent {
  product: Product = {
    name: '',
    price: 0.00
  }

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.product.id = params['id']);
  }

  ngOnInit() {
    this.productService.readById(this.product.id ?? 0).subscribe(product =>  {
      this.product = product;
    });  
  }

  delete(): void {
    this.productService.delete(this.product.id ?? 0).subscribe(() => {
      this.productService.showMessage('Produto excluído com sucesso')
      this.read();
    })
  }

  read(): void {
    this.router.navigate(['/products']);
  }
}
