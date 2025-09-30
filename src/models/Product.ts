export interface ProductJSON {
  productId: number;
  categoryId: number;
  categoryName: string;
  productName: string;
  productCode: string;
  productSize: string;
  productImagePath: string;
  isActive: boolean;
  createdDate: string; // store as ISO string
}

export class Product {
  constructor(
    public productId: number,
    public categoryId: number,
    public categoryName: string,
    public productName: string,
    public productCode: string,
    public productSize: string,
    public productImagePath: string,
    public isActive: boolean,
    public createdDate: Date
  ) {}

  static fromJSON(json: ProductJSON): Product {
    return new Product(
      json.productId,
      json.categoryId,
      json.categoryName,
      json.productName,
      json.productCode,
      json.productSize,
      json.productImagePath,
      json.isActive,
      new Date(json.createdDate)
    );
  }

  toJSON(): ProductJSON {
    return {
      productId: this.productId,
      categoryId: this.categoryId,
      categoryName: this.categoryName,
      productName: this.productName,
      productCode: this.productCode,
      productSize: this.productSize,
      productImagePath: this.productImagePath,
      isActive: this.isActive,
      createdDate: this.createdDate.toISOString(),
    };
  }
}
