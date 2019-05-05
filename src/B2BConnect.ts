import { Visa } from './Visa';
import { options } from './utils/rest';

export class B2BConnect extends Visa {
    // Bank API
    public getBank(bankId: string) {
        return this.get(`/visab2bconnect/v1/banks/${bankId}`);
    }
    public getBankNetPosition(bankId: string, date?: string) {
        const options: options = { qs: { bankId, date } };
        return this.get(`/visab2bconnect/v1/banks/netPosition`, options);
    }
    public getCompanies(bankId: string, keyword?: string) {
        const options: options = { qs: { bankId, keyword } };
        return this.get(`/visab2bconnect/v1/companies/banks`, options);
    }
    // Company API
    public addCompany(parameters: B2BConnect.CompanyAddBody) {
        return this.post(`/visab2bconnect/v1/companies`, parameters);
    }
    public editCompany(enterpriseId: string, parameters: B2BConnect.CompanyEditPutBody) {
        return this.put(`/visab2bconnect/v1/companies/${enterpriseId}`, parameters);
    }
    // Payments API
    public makePayment(parameters: B2BConnect.PaymentParameters) {
        return this.post(`/visab2bconnect/v1/payments`, parameters);
    }
    public getEffectiveConversionRate(sourceCurrencyISOCode: string, targetCurrencyISOCode: string, effectiveDate?: string) {
        const options: options = { qs: { sourceCurrencyISOCode, targetCurrencyISOCode, effectiveDate } };
        return this.get(`/visab2bconnect/v1/companies/banks`, options);
    }
    public searchPayment(bankId: string, searchType: 'I' | 'O', keyword: string, toDate?: string, fromDate?: string) {
        const options: options = { qs: { toDate, fromDate } };
        return this.get(`/visab2bconnect/v1/payments/bankId/${bankId}/searchType/${searchType}/keyword/${keyword}`, options);
    }

}

export namespace B2BConnect {
    export interface CompanyAddBody {
        bankId: string;
        companyId: string;
        transactionLimits?: {
            customLimits: boolean;
            singleTransaction: string;
            dailyVolume: string;
        },
        blockedCorridors?: {
            blockedCountries?: {
                blockedDesc: string;
                isoCountryCode: number;
            }[]
        },
        companyProfile: {
            defaultCurrencyIsoCode: number;
            doingBusinessAs: string;
            industryCode: string;
            businessRegistrationNumber: string;
            bankAccountNumber: string;
            bankRoutingNumber: string;
            iban: string;
            clabe: string;
            chipsUid: string;
            swiftLEI: string;
            taxId: string;
            corporateLegalName: string;
            address: {
                line1: string;
                unitNo: string;
                city: string;
                state: string;
                zipCode: number;
                countryDisplayName: string;
                countryIsoCode: number;
            };
            primaryContact: {
                name: string;
                jobTitle: string;
                email: string;
                phone: string;
            };
            secondaryContact: {
                name: string;
                jobTitle: string;
                email: string;
                phone: string;
            };
            authorizedSignatory: {
                fullName: string;
                nationalityCountryCodeISO: number;
                countryOfResidenceCodeISO: number;
            };
            ownershipDetails: {
                fullName: string;
                entityName: string;
                address: string;
                email: string;
                entityOwner: string;
                nationalityCountryCode: string;
                countryOfResidence: string;
                nationalityCountryCodeISO: string;
                countryOfResidenceISO: number;
                isIndividual: boolean;
                isActive: boolean;
                ownerIndividuals: any;
            }[]
            remitProfile: {
                deliveryMethod: string,
                attachmentFormat: string,
                frequency: string,
                email: string

            },
            reconcileProfile: {
                deliveryMethod: string,
                attachmentFormat: string,
                frequency: string,
                email: string
            }
        }
    }

    export type CompanyEditPutBody = any;
    export interface PaymentParameters {
        senderEnterpriseId: string,
        receiverEnterpriseId: string,
        receiverBic: number,
        senderBic: number,
        invoiceDetails: {
            invoiceNumber: string,
            poNumber: string,
            paymentAmount: number,
            paymentCurrencyIsoCode: number,
            notes: string,
            partialPayment: boolean
        }[]
    }
}