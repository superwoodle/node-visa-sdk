import { Visa } from './Visa';
export class VPA extends Visa {
    // Account Management service
    public virtualCardRequisition(requisition: VPA.VirtualCardRequisition) {
        return this.post(`/vpa/v1/accountManagement/VirtualCardRequisition`, requisition);
    }
    public managePaymentControls(parameters: any) {
        return this.post(`/vpa/v1/accountManagement/ManagePaymentControls`, parameters);
    }
    public listPaymentControl(parameters: any) {
        return this.post(`/vpa/v1/accountManagement/ListPaymentControl`, parameters);
    }
    public getAccountStatus(query: VPA.AccountStatusQuery) {
        return this.post(`/vpa/v1/accountManagement/GetAccountStatus`, query);
    }
    public getSecurityCode(parameters: any) {
        return this.post(`/vpa/v1/accountManagement/GetSecurityCode`, parameters);
    }
    public requestVirtualAccount(parameters: any) {
        return this.post(`/vpa/v1/requisitionService`, parameters);
    }
    // Single Use Account Pool Maintenance Service
    public SUAGetAccountStatus(parameters: any) {
        return this.post(`/vpa/v1/proxy/GetAccountStatus`, parameters);
    }
    public manageProxy(parameters: any) {
        return this.post(`/vpa/v1/proxy/ManageProxy`, parameters);
    }
    // Payment Service 
    public processPayments(parameters: any) {
        return this.post(`/vpa/v1/payment/ProcessPayments`, parameters);
    }
    public resendPayment(parameters: any) {
        return this.post(`/vpa/v1/payment/ResendPayment`, parameters);
    }
    public getPaymentUrl(parameters: any) {
        return this.post(`/vpa/v1/payment/GetPaymentDetailURL`, parameters);
    }
    public getPaymentDetails(parameters: any) {
        return this.post(`/vpa/v1/payment/GetPaymentDetails`, parameters);
    }
    public cancelPayment(parameters: any) {
        return this.post(`/vpa/v1/payment/CancelPayment`, parameters);
    }
    // Supplier Service
    public createSupplier(parameters: any) {
        return this.post(`/vpa/v1/supplier/CreateSupplier`, parameters);
    }
    public updateSupplier(parameters: any) {
        return this.post(`/vpa/v1/supplier/UpdateSupplier`, parameters);
    }
    public disableSupplier(parameters: any) {
        return this.post(`/vpa/v1/supplier/DisableSupplier`, parameters);
    }
    public getSupplier(parameters: any) {
        return this.post(`/vpa/v1/supplier/GetSupplierDetails`, parameters);
    }
    public manageSupplierAccount(parameters: any) {
        return this.post(`/vpa/v1/supplier/ManageSupplierAccount`, parameters);
    }
}

export namespace VPA {
    export interface VirtualCardRequisition {
        accountNumber: number;
        proxyPoolId: string;
        messageId: string;
        buyerId: number;
        requisitionDetails: {
            startDate?: string;
            endDate?: string;
            timeZone?: string;
            rules?: {
                ruleCode?: string;
                overrides?: {
                    overrideCode?: string;
                    overrideValue?: number;
                    sequence?: number;
                }[]
            }[]
        }[];
        employee: {
            eMailId?: string;
            employeeId?: string;
            companyAdminEMailId?: string;
            lastName?: string;
            firstName?: string;
            costCenter?: string;
            GL?: string;
            address?: {
                city?: string;
                countryCode?: string;
                state?: string;
                addressline1?: string;
                addressline2?: string;
                postalCode?: string;
            }
        }
        clientId: string;
        optionalField1?: string
        optionalField2?: string
        optionalField3?: string
        optionalField4?: string
        optionalField5?: string
    }
    export interface AccountStatusQuery {
        buyerId: number;
        accountRequestId: number;
        supplierId: string;
        clientId: string;
        messageId: string;
    }
}