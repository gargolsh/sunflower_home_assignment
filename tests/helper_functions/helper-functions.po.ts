const randomBool = require("random-bool")
export class HelperFunctions {


    async generateRandomEmail() {
        const randomString = require("randomstring");
        return randomString.generate({length: 10, capitalization: 'lowercase'}) + '@test.com'
    }

    async generateRandomPassword() {
        const randomString = require("randomstring");
        return randomString.generate({length: 8, charset: 'alphanumeric', readable: true})
    }

    generateRandomBool() {
        return randomBool()
    }


}