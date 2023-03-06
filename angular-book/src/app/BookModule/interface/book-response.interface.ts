/**
 * @author    Daniel Kovalovsky (d.kovalovsky@outlook.com)
 * @copyright Copyright (c) 2022 Daniel Kovalovsky
 */

interface IGoogleBook {
  id: string;
  volumeInfo: {
    authors: Array<string>;
    title: string;
    pageCount: number;
    categories: Array<string>;
    previewLink: string;
    imageLinks?: {
      smallThumbnail: string;
    };
  };
}

export interface IBookResponse {
  items: Array<IGoogleBook>;
}
