import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MapComponent } from '../../../../components/map/map.component';
import { Observable, map } from 'rxjs';
import { Place } from '@models/place';
import { Store } from '@ngrx/store';
import { AppStore } from '@interfaces/app-store';
import {
    selectMachineCoordinates,
    selectPlaces,
} from '@stores/places/places.selectors';
import { HelperService } from '@services/helper.service';
import { MachineCoordinate } from '@interfaces/place-state';
import { SHOW_MAP_ITEMS } from 'app/constants/map.constant';

@Component({
    standalone: true,
    selector: 'app-map-page',
    templateUrl: './map-page.component.html',
    styleUrls: ['./map-page.component.css'],
    imports: [CommonModule, MapComponent],
})
export class MapPageComponent {
    places$: Observable<Place[]> = this.store
        .select(selectPlaces)
        .pipe(HelperService.mapObjectKeysToArray());
    machineCoordinates$: Observable<MachineCoordinate[]> = this.store.select(
        selectMachineCoordinates
    );
    visibleData$!: Observable<Place[] | MachineCoordinate[]>;
    showItem: SHOW_MAP_ITEMS = SHOW_MAP_ITEMS.places;

    constructor(private store: Store<AppStore>) {
        this.showPlaces();
    }

    showPlaces(): void {
        this.showItem = SHOW_MAP_ITEMS.places;
        this.visibleData$ = this.places$;
    }

    showMachines(): void {
        this.showItem = SHOW_MAP_ITEMS.machines;
        this.visibleData$ = this.machineCoordinates$;
    }

    toggleData(): void {
        this.showItem === SHOW_MAP_ITEMS.places
            ? this.showMachines()
            : this.showPlaces();
    }
}
