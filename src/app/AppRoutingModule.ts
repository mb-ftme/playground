import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponentComponent} from "./login-component/login-component.component";
import {FormListComponent} from "./form-list/form-list.component";
import {TestComponent} from "./test/test.component";
import {GuardServiceGuard} from "./guard-service.guard";
import {SingleFormComponent} from "./single-form/single-form.component";

const routes: Routes = [
  {path:'',component:LoginComponentComponent},
  { path: 'login', component: LoginComponentComponent },
  { path: 'form', component: FormListComponent,canActivate:[GuardServiceGuard] },
  {path:'single',component:SingleFormComponent},
  { path: 'test', component: TestComponent }
  // {path:'home',component:DashboardComponent,canActivate:[AuthenticationGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
