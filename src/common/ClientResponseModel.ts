export class ClientResponseModel<T>{
    public record?: T
    public extraData?: any;
    get recordto() {
        return this.extraData
    }
}
