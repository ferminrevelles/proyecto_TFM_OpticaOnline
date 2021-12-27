import { Component, OnInit , Inject} from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.css']
})
export class DetailproductComponent implements OnInit {

  detailProduct:any;

  constructor(
    private productService: ProductService,
    private router : Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.detailProduct = this.productService.detailProduct;
  }

  back(){
    this.router.navigate(['typeproduct']);
  }

  addProduct(addProduct:any){   //Llama a método servicio product para crear la cesta con los distintos productos.
    this.productService.addProduct(addProduct);
    this.openDialog();    // Llamada a la función para gesitonar el modal.
  }

  openDialog(): void {    // Función que gestiona el modal.
    const dialogRef = this.dialog.open(Dialog, {
      width: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
    //  console.log('The dialog was closed, pinchar fuera');
    });
  }

}

    //Creación componente para mostrar el HTML del modal
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.html',
})
export class Dialog {
  constructor(private router: Router,
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: "hola",
  ) {}

  onNoClick(): void {
    this.router.navigate(['typeproduct']);
    this.dialogRef.close();
    
  }

  summary(){
    console.log("Ir a la cesta");
    this.onNoClick();
    this.router.navigate(['summaryshop']);
  }
}