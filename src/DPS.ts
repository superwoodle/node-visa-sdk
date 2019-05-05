import { Visa } from './Visa';

export class DPS extends Visa {
    public createCardId(models: DPS.CardIdModel[]) {
        return this.post(`/dcas/cardservices/v1/cards`, { cardIdModel: models });
    }
}

export namespace DPS {
    export interface CardIdModel {
        pan: string;
        lookUpBalances?: boolean;
    }
}