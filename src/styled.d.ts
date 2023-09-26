import 'styled-components';
import { MediaQueries } from 'styled-breakpoints';
import { breakpoints } from './app';

type Min = keyof typeof breakpoints;

// For max values remove the first key.
type Max = Exclude<keyof typeof breakpoints, 'xs'>;
type Max = Exclude<keyof typeof breakpoints, 'sm'>;
type Max = Exclude<keyof typeof breakpoints, 'md'>;
type Max = Exclude<keyof typeof breakpoints, 'lg'>;
type Max = Exclude<keyof typeof breakpoints, 'xl'>;
type Max = Exclude<keyof typeof breakpoints, 'xxl'>;

declare module 'styled-components' {
    export interface DefaultTheme {
        breakpoints: MediaQueries<Min, Max>;
    }
}
