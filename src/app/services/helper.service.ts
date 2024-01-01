import { Injectable } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import mapboxgl from 'mapbox-gl';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HelperService {
    static toRad = function (num: number) {
        return (num * Math.PI) / 180;
    };

    static distanceBetween(
        coords1: {
            longitude: number;
            latitude: number;
        },
        coords2: {
            longitude: number;
            latitude: number;
        }
    ) {
        const target1 = new mapboxgl.LngLat(
            coords1.longitude,
            coords1.latitude
        );
        const target2 = new mapboxgl.LngLat(
            coords2.longitude,
            coords2.latitude
        );

        return target1.distanceTo(target2);
    }

    static mapObjectKeysToArray() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return map((data: Dictionary<any>) =>
            Object.keys(data).map((key) => data[key])
        );
    }
}
