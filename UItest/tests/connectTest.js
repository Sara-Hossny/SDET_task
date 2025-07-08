const ContactPage = require('../page-objects/contactPage');
const contactData = require('../test-data/contactData.json'); 

describe('Contact Form Tests', function () {
  let page;

  beforeEach(async function (browser) {
    page = new ContactPage(browser);
    await page.navigate();
  });

  it('Valid Contact Form Submission', async function () {
    await page
      .submitForm(contactData.validSubmission)
      .verifySuccessMessage();
  });

  it('Missing Email - Should Show Error', async function () {
    await page
      .submitForm(contactData.missingEmail)
      .verifyErrorMessage('Invalid email address');
  });

  it('Missing Message - Should Show Error', async function () {
    await page
      .submitForm(contactData.missingMessage)
      .verifyErrorMessage('The message cannot be blank');
  });

  it('No Subject Selected - Should Show Error', async function () {
    await page
      .submitForm(contactData.missingSubject)
      .verifyErrorMessage('Please select a subject');
  });

  it('File name appears after upload', async function () {
    await page.uploadFileAndCheckName(contactData.validSubmission.fileName);
  });

  it('Submit empty form and check multiple error messages', async function () {
    await page
      .submitEmptyForm()
      .verifyMultipleErrorMessages([
        'Invalid email address',
        'The message cannot be blank',
        'Please select a subject',
      ]);
  });

  it('Missing Email + Subject', async function () {
    await page
      .submitForm(contactData.missingEmailAndSubject)
      .verifyMultipleErrorMessages([
        'Invalid email address',
        'Please select a subject',
      ]);
  });

  it('Missing Email + Message', async function () {
    await page
      .submitForm(contactData.missingEmailAndMessage)
      .verifyMultipleErrorMessages([
        'Invalid email address',
        'The message cannot be blank',
      ]);
  });

  it('Missing Subject + Message', async function () {
    await page
      .submitForm(contactData.missingSubjectAndMessage)
      .verifyMultipleErrorMessages([
        'Please select a subject',
        'The message cannot be blank',
      ]);
  });

 it('Invalid Email Addresses - Should Show Error', async function () {
  for (const submission of contactData.invalidEmailSubmissions) {
    await page
      .submitForm(submission)
      .verifyErrorMessage('Invalid email address');
  }
});

  after(function (browser) {
    browser.end();
  });
});
