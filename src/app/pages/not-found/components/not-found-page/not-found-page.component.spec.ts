import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundPageComponent } from './not-found-page.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NotFoundPageComponent', () => {
    let component: NotFoundPageComponent;
    let fixture: ComponentFixture<NotFoundPageComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NotFoundPageComponent, RouterTestingModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NotFoundPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
