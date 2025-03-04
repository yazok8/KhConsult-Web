// types/services.ts

// Define the ServiceCategory enum
export enum ServiceCategory {
    INDIVIDUAL = "INDIVIDUAL",
    BUSINESS = "BUSINESS",
  }
  
  // Define the Service type
  export type Service = {
    id: string;
    title: string;
    description: string;
    imageSrc: string;
    category: ServiceCategory;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  