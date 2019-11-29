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

  addRecipe(body) {
    return this.http.post(environment.api + '/recipes', body);
  }

}
