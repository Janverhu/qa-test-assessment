export class Attributes {
    attr: Object;

    constructor(attrObject: Object) {
        this.attr = attrObject;
    }

    getKeyValue( key: string ) {
        return this.attr[key];
    }

    getValueKey( value: string ) {
        const index = this.getValues().indexOf(value);
        return this.getKeys()[index];
    }

    getKeys() {
        return Object.keys(this.attr);
    }

    getValues() {
        return Object.values(this.attr);
    }

    getEntries() {
        return Object.entries(this.attr);
    }

    addEntry(key: string, value: string) {
        Object.defineProperty(this.attr, key, {
            value: value,
            writable: true,
            enumerable: true,
            configurable: true
        });
    }

    getObject() {
        return this.attr;
    }
}
