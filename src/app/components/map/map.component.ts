import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { environment } from '@environments/environment';
import { MachineCoordinate } from '@interfaces/place-state.interface';
import { Machine } from '@models/machine.model';
import { Place } from '@models/place.model';
import mapboxgl from 'mapbox-gl';
import { NgxResizeObserverModule } from 'ngx-resize-observer';
import { Subject, Subscription, debounceTime } from 'rxjs';

type acceptedDataType = Place | Machine | MachineCoordinate;
type acceptedDataTypeArray = Place[] | Machine[] | MachineCoordinate[];

@Component({
    standalone: true,
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
    imports: [CommonModule, NgxResizeObserverModule],
})
export class MapComponent
    implements OnInit, OnDestroy, AfterViewInit, OnChanges
{
    @Input() data: acceptedDataTypeArray | null = [];
    @ViewChild('map') mapElement!: ElementRef;

    map!: mapboxgl.Map;
    markers: mapboxgl.Marker[] = [];

    private resize$ = new Subject<void>();
    private subscriptions = new Subscription();

    constructor() {
        mapboxgl.accessToken = environment.mapboxToken;
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.resize$
                .pipe(debounceTime(100))
                .subscribe(() => this.resizeMap())
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data']) {
            this.removeMarkers();
            this.data?.forEach((target) => this.addMarker(target));
        }
    }

    ngAfterViewInit(): void {
        this.createMap();
        this.data?.forEach((target) => this.addMarker(target));
    }

    triggerResize(): void {
        this.resize$.next();
    }

    private createMap(): void {
        this.map = new mapboxgl.Map({
            container: this.mapElement.nativeElement,
            style: 'mapbox://styles/akozma/clqu9ju9y00tm01r54z03he38',
            center: this.data?.reduce(
                (acc, target) => {
                    const [lng, lat] = acc;

                    if (!lng || !lat) {
                        return [target.longitude, target.latitude];
                    }

                    return [
                        (lng + target.longitude) / 2,
                        (lat + target.latitude) / 2,
                    ];
                },
                [0, 0]
            ),
            zoom: 18,
        });
    }

    private addMarker(target: acceptedDataType): void {
        const marker = new mapboxgl.Marker()
            .setLngLat({
                lng: target.longitude,
                lat: target.latitude,
            })
            .addTo(this.map);
        this.markers.push(marker);
    }

    private removeMarkers(): void {
        this.markers.forEach((marker) => marker.remove());
        this.markers = [];
    }

    private resizeMap(): void {
        this.map.resize();
    }
}
