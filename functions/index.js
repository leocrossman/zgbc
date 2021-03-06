const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

const admin = require('firebase-admin');
admin.initializeApp();

const { google } = require('googleapis');
const { promisify } = require('util');

// // Imports the Google Cloud client library
// const { Logging } = require('@google-cloud/logging');

// // Creates a client
// const logging = new Logging();

// const logName = 'Name of the log from which to list entries, e.g. my-log';

function sameDay(d1, d2) {
  if (!(d1 instanceof Date)) return false; // if not a date, make a new day
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

const dateColonToDash = (date) => {
  const dateString = date.toISOString();
  return dateString.replace(/:/gi, '_');
};

const dateDashToColon = (dateString) => {
  const dateColonString = dateString.replace(/_/gi, ':');
  const dateAsUTCCount = Date.parse(dateColonString);
  return new Date(dateAsUTCCount);
};

const dashChecker = (dashedDate) => {
  // Check if we are getting the string of dashed date
  return dashedDate.match(/_/gi);
};

Date.prototype.stdTimezoneOffset = function () {
  const jan = new Date(this.getFullYear(), 0, 1);
  const jul = new Date(this.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

Date.prototype.dst = function () {
  return this.getTimezoneOffset() < this.stdTimezoneOffset();
};

const correctTime = (date) => {
  const isDST = date.dst() ? true : false;
  let estOffset = isDST ? 4 : 5;
  estOffset = estOffset * 60 * 60 * 1000;

  const dateMillis = date.getTime();

  const curretEST = dateMillis - estOffset;
  const estString = new Date(curretEST).toUTCString();
  return estString;
};

exports.submitSymptoms = functions.https.onRequest(async (req, res) => {
  // cors(req, res, async () => {
  //   if (await !req.body.firstName) {
  //     return res.status(200).send('CORS DONE.');
  //   }
  // }); // CORS EMPTY CALLBACK ALLOWS CROSS-SITE HTTP REQUESTS
  if (req.method === 'OPTIONS') {
    console.log('!OPTIONS');
    var headers = {};
    // IE8 does not allow domains to be specified, just the *
    // headers["Access-Control-Allow-Origin"] = req.headers.origin;
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
    headers['Access-Control-Allow-Credentials'] = false;
    headers['Access-Control-Max-Age'] = '86400'; // 24 hours
    headers['Access-Control-Allow-Headers'] =
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';
    res.writeHead(200, headers);
    res.end();
  } else {
    console.log('Received the request');
    functions.logger.log(
      "Here's the req.body object:",
      JSON.stringify(req.body)
    );
    functions.logger.log("Here's the req object:", req);
    functions.logger.log("Here's the res object:", res);

    // console.log('Received the request. Here is the res object:\n', res);
    try {
      const { spreadsheetId } = require('./spreadsheetId_secret.json');

      const value = await req.body;
      const firstName = value.firstName;
      const lastName = value.lastName;
      const email = value.email;
      const response1 = value.q1;
      const response2 = value.q2;
      const response3 = value.q3;
      const cleared = value.cleared;

      const auth = await google.auth.getClient({
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const api = google.sheets({ version: 'v4', auth });
      const getSheets = promisify(api.spreadsheets.get.bind(api.spreadsheets));
      const sheetData = await getSheets({
        spreadsheetId: spreadsheetId,
      });
      const allSheets = sheetData.data.sheets;
      // res.send(sheetData);
      let lastSheetTitle = allSheets[allSheets.length - 1].properties.title;
      if (!(lastSheetTitle instanceof Date) && dashChecker(lastSheetTitle)) {
        // if the last sheet is not in colon format, update for comparing dates below
        lastSheetTitle = dateDashToColon(lastSheetTitle);
      }
      let newSheetTitle; // initialize for scoping later
      const currentTime = new Date();
      const keepSheet = sameDay(lastSheetTitle, currentTime); // if false, make new sheet for orders...
      // first order will make a new order sheet for the new day
      if (!keepSheet) {
        currentTimeDashed = dateColonToDash(currentTime); // current time with underscores instead of colons bc of sheets api
        const addSheet = promisify(
          api.spreadsheets.batchUpdate.bind(api.spreadsheets)
        );
        // just make a new sheet so that we can get its sheetId
        const addTabRequest = {
          auth: auth,
          spreadsheetId: spreadsheetId,
          resource: {
            requests: [
              {
                addSheet: {
                  properties: {
                    // title: currentTime,
                    title: currentTimeDashed,
                  },
                },
              },
            ],
          },
        };

        await addSheet(addTabRequest);
        console.log('Sheet added.');
        const getNewSheets = promisify(
          api.spreadsheets.get.bind(api.spreadsheets)
        );
        const newSheetData = await getNewSheets({
          spreadsheetId: spreadsheetId,
        });
        const newSheetList = newSheetData.data.sheets;
        const newSheetId =
          newSheetList[newSheetList.length - 1].properties.sheetId;
        newSheetTitle = newSheetList[newSheetList.length - 1].properties.title;

        const formatNewSheet = {
          auth: auth,
          spreadsheetId: spreadsheetId,
          resource: {
            requests: [
              {
                insertRange: {
                  range: {
                    sheetId: newSheetId,
                    startRowIndex: 0,
                    endRowIndex: 1,
                  },
                  shiftDimension: 'ROWS',
                },
              },
              {
                pasteData: {
                  data:
                    'Timestamp, First Name, Last Name, Email, Any COVID-19 Symptoms in the past 14 days? , Any positive COVID-19 tests in the past 14 days?, Any close contact with confirmed or suspected COVID-19 cases in the past 14 days?, Cleared to go to the office?',
                  type: 'PASTE_NORMAL',
                  delimiter: ',',
                  coordinate: {
                    sheetId: newSheetId,
                    rowIndex: 0,
                  },
                },
              },
              {
                repeatCell: {
                  range: {
                    sheetId: newSheetId,
                    startRowIndex: 0,
                    endRowIndex: 1,
                    startColumnIndex: 0,
                    endColumnIndex: 8,
                  },
                  cell: {
                    userEnteredFormat: {
                      // backgroundColor: {
                      //   red: 0.0,
                      //   green: 1.0,
                      //   blue: 0.0,
                      // },
                      wrapStrategy: 'WRAP',
                      textFormat: {
                        foregroundColor: {
                          red: 0.0,
                          green: 0.0,
                          blue: 0.0,
                        },
                        fontSize: 12,
                        bold: true,
                      },
                    },
                  },
                  fields:
                    'userEnteredFormat(backgroundColor,textFormat,wrapStrategy)',
                },
              },
              {
                updateSheetProperties: {
                  properties: {
                    sheetId: newSheetId,
                    gridProperties: {
                      frozenRowCount: 1,
                    },
                  },
                  fields: 'gridProperties.frozenRowCount',
                },
              },
            ],
          },
        };
        const addFormat = promisify(
          api.spreadsheets.batchUpdate.bind(api.spreadsheets)
        );
        // add formatting to new sheet now that we have sheetId ref
        await addFormat(formatNewSheet);
        // await addFormat(formatNewSheet, err => {
        //   if (err) {
        //     // Handle error.
        //     console.log(err);
        //   } else {
        //     console.log('Sheet updated.');
        //   }
        // });
      }

      if (newSheetTitle) {
        console.log('newSheetTitle:', newSheetTitle);
      }
      if (
        lastSheetTitle instanceof Date &&
        typeof lastSheetTitle !== 'string'
      ) {
        // if the last sheet is not in colon format, update for comparing dates below
        lastSheetTitle = dateColonToDash(lastSheetTitle);
      } else if (lastSheetTitle === 'string') {
        console.log('lastSheetTitle:', lastSheetTitle);
        lastSheetTitle = null;
        console.log('lastSheetTitle:', lastSheetTitle);
      }

      const appendRows = promisify(
        api.spreadsheets.values.append.bind(api.spreadsheets)
      );
      await appendRows(
        {
          auth: auth,
          spreadsheetId: spreadsheetId,
          range: newSheetTitle || lastSheetTitle,
          valueInputOption: 'USER_ENTERED',
          resource: {
            values: [
              [
                correctTime(new Date()),
                firstName,
                lastName,
                email,
                response1 ? 'YES' : 'NO',
                response2 ? 'YES' : 'NO',
                response3 ? 'YES' : 'NO',
                cleared ? 'YES' : 'NO',
              ],
            ],
          },
        }
        // Add below for error checking, but we want the send to happen
        // before 60 seconds and the function times out.
        // for some reason, adding the error callback causes the function to timeout.
        // err => {
        //   if (err) console.log(err);
        //   else console.log('No errors.');
        // }
      );

      console.log('Responses added.');
      res.status(200).send('OK');
    } catch (err) {
      res.status(500).send({ err });
    }
  }
});
