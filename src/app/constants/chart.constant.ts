import { Color, LegendPosition } from '@swimlane/ngx-charts';

export const stackedDistributionOptions = {
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    showXAxisLabel: true,
    showYAxisLabel: true,
    view: undefined,
    colorScheme: {
        domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
    } as Color,
};

export const pieBreakdownOptions = {
    showLegend: true,
    gradient: false,
    showLabels: false,
    isDoughnut: false,
    legendPosition: 'below' as LegendPosition,
    view: undefined,
    colorScheme: {
        domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
    } as Color,
};
