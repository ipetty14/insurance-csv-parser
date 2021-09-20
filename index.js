const fs = require('fs');
const CSVToJSON = require('csvtojson');
const papaparse = require('papaparse');

(async () => {
  const csvData = await CSVToJSON()
    .fromFile('main-insurance-data.csv')
    .then((users) => {
      return users;
    })
    .catch((err) => {
      console.log(err);
    });

  let uniqueUsersByInsuranceCompany = [];

  csvData.map((user) => {
    if (!uniqueUsersByInsuranceCompany[user.insurance_company]) {
      uniqueUsersByInsuranceCompany[user.insurance_company] = [];
      uniqueUsersByInsuranceCompany[user.insurance_company].push(user);
    } else {
      uniqueUsersByInsuranceCompany[user.insurance_company].filter(
        (existing_user, index) => {
          if (existing_user.user_id === user.user_id) {
            // Check if the current user's user ID is found in the insurance company array.
            if (user.version > existing_user.version) {
              // Once found, we check for the user verison. The higher one stays.
              uniqueUsersByInsuranceCompany[existing_user.insurance_company][
                index
              ] = user;
            }
          } else {
            // If not then it is safe to add the new user.
            uniqueUsersByInsuranceCompany[user.insurance_company].push(user);
          }
        }
      );
    }
  });

  Object.keys(uniqueUsersByInsuranceCompany).map((key) => {
    const data = papaparse.unparse(uniqueUsersByInsuranceCompany[key], {
      delimiter: ',',
      header: true,
    });

    fs.writeFile(key + '.csv', data, {}, () => {});
  });
})();
