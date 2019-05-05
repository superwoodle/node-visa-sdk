import { Visa } from './Visa';

export class MerchantSearch extends Visa {
    public search(query: MerchantSearch.Query) {
        return this.post(`/merchantsearch/v1/search`, query);
    }
}

export namespace MerchantSearch {
    export interface Query {
        searchAttrList: {
            merchantName: string;
            merchantCity?: string;
            merchantState?: string;
            merchantPostalCode?: number;
            merchantCountryCode?: number;
            merchantStreetAddress?: string;
            merchantUrl?: string;
            acquirerCardAcceptorId?: string;
            merchantPhoneNumber?: number;
            acquiringBin?: number;
        }
        responseAttrList: string[];
        searchOptions: {
            wildCard: string[];
            maxRecords?: number;
            matchIndicators?: boolean;
            matchScore?: boolean;
            proximity: string[];
        };
        header: {
            requestMessageId: string;
            startIndex?: number;
            messageDateTime?: string;
        }

    }
}