import { Injectable } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HelperService {
    static toRad = function (num: number) {
        return (num * Math.PI) / 180;
    };

    static haversineDistance(
        coords1: {
            longitude: number;
            latitude: number;
        },
        coords2: {
            longitude: number;
            latitude: number;
        },
        isMiles = false
    ) {
        const { longitude: lon1, latitude: lat1 } = coords1;
        const { longitude: lon2, latitude: lat2 } = coords2;
        const R = 6371;
        const x1 = lat2 - lat1;
        const dLat = HelperService.toRad(x1);
        const x2 = lon2 - lon1;
        const dLon = HelperService.toRad(x2);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(HelperService.toRad(lat1)) *
                Math.cos(HelperService.toRad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        let d = R * c;

        if (isMiles) d /= 1.60934;

        return d;
    }

    static mapObjectKeysToArray() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return map((data: Dictionary<any>) =>
            Object.keys(data).map((key) => data[key])
        );
    }
}
