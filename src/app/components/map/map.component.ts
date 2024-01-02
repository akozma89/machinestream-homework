import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { environment } from '@environments/environment';
import { MachineCoordinate } from '@interfaces/place-state';
import { Machine } from '@models/machine';
import { Place } from '@models/place';
import mapboxgl from 'mapbox-gl';

type acceptedDataType = Place | Machine | MachineCoordinate;
type acceptedDataTypeArray = Place[] | Machine[] | MachineCoordinate[];

@Component({
    standalone: true,
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css'],
    imports: [CommonModule],
})
export class MapComponent implements AfterViewInit, OnChanges {
    @Input() data: acceptedDataTypeArray | null = [];
    @ViewChild('map') mapElement!: ElementRef;

    map!: mapboxgl.Map;
    markers: mapboxgl.Marker[] = [];

    constructor() {
        mapboxgl.accessToken = environment.mapboxToken;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['data']) {
            this.removeMarkers();
            this.data?.forEach((target) => this.addMarker(target));
        }
    }

    ngAfterViewInit(): void {
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
        this.data?.forEach((target) => this.addMarker(target));
    }

    addMarker(target: acceptedDataType): void {
        const marker = new mapboxgl.Marker()
            .setLngLat([target.longitude, target.latitude])
            .addTo(this.map);
        this.markers.push(marker);
    }

    removeMarkers(): void {
        this.markers.forEach((marker) => marker.remove());
        this.markers = [];
    }
}
