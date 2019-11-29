import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  getAllRecipes() {
    return this.http.get(environment.api + '/recipes');
  }

  getSpecials() {
    return this.http.get(environment.api + '/specials');
  }

  getSpecialByIngredientId(ingredientId) {
    return this.http.get(environment.api + '/specials?ingredientId=' + ingredientId);
  }

  addRecipe(body) {
    return this.http.post(environment.api + '/recipes', body);
  }

  updateRecipe(body, uuid) {
    return this.http.patch(environment.api + '/recipes/' + uuid, body);
  }
}
