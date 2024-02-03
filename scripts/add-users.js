const fs = require('fs');

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function makenum(length) {
    let result = '';
    const characters = '1234567890';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

let data = require('../charts/casdoor/config/init_data.json');
const users = [];

const userTemplate = data.users[0];

for(let i=1; i<501; i++) {
    const user = {...userTemplate};
    user.name = `user-${i}`;
    user.displayName = user.name;
    user.email = makeid(8) + '@example.com';
    user.phone = makenum(10);
    users.push(user);
}

data.users = users;
console.log(JSON.stringify(data, true, 2))