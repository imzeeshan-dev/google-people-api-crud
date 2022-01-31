const { google } = require("googleapis");
const path = require("path");

const keyFile = path.join(__dirname, "./credential.json");
const scopes = ["https://www.googleapis.com/auth/contacts"];

const run = async () => {
  const { people } = google.people({
    version: "v1",
    auth: await google.auth.getClient({
      /*  we need 2 things for the configuration of the client
            1. Key File
            2. Scopes
        */
      keyFile,
      scopes,
    }),
  });

  // ? Create Contacts
  people.createContact(
    {
      resource: {
        names: {
          givenName: "Muhammad",
          familyName: "Zeeshan",
        },
        emailAddresses: {
          value: "regalcoderz@gmail.com",
          type: "home",
        },
        phoneNumbers: [
          {
            value: "+92 318 7649 354",
            type: "home",
          },
        ],
      },
    },
    (err, res) => {
      if (err) {
        console.log("The API returned an error: " + err);
      } else {
        console.log(res.data);
      }
    }
  );

  // ? Get All Contacts

  people.connections.list(
    {
      resourceName: "people/me",
      personFields: "names",
    },
    (err, res) => {
      if (err) return console.error("The API returned an error: " + err);
      const gContacts = res.data.connections;
      if (gContacts) {
        console.log("Connections:");
        gContacts.forEach((person) => {
          if (person.names && person.names.length > 0) {
            console.log(`- ${person.names[0].displayName}`);
          } else {
            console.log("No display name found for connection.");
          }
        });
      } else {
        console.log("No connections found.");
      }
    }
  );

  // ? Get Single Contact

  people.get(
    {
      resourceName: "people/c4328366331976477502",
      personFields: "names",
    },
    (err, res) => {
      if (err) return console.error("The API returned an error: " + err);
      const person = res.data;
      if (person) {
        console.log(person);
      } else {
        console.log("No person found.");
      }
    }
  );

  // ? Update Single Contact

  people.updateContact(
    {
      resourceName: "people/c4328366331976477502",
      personFields: "names,emailAddresses,phoneNumbers", // There should be no spaces between the commas, otherwise it returns an error.
      updatePersonFields: "names,emailAddresses,phoneNumbers",
      resource: {
        // Person.metadata.sources.etag
        etag: "%EgUBAi43PRoEAQIFByIMMVRobi9zZ29IY2M9",

        names: {
          givenName: "Muhammad",
          familyName: "Zshaan",
        },
        emailAddresses: {
          value: "muhammadzshaan@gmail.com",
          type: "home",
        },
        phoneNumbers: [
          {
            value: "+92 318 7649 354",
            type: "home",
          },
        ],
      },
    },
    (err, res) => {
      if (err) {
        console.log("The API returned an error: " + err);
      } else {
        console.log("Contact updated: " + res);
      }
    }
  );

  // ? Delete Single Contacts

  people.deleteContact(
    {
      resourceName: "people/c3165744222806150724",
    },
    (err, res) => {
      if (err) {
        console.log("The API returned an error: " + err);
      } else {
        console.log("Contact deleted: " + res.data);
      }
    }
  );

  /* ================== End of Functions ================== */
};

run();