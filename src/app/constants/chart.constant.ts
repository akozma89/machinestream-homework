import { Color, LegendPosition } from '@swimlane/ngx-charts';

export const STACKED_DISTRIBUTION_OPTIONS = {
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    legendPosition: 'right' as LegendPosition,
    showXAxisLabel: true,
    showYAxisLabel: true,
    view: [700, 400] as [number, number],
    colorScheme: {
        domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
    } as Color,
};

export const PIE_BREAKDOWN_OPTIONS = {
    showLegend: true,
    gradient: false,
    showLabels: false,
    isDoughnut: false,
    legendPosition: 'right' as LegendPosition,
    view: [700, 400] as [number, number],
    colorScheme: {
        domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
    } as Color,
};
