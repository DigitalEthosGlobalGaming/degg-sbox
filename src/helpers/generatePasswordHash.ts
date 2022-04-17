
let bcrypt = require("bcryptjs");

export function generatePasswordHash(password: string) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
export function validatePassword(password: string, passwordB: string) {
    return bcrypt.compareSync(password, passwordB);
};
