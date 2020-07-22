declare module 'random-material-color' {
    // prettier-ignore
    type Shade = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'A100' | 'A200' | 'A400' | 'A700'

    type GetColorOptions = {
        shades?: Shade[]
        text?: string
    }

    function getColor(options: GetColorOptions): string

    export = {getColor}
}
