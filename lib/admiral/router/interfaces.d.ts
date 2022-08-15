import { Location } from 'history';
export interface RouterLocationState {
    nextPathname?: string;
    nextSearch?: string;
    background?: Location<RouterLocationState>;
    routeWithBackground?: string;
    update?: {
        dataTable?: boolean;
    };
}
