import { NgModule } from '@angular/core';
import { LucideAngularModule, Home, User, Settings, LogOut } from 'lucide-angular';

const icons = {
    Home,
    User,
    Settings,
    LogOut
};

@NgModule({
    imports: [LucideAngularModule.pick(icons)],
    exports: [LucideAngularModule]
})
export class IconsModule { }
