import { NzIconModule } from 'ng-zorro-antd/icon';
import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
    standalone: true,
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css'],
    imports: [
        NzLayoutModule,
        NzIconModule,
        RouterOutlet,
        NzMenuModule,
        RouterModule,
    ],
})
export class LayoutComponent {
    isCollapsed = false;

    toggleCollapsed(): void {
        this.isCollapsed = !this.isCollapsed;
    }
}
