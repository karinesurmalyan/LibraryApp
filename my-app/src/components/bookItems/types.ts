export interface BookItemProp {
    id: number;
    coverImage?: string;
    book_title: string;
    author: string;
    description: string;
    rating: number;
}

export interface Books {
    id: number;
    coverImage: string;
    book_title: string;
    author: string;
    description: string;
    notes: string;
    status: StatusType;
    rating: number;
    pages_quantity: number
  }

  export interface BookProps {
    id?: number;
    coverImage?: string;
    book_title?: string;
    author?: string;
    description?: string;
    notes?: string;
    status?: StatusType;
    rating?: number;
    pages_quantity?: number
  }

  export interface BookListProps {
    books: Books[];
    setActivePage: React.Dispatch<React.SetStateAction<number | null>>;
    onBookAdd: (book: Books)=> void;
  }
  
  export interface BookPathProps {
    setAllBooks?: React.Dispatch<React.SetStateAction<Books[]>>;
    id?: number;
    coverImage?: string;
    book_title?: string;
    author?: string;
    description?: string;
    notes?: string;
    status?: StatusType;
    rating?: number;
    pages_quantity?: number;
  }
  export type StatusType = "in process" | "have read" | "haven't read" | undefined