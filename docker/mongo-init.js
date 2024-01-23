db.createUser({
    user:"root",
    pwd:"example",
    roles : [{role : "readWrite", db: "topmusic"}]
})

db.users.createIndex({email:1}, {unique:true})