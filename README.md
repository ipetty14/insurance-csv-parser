# CSV Insurance Parser

A CSV parser that sorts user data based on insurance companies.
## Getting Started

### Dependencies

* Node
* NPM

### Installing

* Clone repository
* Run `npm install`

### Executing program

* Once installed, look for the [main-insurance-data.csv](main-insurance-data.csv) file for an example. You can replace this file with another by the same name. The file must include the "user_id", "insurance_company", and "version" columns
* Run the following command:
```
npm start
```
* Once complete, there will be several new CSV files. Each one will be named after a unique insurance company found in the main data (see above). The user information relevant to that company will be included in each file. If any user ID's match within a company, the user record with the higher version is kept and the other in removed. This means each user_id should be unique within each file.

Note: A user's record can exist across multiple insurance companies.

## Authors

Ian Petty

[Github](https://github.com/ipetty14)

## Version History

* 1.0.0
    * Initial release
