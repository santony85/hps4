import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'formrapport',
    loadChildren: () => import('./formrapport/formrapport.module').then( m => m.FormrapportPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'deconnect',
    loadChildren: () => import('./deconnect/deconnect.module').then( m => m.DeconnectPageModule)
  },
  {
    path: 'mapview',
    loadChildren: () => import('./mapview/mapview.module').then( m => m.MapviewPageModule)
  },
  {
    path: 'formrdv',
    loadChildren: () => import('./formrdv/formrdv.module').then( m => m.FormrdvPageModule)
  },
  {
    path: 'listeclient',
    loadChildren: () => import('./listeclient/listeclient.module').then( m => m.ListeclientPageModule)
  },
  {
    path: 'modalfiche',
    loadChildren: () => import('./modalfiche/modalfiche.module').then( m => m.ModalfichePageModule)
  },
  {
    path: 'listerapport',
    loadChildren: () => import('./listerapport/listerapport.module').then( m => m.ListerapportPageModule)
  },
  {
    path: 'rapport',
    loadChildren: () => import('./rapport/rapport.module').then( m => m.RapportPageModule)
  },
  {
    path: 'scheduler',
    loadChildren: () => import('./scheduler/scheduler.module').then( m => m.SchedulerPageModule)
  },
  {
    path: 'repos',
    loadChildren: () => import('./repos/repos.module').then( m => m.ReposPageModule)
  },
  {
    path: 'evenement',
    loadChildren: () => import('./evenement/evenement.module').then( m => m.EvenementPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
