export default class Container {
    container: HTMLDivElement

    constructor() {
        this.container = document.createElement('div')
        this.addStyle()
    }

    private addStyle() {
        this.container.style.width = '100%';
        this.container.style.height = '100%';
    }

    init(mapId: string) {
        this.container.id = mapId;
        document.querySelector<HTMLDivElement>('#app')!.appendChild(this.container)
    }
}