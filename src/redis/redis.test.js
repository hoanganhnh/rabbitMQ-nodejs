const { set, get } = require("./redis.util");

set("user:01", 1);

console.log(get("user:01"));
