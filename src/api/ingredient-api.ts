import { URLs } from '@/utils/URLs';

import type { HttpClient } from '../utils/httpClient'; // путь к вашему httpClient.ts
import type { APIError } from './type';
import type { TIngredient } from '@/utils/types';

export class IngredientApi {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getIngredients(): Promise<TIngredient[] | APIError> {
    return this.httpClient.get<TIngredient[]>(URLs.ingredients);
  }
}
