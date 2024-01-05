import { MACHINE_TYPE_OPTIONS } from '@constants/machine.constant';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MapComponent } from '../../../../components/map/map.component';
import {
    BehaviorSubject,
    Observable,
    Subscription,
    combineLatest,
    map,
    switchMap,
} from 'rxjs';
import { Place } from '@models/place.model';
import { Store } from '@ngrx/store';
import { AppStore } from '@interfaces/app-store.interface';
import {
    selectMachineCoordinates,
    selectPlaces,
} from '@stores/places/places.selectors';
import { HelperService } from '@services/helper.service';
import { MachineCoordinate } from '@interfaces/place-state.interface';
import { SHOW_MAP_ITEMS } from '@constants/map.constant';
import { selectMapView } from '@stores/settings/settings.selectors';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormsModule } from '@angular/forms';
import { UpdateMapViewAction } from '@stores/settings/settings.actions';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { MachineTypeOption } from '@interfaces/machine.interface';

@Component({
    standalone: true,
    selector: 'app-map-page',
    templateUrl: './map-page.component.html',
    styleUrls: ['./map-page.component.css'],
    imports: [
        CommonModule,
        MapComponent,
        NzSelectModule,
        NzGridModule,
        FormsModule,
        NzSpinModule,
    ],
})
export class MapPageComponent {
    filter = new BehaviorSubject<null>(null);

    currentShowMapItem!: SHOW_MAP_ITEMS;

    readonly SHOW_MAP_ITEMS = SHOW_MAP_ITEMS;

    places$: Observable<Place[]> = this.store
        .select(selectPlaces)
        .pipe(HelperService.mapObjectKeysToArray());
    machineCoordinates$: Observable<MachineCoordinate[]> = this.store.select(
        selectMachineCoordinates
    );
    mapView$: Observable<SHOW_MAP_ITEMS> = this.store.select(selectMapView);
    showMapItems$: Observable<Place[] | MachineCoordinate[]> =
        this.mapView$.pipe(
            switchMap((mapView) => {
                this.currentShowMapItem = mapView;

                if (mapView === SHOW_MAP_ITEMS.machines) {
                    return this.machineCoordinates$;
                } else {
                    return this.places$;
                }
            })
        );

    private subscriptions = new Subscription();

    constructor(private store: Store<AppStore>) {}

    onShowMapItemChange(mapView: SHOW_MAP_ITEMS) {
        this.store.dispatch(
            UpdateMapViewAction({
                mapView,
            })
        );
    }
}
