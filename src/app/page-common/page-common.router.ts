import {Routes} from '@angular/router';
import {BodyPageComponent} from './component/body-page/body-page.component';
import {ContactComponent} from './component/contact/contact.component';
import {BlogComponent} from './component/blog/blog.component';

export const CommonRoute: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, {
    path: 'home',
    component: BodyPageComponent
  },
  {path: 'contact', component: ContactComponent},
  {path: 'blog', component: BlogComponent}
];
