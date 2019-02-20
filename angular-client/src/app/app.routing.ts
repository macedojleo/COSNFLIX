import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PlayerComponent } from './pages/player/player.component';
import { AuthGuard } from './guard/auth.guard';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'index', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'watch/:name', component: PlayerComponent, canActivate: [AuthGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: '/login' }
];

export const routing = RouterModule.forRoot(appRoutes);
