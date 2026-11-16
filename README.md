# Banking-Ledger
Express | Authentication | JavaScript | Backend

## MONGODB CONGIGURATION 
- .env save your mongodb uri and yor jwt token 
- Connect your compass and Atlas each other.
- Note: "if you stuck anywhere then feel free to teke help of AI" 

## hashing and Bcrypt.js

- password are not directly saved to db
- before save password are converted into hash
- now when user login then the hash is compared by bcrypt 
- when we are reating models of the db ./model/usermodels.js at password field we done select false. it never goes password anywhre only other fields of user model can imported not this field
- findOne({email}).select("+password") * it only hav hash of password * 
- comare only done throgh "Salting"

# Sucess message to user after login 
### nodemailer setup | sucessfull bord in message    
[Guide to setup nodemailer](https://github.com/ankurdotio/Difference-Backend-video/tree/main/026-nodemailer) - click ctrl + Enter to open this link on new page