import {
    LoadMachineCoordinates,
    LoadPlacesAction,
    LoadPlacesErrorAction,
    LoadPlacesSuccessAction,
} from './places.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, of, switchMap } from 'rxjs';
import { Machine } from '../../models/machine.model';
import { Place } from '../../models/place.model';
import { HelperService } from '../../services/helper.service';
import { MachineCoordinate } from '../../interfaces/place-state.interface';
import { environment } from '../../../environments/environment';

@Injectable()
export class PlacesEffect {
    loadPlaces$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LoadPlacesAction.type),
            switchMap(({ machines }: { machines: Machine[] }) => {
                const { places, coordinates } =
                    this.buildPlacesAndCoordinates(machines);

                return of(
                    LoadPlacesSuccessAction({ places }),
                    LoadMachineCoordinates({ coordinates })
                );
            }),
            catchError((error) => of(LoadPlacesErrorAction({ error })))
        );
    });

    constructor(private actions$: Actions) {}

    buildPlacesAndCoordinates(machines: Machine[]): {
        coordinates: MachineCoordinate[];
        places: Place[];
    } {
        const places: Place[] = [];
        const coordinates: MachineCoordinate[] = [];

        machines.forEach((machine: Machine) => {
            const existingPlace: Place = places.find(
                (place) =>
                    HelperService.distanceBetween(place, machine) <
                    environment.settings.placeAccuracyInKm
            ) as Place;
            const place =
                existingPlace ||
                new Place({
                    latitude: machine.latitude,
                    longitude: machine.longitude,
                });

            place.addMachine(machine);
            coordinates.push(this.buildCoordinate(machine));

            if (!existingPlace) {
                places.push(place);
            }
        });

        return { places, coordinates };
    }

    buildCoordinate(machines: Machine): MachineCoordinate {
        return {
            machineId: machines.id,
            placeId: machines.id,
            latitude: machines.latitude,
            longitude: machines.longitude,
            floor: machines.floor,
        };
    }
}
