import {AppKernel} from '../app/app-kernel';

export abstract class BaseContainer {
    protected instances = {};

    constructor(protected app: AppKernel) {}

    protected fetchInstance(name: string, cb: Function) {
        if (this.instances[name]) {
            return this.instances[name];
        }

        this.instances[name] = cb();
        return this.instances[name];
    }
}
