import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AppStore } from '../../../../interfaces/app-store';
import { Machine } from '../../../../models/machine';
import { selectMachines } from '../../../../stores/machines/machines.selectors';
import { HelperService } from '../../../../services/helper.service';
import { Observable } from 'rxjs';

@Component({
    standalone: true,
    selector: 'app-machines-page',
    templateUrl: './machines-page.component.html',
    styleUrls: ['./machines-page.component.css'],
    imports: [CommonModule, NzTableModule, RouterModule],
})
export class MachinesPageComponent {
    machines$: Observable<Machine[]> = this.store
        .select(selectMachines)
        .pipe(HelperService.mapObjectKeysToArray());

    constructor(private store: Store<AppStore>) {}
}
