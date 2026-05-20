import {
  Injectable,
  inject,
  computed,
  signal
} from '@angular/core';

import {
  Auth,
  authState,
  signInWithEmailAndPassword,
  signOut,
  User
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);

  user = signal<User | null | undefined>(undefined);

  isAuthenticated = computed(() =>
    !!this.user()
  );

  constructor() {

    authState(this.auth)
      .subscribe(user => {

        this.user.set(user);
      });
  }

  async login(
    email: string,
    password: string
  ) {

    return signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
  }

  async logout() {

    return signOut(this.auth);
  }
}