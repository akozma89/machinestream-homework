import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../../../../components/map/map.component';
import { Observable, Subscription, map } from 'rxjs';
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
import { selectMapView } from '@stores/settings/settings.selectors';

@Component({
    standalone: true,
    selector: 'app-map-page',
    templateUrl: './map-page.component.html',
    styleUrls: ['./map-page.component.css'],
    imports: [CommonModule, MapComponent],
})
export class MapPageComponent implements OnInit {
    places$: Observable<Place[]> = this.store
        .select(selectPlaces)
        .pipe(HelperService.mapObjectKeysToArray());
    machineCoordinates$: Observable<MachineCoordinate[]> = this.store.select(
        selectMachineCoordinates
    );
    visibleData$!: Observable<Place[] | MachineCoordinate[]>;

    private subscriptions = new Subscription();

    constructor(private store: Store<AppStore>) {}

    ngOnInit(): void {
        this.subscriptions.add(
            this.store.select(selectMapView).subscribe((mapView) => {
                if (mapView === SHOW_MAP_ITEMS.machines) {
                    this.showMachines();
                } else {
                    this.showPlaces();
                }
            })
        );
    }

    showPlaces(): void {
        this.visibleData$ = this.places$;
    }

    showMachines(): void {
        this.visibleData$ = this.machineCoordinates$;
    }
}
