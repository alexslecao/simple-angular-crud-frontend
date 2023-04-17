import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0.00
  }

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.product.id = params['id']);
  }

  ngOnInit() {
    this.productService.readById(this.product.id ?? 0).subscribe(product => {
      this.product = product;
    });
  }

  update(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto atualizado com sucesso')
      this.read()
    })
  }

  read(): void {
    this.router.navigate(['/products']);
  }
}
