import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


export interface ItemAlimento {
  name: string;
  calories: number;
  serving_size_g: number;
  fat_total_g: number;
  fat_saturated_g: number;
  protein_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
}



@Injectable({
 
  providedIn: 'root'
})
export class NutricaoService {
  
  private apiUrl = 'https://api.calorieninjas.com/v1/nutrition';
  

  private apiKey = 'lT4BC/v1debq5s8Vcq06VQ==YiYDBHujiRijG5ad'; 

  constructor(private http: HttpClient) {}

  buscarAlimentos(query: string): Observable<ItemAlimento[]> {
    
   
    const headers = new HttpHeaders({
      'X-Api-Key': this.apiKey 
     
    });

  
    const url = `${this.apiUrl}?query=${encodeURIComponent(query)}`;

   
    return this.http.get<{ items: ItemAlimento[] }>(url, { headers })
      .pipe(
        
        map(response => response.items || []), 
        
       
        catchError(error => {
          console.error('Erro na chamada da API CalorieNinjas:', error);
          
          return throwError(() => new Error('Falha na autenticação ou rede.'));
        })
      );
  }
}