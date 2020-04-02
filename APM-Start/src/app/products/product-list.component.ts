import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    //showImage: boolean;
    includeDetail: boolean = true;
    parentListFilter: string;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;


    filteredProducts: IProduct[];
    products: IProduct[];
    @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;

    get showImage(): boolean {
        return this.productParameterService.showImage;
    }
    set showImage(value: boolean) {
        this.productParameterService.showImage = value;
    }

    constructor(private productService: ProductService,
                private productParameterService: ProductParameterService) {
    }

    ngAfterViewInit(): void {
        console.log('AfterViewInit');
        this.parentListFilter = this.filterComponent.listFilter;
    }


    ngOnInit(): void {
        console.log('OnInit');
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.filterComponent.listFilter =
                    this.productParameterService.filterBy;
                console.log('Before filter');
                //this.performFilter(this.parentListFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    onValueChange(value: string): void {
        this.productParameterService.filterBy = value;
        this.performFilter(value);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
