
// const authenticatorCode = '954698'; // authenticator code

// module.exports = (on, config) => {
//   on('before:browser:launch', (browser = {}, launchOptions) => {
//     if (browser.family === 'chromium') {
//       launchOptions.args.push('--disable-features=ViewAuthenticator');
//     }

//     launchOptions.args.push('--disable-features=IdentityAutofillForms');
//     launchOptions.args.push('--disable-features=IdentityAutofillFormSubmission');

//     return launchOptions;
//   });

//   on('task', {
//     authenticateWithCode({ page }) {
//       return new Promise((resolve) => {
//         page.once('viewautomated', async () => {
//           await page.evaluate(async (authenticatorCode) => {
//             const inputField = document.querySelector('input[type="text"]');
//             if (inputField) {
//               inputField.value = authenticatorCode;
//               inputField.dispatchEvent(new Event('input', { bubbles: true }));
//               const submitButton = document.querySelector('button[type="submit"]');
//               if (submitButton) {
//                 submitButton.click();
//               }
//             }
//           }, authenticatorCode);

//           resolve(null);
//         });
//       });
//     },
//   });
// };