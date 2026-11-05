import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { map } from 'rxjs';

type LoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private http = inject(HttpClient)

  login(username: string, password: string){
    return this.http.post<LoginResponse>('https://dummyjson.com/auth/login' , {username, password})
    .pipe(
      map((res): User => ({
        id: String(res.id),
        email: res.email,
        name: `${res.firstName} ${res.lastName}`,
        imageUrl: res.image,
      }))
    )
  }
}
