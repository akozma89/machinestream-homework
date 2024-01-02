import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MapComponent } from '../../../../components/map/map.component';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Place } from '@models/place';
import { Store } from '@ngrx/store';
import { AppStore } from '@interfaces/app-store';
import {
    selectMachineCoordinates,
    selectPlaces,
} from '@stores/places/places.selectors';
import { HelperService } from '@services/helper.service';
import { MachineCoordinate } from '@interfaces/place-state';
import { SHOW_MAP_ITEMS } from '@constants/map.constant';
import { selectMapView } from '@stores/settings/settings.selectors';

@Component({
    standalone: true,
    selector: 'app-map-page',
    templateUrl: './map-page.component.html',
    styleUrls: ['./map-page.component.css'],
    imports: [CommonModule, MapComponent],
})
export class MapPageComponent {
    readonly SHOW_MAP_ITEMS = SHOW_MAP_ITEMS;

    places$: Observable<Place[]> = this.store
        .select(selectPlaces)
        .pipe(HelperService.mapObjectKeysToArray());
    machineCoordinates$: Observable<MachineCoordinate[]> = this.store.select(
        selectMachineCoordinates
    );
    showMapItems$: Observable<Place[] | MachineCoordinate[]> = this.store
        .select(selectMapView)
        .pipe(
            switchMap((mapView) => {
                if (mapView === SHOW_MAP_ITEMS.machines) {
                    return this.machineCoordinates$;
                } else {
                    return this.places$;
                }
            })
        );

    private subscriptions = new Subscription();

    constructor(private store: Store<AppStore>) {}
}
