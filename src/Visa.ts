import * as fs from 'fs';
import * as rest from './utils/rest';

export interface VisaApiCredentials {
    userId: string;
    password: string;
    certificate_file_path: string;
    certificate_passphrase: string;
}

export enum Endpoint {
    Sandbox = 'https://sandbox.api.visa.com',
    Certification = 'https://cert.api.visa.com',
    Production = 'https://api.visa.com',
}

export class Visa {
    private _credentials: rest.VisaApiCredentials;
    private _host: Endpoint;
    constructor({ userId, password, certificate_passphrase, certificate_file_path }: VisaApiCredentials, host = Endpoint.Sandbox) {
        const certificate = fs.readFileSync(certificate_file_path);
        this._host = host;
        this._credentials = {
            userId,
            certificate,
            password,
            certificate_passphrase
        };
    }
    protected get(uri: string, options?: rest.options) {
        return rest._get(this._credentials, `${this._host}${uri}`, options)
    }
    protected delete(uri: string, options?: rest.options) {
        return rest._delete(this._credentials, `${this._host}${uri}`, options)
    }
    protected put(uri: string, body: any, options?: rest.options) {
        return rest._put(this._credentials, `${this._host}${uri}`, body, options)
    }
    protected post(uri: string, body: any, options?: rest.options) {
        return rest._post(this._credentials, `${this._host}${uri}`, body, options)
    }
    
    public helloWorld() {
        return this.get(`/vdp/helloworld`);
    }
} 
