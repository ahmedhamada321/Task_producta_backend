export class ProductDTO {
  id: number;

  name: string;

  productCode: string;

  unit: string;

  quantity: number;

  description: string;

  descriptionItem: string;

  category: string;

  item: string;

  isMandatory: boolean;

  structuralCode: string;

  attachments?: string;

  createdAt: Date;

  updatedAt: Date;
}
