export interface All {
    id: any,
    name: string,
    logo: string,
    cover: string,
  }
export interface Details {
    id: any,
    name: string,
    description: string,
    price: number,
    proveedor: string,
    image: string
}
  export interface Suppliers {
    all: All[];
  }
  
  export interface Products {
      all: Details[];
  }

export interface Cat {
    id: any,
    name: string,
    type: string,
    icon: string,
}
export interface Category {
    all: Cat[];
}