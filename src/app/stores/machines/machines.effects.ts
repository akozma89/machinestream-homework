import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MachineApiService } from './../../services/machine-api.service';
import { Injectable } from '@angular/core';
import {
    LoadMachinesAction,
    LoadMachinesErrorAction,
    LoadMachinesSuccessAction,
} from './machines.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Machine } from '../../models/machine';
import { LoadPlacesAction } from '../places/places.actions';

@Injectable()
export class MachinesEffects {
    loadMachines$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LoadMachinesAction.type),
            switchMap(() =>
                this.machineApiService.getMachines().pipe(
                    map(({ data }) =>
                        data.map((machine) => new Machine(machine))
                    ),
                    switchMap((machines) =>
                        of(
                            LoadMachinesSuccessAction({
                                machines: machines,
                            }),
                            LoadPlacesAction({ machines })
                        )
                    ),
                    catchError((error) =>
                        of(LoadMachinesErrorAction({ error }))
                    )
                )
            )
        );
    });
    constructor(
        private actions$: Actions,
        private machineApiService: MachineApiService
    ) {}
}
