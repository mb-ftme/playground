import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponentComponent} from "./login-component/login-component.component";
import {FormListComponent} from "./form-list/form-list.component";
import {GuardServiceGuard} from "./guard-service.guard";

const routes: Routes = [
  {path:'',component:LoginComponentComponent},
  { path: 'login',component: LoginComponentComponent },
  { path: 'form', canActivate:[GuardServiceGuard], component: FormListComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
