import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { ActivatedRoute } from '@angular/router';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [LayoutComponent, NzIconTestModule],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { params: { id: '1' } },
                    },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
    });

    it('should create LayoutComponent', () => {
        // THEN
        expect(component).toBeTruthy();
        expect(fixture.nativeElement).toBeTruthy();
    });

    describe('toggleCollapsed', () => {
        it('should toggle isCollapsed', () => {
            // GIVEN
            component.isCollapsed = false;

            // WHEN
            component.toggleCollapsed();

            // THEN
            expect(component.isCollapsed).toBeTrue();
        });
    });
});
