## Google People API (Node JS Sample)

### Imports

```javascript
const { google } = require("googleapis");
const path = require("path");
```

### Required

```javascript
const keyFile = path.join(__dirname, "./credential.json");
const scopes = ["https://www.googleapis.com/auth/contacts"];
```

### Configuration

```javascript
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
```

### People API Crud

- Create Contacts
- Get All Contacts
- Get A Specific Contact
- Update Contacts
- Delete Contacts

#### Create Contacts

```javascript
people.createContact(
  {
    resource: {
      names: {
        givenName: "Muhammad",
        familyName: "Zeeshan",
      },
      emailAddresses: {
        value: "muhammadzeeshan@gmail.com",
        type: "home",
      },
      phoneNumbers: [
        {
          value: "01234567890",
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
```

#### Get All Contacts

```javascript
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
```

#### Get A Specific Contact

```javascript
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
```

#### Update A Specific Contact

```javascript
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
        familyName: "Yaseen",
      },
      emailAddresses: {
        value: "zuhaibyaseen023@gmail.com",
        type: "home",
      },
      phoneNumbers: [
        {
          value: "01234560001",
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
```

#### Delete A Specific Contact

```javascript
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
```
