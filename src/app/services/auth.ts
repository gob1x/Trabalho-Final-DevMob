import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {

  constructor() { }

  login(email: string, password: string): Observable<User | null> {
    if (email === '209826@upf.br' && password === '123456') {
      const user: User = { id: 'u123', email: email };
      return of(user); 
    } else {
      return of(null); 
    }
  }
}