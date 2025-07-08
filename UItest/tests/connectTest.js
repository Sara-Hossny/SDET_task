const ContactPage = require('../page-objects/contactPage');
const contactData = require('../test-data/contactData.json'); 

describe('Contact Form Tests', function () {
  let page;

  beforeEach(async function (browser) {
    page = new ContactPage(browser);
    await page.navigate();
  });

  it('Valid Contact Form Submission', async function (browser) {
    await page.submitForm(contactData.validSubmission);
    await browser.waitForElementVisible(page.elements.successAlert, 5000);
    await browser.verify.containsText(page.elements.successAlert, 'successfully sent');
  });

  it('Missing Email - Should Show Error', async function (browser) {
    await page.submitForm(contactData.missingEmail);
    await browser.waitForElementVisible(page.elements.errorAlert, 5000);
    await browser.verify.containsText(page.elements.errorAlert, 'Invalid email address');
  });

  it('Missing Message - Should Show Error', async function (browser) {
    await page.submitForm(contactData.missingMessage);
    await browser.waitForElementVisible(page.elements.errorAlert, 5000);
    await browser.verify.containsText(page.elements.errorAlert, 'The message cannot be blank');
  });

  it('No Subject Selected - Should Show Error', async function (browser) {
    await page.submitForm(contactData.missingSubject);
    await browser.waitForElementVisible(page.elements.errorAlert, 5000);
    await browser.verify.containsText(page.elements.errorAlert, 'Please select a subject');
  });

  it('File name appears after upload', async function (browser) {
    await page.uploadFileAndCheckName(contactData.validSubmission.fileName);
  });

  it('Submit empty form and check multiple error messages', async function (browser) {
    await page.submitEmptyForm();
    await browser.waitForElementVisible(page.elements.errorAlert, 2000);

    await browser.getText(page.elements.errorAlert, function (result) {
      const text = result.value;
      browser.verify.ok(text.includes('Invalid email address'));
      browser.verify.ok(text.includes('The message cannot be blank'));
      browser.verify.ok(text.includes('Please select a subject'));
    });
  });

  it('Missing Email + Subject', async function (browser) {
    await page.submitForm(contactData.missingEmailAndSubject);
    await browser.waitForElementVisible(page.elements.errorAlert, 2000);
    await browser.getText(page.elements.errorAlert, function (result) {
      browser.verify.ok(result.value.includes('Invalid email address'));
      browser.verify.ok(result.value.includes('Please select a subject'));
    });
  });

  it('Missing Email + Message', async function (browser) {
    await page.submitForm(contactData.missingEmailAndMessage);
    await browser.waitForElementVisible(page.elements.errorAlert, 2000);
    await browser.getText(page.elements.errorAlert, function (result) {
      browser.verify.ok(result.value.includes('Invalid email address'));
      browser.verify.ok(result.value.includes('The message cannot be blank'));
    });
  });

  it('Missing Subject + Message', async function (browser) {
    await page.submitForm(contactData.missingSubjectAndMessage);
    await browser.waitForElementVisible(page.elements.errorAlert, 2000);
    await browser.getText(page.elements.errorAlert, function (result) {
      browser.verify.ok(result.value.includes('Please select a subject'));
      browser.verify.ok(result.value.includes('The message cannot be blank'));
    });
  });

  it('Invalid Email Addresses - Should Show Error', async function (browser) {
    for (const email of contactData.invalidEmails) {
      await page.submitForm({
        ...contactData.validSubmission,
        email,
        message: 'Testing invalid email'
      });

      await browser.waitForElementVisible(page.elements.errorAlert, 2000);
      await browser.verify.containsText(page.elements.errorAlert, 'Invalid email address');
    }
  });

  after(function (browser) {
    browser.end();
  });
});
