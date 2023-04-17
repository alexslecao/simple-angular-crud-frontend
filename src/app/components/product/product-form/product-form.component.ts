import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0.00
  }

  operation: string = ""
  title: string = ""
  nameButtonSave: string = ""
  saveMethod(): void {}

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.product.id = params['id'];
      this.operation = params['operation'];
    });

    if (this.operation == "create") {
      this.saveMethod = this.create;
      this.title = "Novo";
      this.nameButtonSave = "Incluir";
    }
    else if (this.operation == "update") {
      this.saveMethod = this.update;
      this.title = "Alterar";
      this.nameButtonSave = "Alterar";
    }
    else if (this.operation == "delete") {
      this.saveMethod = this.delete;
      this.title = "Excluir";
      this.nameButtonSave = "Excluir";
    }
  }

  ngOnInit(): void {
    if (this.operation === "create" || this.operation === "update" || this.operation === "delete")
      this.readById(this.product.id ?? 0);
    else
      this.read();
  }

  readById(productId: number): void {
    this.productService.readById(productId).subscribe(product => {
      this.product = product;
    });
  }

  create(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto incluído com sucesso')
      this.read();
    });
  }

  update(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto alterado com sucesso')
      this.read();
    });
  }

  delete(): void {
    this.productService.delete(this.product.id ?? 0).subscribe(() => {
      this.productService.showMessage('Produto excluído com sucesso')
      this.read();
    });
  }

  read(): void {
    this.router.navigate(['/products']);
  }
}
