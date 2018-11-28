import { v4 as uuid } from 'uuid';
import { LayoutElementType } from '../../enums/layout-element-type.enum';

// DTO
export class BaseShared {

    static toJson(model: Partial<BaseShared>) {
        return model && (model.toJson ? model.toJson() : model);
    }

    /**
     * Never can return object with undefined value anywhere.
     */
    static getFormedObject<T>(model: any, source: Partial<T>): Partial<T> {
        const result: Partial<T> = {};
        for (const prop in source) {
            if (model[prop] !== undefined) {
                result[prop] = model[prop];
            } else {
                result[prop] = source[prop];
            }
        }
        return result;
    }

    static addTypes(model: BaseShared): BaseShared {
        return model;
    }

    localId: string;

    id: number;

    frontType: LayoutElementType;

    constructor(source: Partial<BaseShared>) {
        this.localId = uuid();
        this.init(source);
    }

    toJson(): any {
        return { localId: this.localId, id: this.id };
    }

    private init(source: Partial<BaseShared>) {
        for (const prop in source) {
            this[prop] = source[prop];
        }
    }
} 