export class User {
    constructor(
        private readonly id: string,
        // Add other properties as needed
    ) {}
    
    get id(): string {
    return this.id;
    }
}
