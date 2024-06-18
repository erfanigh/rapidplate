export class Err extends Error {
    details: { [key: string]: any };

    constructor(message: string, details: { [key: string]: any }) {
        super(message);
        this.name = '\nErr'; // Set the error name
        this.details = details;
        
        // Set the prototype explicitly to maintain instanceof checks
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
