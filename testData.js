import { generateNumberForNewUser } from './helpers/utils';
import { getRandomString } from './helpers/utils';

export const URL_END_POINTS = {
    signEndPoint: '/sign',
    documentsEndPoint: '/documents',
    activateTrialEndPoint: '/activate-trial',
    settingsBillingPlanEndPoint: '/settings/billing/plan',
    signUpPersonalEndPoint: '/signup/personal',
    signUpBusinessEndPoint: '/signup/business',
    settingsBillingEndPoint: '/settings/billing',
    settingsCompanyEndPoint: '/settings/company',
    signUpTrialEndPoint: '/signup',
    confirmAccountEndPoint: '/confirm-account',
    signUpFree: '/signup/free',
    loginEndPoint: '/login',
};
export const ACTIVE_COLOR = 'rgb(0, 163, 250)';
export const FILL_FOLDER_NAME = 'Folder 1';

export const TOAST_MESSAGE = {
    planSuccessChange: 'Plan has been successfully changed.',
    planRenew: 'Plan has been renew',
    folderDeleted: 'Folder deleted successfully.',
    copyApiKey: 'API key successfully copied to clipboard',
    deleteApiKey: 'API key successfully deleted',
    folderRename: 'Folder successfully updated!',
    folderCreated: 'Folder created!',
    signatureCreated: 'Signature created successfully',
    success: 'Document successfully saved!',
    nonsuccess: 'Something went wrong',
    companyInformationSave: 'Company information successfully saved',
    fileMovedToFolder: 'Files successfully moved!',
    profileUpdated: 'Profile information updated.',
    deleteAccount: 'Account Deleted.',
    checkYourEmail: 'Check your new email to confirm it',
    emailConfirmed: 'Email confirmed',
    sendReminder: 'Reminder(s) has been sent',
    documentSubmited: 'Document submitted.',
    duplicated: 'Form successfully duplicated!',
    folderMovedToFolder: 'Files successfully moved!',
    apiPlanUpgraded: 'Api plan have been upgraded',
    templateSaved: 'Template saved',
    invitesSent: 'Invites sent successfully',
    inviteAccepted: 'Invite accepted.',
    upgradedToAdmin: 'Team member successfully upgraded to admin.',
    downgradeToUser: 'Team member successfully downgraded to user.',
    templateDuplicate: 'Template successfully duplicated!',
    formDisabled: 'Form successfully disabled!',
    formEnabled: 'Form successfully enabled!',
    formDeleted: 'Form deleted successfully.',
    documentSent: 'Document successfully sended to specified email(s).',
    templateDelete: 'Template deleted successfully.',
    editedFormSaved: 'Form saved',
    teamMemberDeleted: 'Team member deleted successfully',
    documentsSuccess: 'Documents successfully created',
    signatureDeleted: 'Signature deleted successfully',
    updateSignature: 'Signature updated successfully',
    declineDocument: 'Signature request was declined.',
    pictureUploaded: 'New picture has been uploaded',
    permissionsChanged: 'Permissions successfully changed!',
    templateNoSigner: 'Document must have at least one signer',
    incorrectEmailOrPassword: 'Email or password incorrect. Please try again.',
    invalidConfirmCode: 'Confirm code is not valid.',
    upgradeYourPlan: 'Upgrade to Personal plan',
};

export const API_KEY_NAME = 'Test Api Key';
export const NO_API_KEY_MESSAGE = "You don't have any API keys yet.";
export const DATA_SIGNER = {
    fullName: 'May Li',
    initials: 'ML',
};
export const FILL_RENAME_FOLDER_NAME = 'FielderTest';
export const EMPTY_DOCUMENTS_HEADER = "You don't have any documents yet.";
export const EMPTY_TRASH_HEADER = "You don't have any deleted documents yet.";
export const FULL_NAME_INITIALS_FIELDS = {
    fullName: 'John Smith',
    initials: 'JS',
};

export const CREATE_TEMPLATE = {
    nameField: 'Rental contract',
    optionalMessage: 'USA',
    nameRole: 'Boss',
};
export const PLANS = ['Personal', 'Business'];
export const RANDOM_ANNUALLY_PLAN = (randomPlan) => `${randomPlan} Annually Plan`;

export const DOCUMENT_TITLE = 'Document';
export const DOCUMENT_STATUS = {
    awaiting: 'awaiting',
    draft: 'draft',
    completed: 'completed',
    live: 'live',
    processing: 'processing',
    expired: 'expired',
    deleted: 'DELETED',
    declined: 'declined',
};
export const CI_USER_NAME = 'CI_user';
export const BUSINESS_MONTHLY_PLAN = 'Your plan (Billed Monthly)Business';
export const BUSINESS_ANNUALLY_PLAN = 'Your plan (Billed Annually)Business';
export const FREE_PLAN_DESCRIPTION = 'Your plan (Billed Monthly)Free';

export const CARD_DETAILS = {
    VISA: {
        fullNameOnCard: `TestUser`,
        cardNumber: '4242424242424242',
        expirationDate: '12 / 27',
        cvc: '111',
        countryOrRegion: 'US',
        zip: '20500',
        displayingOnTheBillingPage: 'Current Card:**** **** **** 424212/27',
        displayingOnTheBillingPortalPage: 'Visa •••• 4242DefaultExpires 12/2027Delete',
    },
    MASTERCARD: {
        fullNameOnCard: 'Tes Tester',
        cardNumber: '5555555555554444',
        expirationDate: '10 / 29',
        cvc: '321',
        countryOrRegion: 'US',
        zip: '20500',
        displayingOnTheBillingPage: 'Current Card:**** **** **** 444410/29',
        displayingOnTheBillingPortalPage: 'Mastercard •••• 4444DefaultExpires 10/2029Delete',
    },
    VISA_DEBIT: {
        fullNameOnCard: 'Tes Tester',
        cardNumber: '4000056655665556',
        expirationDate: '12 / 27',
        cvc: '123',
        countryOrRegion: 'US',
        zip: '20500',
        displayingOnTheBillingPage: 'Current Card:**** **** **** 555612/27',
        displayingOnTheBillingPortalPage: 'Visa •••• 5556DefaultExpires 12/2027Delete',
    },
    INVALID: {
        fullNameOnCard: `Test`,
        emptyField: '',
        cardNumber: '1234567890123456',
        incompleteCardNumber: '424242424242',
        invalidCardNumber: '1234567890123456',
        expirationDate: '12',
        pastExpirationDate: '12/22',
        emptyCVV: '',
        cvc: '1',
        zip: '0',
    },
};
export const END_PLAN = 'Your plan will end on';
export const MESSAGE = 'Project 1';
export const TEMPLATES_STATUS = {
    live: 'Live',
    api: 'api',
    draft: 'draft',
};

export const SUBSCRIPTIONS = ['Monthly', 'Annually'];
export const SUBSCRIBE_TO_PERSONAL_PLAN = 'Subscribe to personal Plan';
export const SUBSCRIBE_TO_BUSINESS_PLAN = 'Subscribe to business Plan';
export const PLEASE_ENTER_CONFIRMATION_CODE = 'Please enter confirmation code';
export const PERSONAL_PLAN_DESCRIPTION = (billingPeriod) => `Your plan (Billed ${billingPeriod})Personal`;
export const BUSINESS_PLAN_DESCRIPTION = (billingPeriod) => `Your plan (Billed ${billingPeriod})Business`;
export const EMAIL_SUBJECTS = {
    reminderToSign: 'Reminder, Please sign',
    signatureRequest: 'requested your signature',
    emailConfirmation: 'Signaturely Email Confirmation',
    sentToView: 'Sent you a document to view',
    inviteToJoin: ' invited you to join Signaturely',
    sharedDocument: 'shared a document with you',
};
export const SELECTORS = {
    link: 'span',
    message: 'td p:has(a)',
};

export const COMPANY_INFO = {
    companyName: 'companyName',
    emailFrom: `${process.env.EMAIL_PREFIX}${'001'}`,
    emailTo: `${process.env.EMAIL_PREFIX}${'002'}${process.env.EMAIL_DOMAIN}`,
    redirectionPage: 'https://yourcompany.com/',
};

export const SIGNER_ME = 'Me (Now)';

export const SIGNERS_DATA = {
    signerName1: `${process.env.EMAIL_PREFIX}${'001'}`,
    signerEmail1: `${process.env.EMAIL_PREFIX}${'001'}${process.env.EMAIL_DOMAIN}`,
    signerName2: `${process.env.EMAIL_PREFIX}${'002'}`,
    signerEmail2: `${process.env.EMAIL_PREFIX}${'002'}${process.env.EMAIL_DOMAIN}`,
    viewerEmail1: `${process.env.EMAIL_PREFIX}${'003'}${process.env.EMAIL_DOMAIN}`,
};

export const FOLDER_NAME = 'Folder for documents';
export const FORM_NAME = generateNumberForNewUser();
export const FORM_NAME_NEW = generateNumberForNewUser();
export const FORM_MESSAGE = 'Message for form';
export const UPLOAD_FILE_PATH = {
    jpgDocument: 'testDocuments/picture.jpg',
    jpegDocument: 'testDocuments/JPEGpicture.jpeg',
    xlsxDocument: 'testDocuments/todoList.xlsx',
    xlsDocument: 'testDocuments/Budget.xls',
    csvDocument: 'testDocuments/CSV.csv',
    pdfDocument: 'testDocuments/openHouse.pdf',
    txtDocument: 'testDocuments/text.txt',
    docDocument: 'testDocuments/Ecology.doc',
    docxDocument: 'testDocuments/environment.docx',
    pptxDocument: 'testDocuments/BasicPresentation.pptx',
    ppsxDocument: 'testDocuments/GalaxyPresentation.ppsx',
    pptDocument: 'testDocuments/MinimPresentation.ppt',
    pngDocument: 'testDocuments/imagePNG.png',
    htmlDocument: 'testDocuments/index1.html',
    gifDocument: 'testDocuments/like.gif',
};
export const UPLOAD_FILE_NAME = {
    jpgDocument: 'picture.jpg',
    csvDocument: 'CSV.csv',
};
export const NO_ATTACHED_CARD = 'Current Card:No attached card';
export const SUCCESS_TITLE = {
    send: 'Thanks for sending your document',
    submit: 'Thanks for Submitting your Document',
    declined: 'Document Declined',
};
export const SERVICE_NAME = 'Signaturely';
export const EMAIL_MESSAGE = ' sent you the following document to view';
export const FOLDER_NAME_SECOND = 'Second Folder';
export const API_PLANS = ['Gold', 'Platinum', 'Titanium'];
export const currentPlan = 'Current plan';
export const EDIT_TEMPLATE_DATA = {
    nameField: 'Rental agreement 2024',
    optionalMessage: 'For Internal Use Only',
    nameRole: 'Chief Financial Officer',
};

export const TEAM_MEMBER_ROLES = {
    user: 'User',
    admin: 'Admin',
};

export const QASE_LINK = 'https://app.qase.io/case';
export const GOOGLE_DOC_LINK =
    'https://docs.google.com/document/d/1Qce7tKWOwVYtPxgQv_8ae-HUkbAgeOFph0lB_eziY_k/edit#heading=h.';

export const FORM_STATUS = {
    live: 'live',
    disabled: 'disabled',
};

export const CHECK_BOXES_STATUS = {
    checked: 'uiCheckbox__inner uiCheckbox--checked',
    unChecked: 'uiCheckbox__inner uiCheckbox--unChecked',
};

export const EMPTY_TABLE_HEADER = {
    documents: "You don't have any documents yet.",
    trash: "You don't have any deleted documents yet.",
};

export const DELETED_DOCUMENTS_STATUS = ['DELETED', 'DELETED'];

export const FORMS = {
    formNameEdit: 'Edited Form Name',
    optionalMessageFormEdit: 'Form edited',
};

export const RANDOM_MONTHLY_PLAN = (randomPlan) => `${randomPlan} Monthly Plan`;

export const BULK_DOCUMENTS = {
    number: '20',
};

export const ENDPOINT_FOR_DECLINE = '&declineImmediately=true';

export const TITLE_OF_DOWNGRADE_API_PLAN_MODAL = API_PLANS.map((plan) => `Downgrade to ${plan} Plan`);
export const DATE_FORMAT = ['DD / MM / YYYY', 'MM / DD / YY', 'DD / MM / YY'];

export const NEGATIVE_EMAIL_DATA_SET = [
    ['without @', 'test.test.gmail', 'Invalid email address'],
    ['without domain', 'test@gmail', 'Invalid email address'],
    ['invalid domain', 'test@gmail.s', 'Invalid email address'],
    ['space before email', ' test@gmail.com', 'Invalid email address'],
    ['space after domain', 'test@gmail.com ', 'Invalid email address'],
    ['empty field', '', 'Required'],
];

export const NEGATIVE_PASSWORD_DATA_SET = [
    [
        'No lowercase letter in the password',
        'PASSWORD1!',
        'Password must have at least one uppercase and one lowercase letters',
    ],
    [
        'No uppercase letter in the password',
        'password1!',
        'Password must have at least one uppercase and one lowercase letters',
    ],
    ['Password less than 8 characters long', 'Passw!1', 'Minimum password length is 8 symbols'],
    ['No digits in the password', 'Password!', 'Password must have at least one digit'],
    ['Space in the password', ' Password1!', 'Only digits, characters and special symbols allowed'],
    ['No special symbols in the password', 'Password1', 'Password must have at least one special character'],
    ['Password contains ciryllic symbol', 'Pыssword1!', 'Only digits, characters and special symbols allowed'],
    ['Empty password field', '', 'Required'],
];

export const NEGATIVE_FIELD_DATA =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem';

export const ERROR_COLOR = 'rgb(255, 81, 81)';
export const PASSWORD_CONFIRMATION_ERROR_MESSAGE = 'Password and confirmation password do not match';
export const JIRA_LINK = 'https://signjstest.atlassian.net/browse/';
export const NEGATIVE_BUSINESS_USER_REGISTRATION = [
    {
        desc: 'Empty Full Name on Card field',
        field: 'cardholderNameField',
        value: CARD_DETAILS.INVALID.emptyField,
        expectedError: 'Required',
    },
    {
        desc: 'Empty Zip Code field',
        field: 'zipField',
        value: CARD_DETAILS.INVALID.emptyField,
        expectedError: 'Required',
    },
];

export const ERROR_WARNING_BACKGROUND_COLOR = 'rgb(255, 243, 243)';
export const TITLE_OF_PREPARE_FOR_SIGNATURE_MODAL = 'Prepare for Signing';
export const INCORRECT_USER_EMAIL = 'test@gmail.com';

export const INVALID_CARD_NUMBER = [
    {
        problem: 'empty card number',
        cardNumber: '',
        toastErrorMessage: 'Your card number is incomplete.',
    },
    {
        problem: 'incomplete card number',
        cardNumber: '424242424242',
        toastErrorMessage: 'Your card number is incomplete.',
    },
    {
        problem: 'invalid card number',
        cardNumber: '1234567890123456',
        toastErrorMessage: 'Your card number is invalid.',
    },
];
export const ERROR_CREDIT_CARD_COLOR = 'rgb(235, 28, 38)';

export const NEGATIVE_CONFIRM_CODE = [
    {
        desc: 'Empty Confirm Code field',
        value: '',
    },
    {
        desc: 'Invalid Confirm Code',
        value: 'cxP87lUSPX10',
    },
    {
        desc: 'leading space in Confirm Code',
        value: ' ',
    },
    {
        desc: 'trailing space in Confirm Code',
        value: ' ',
    },
];
export const INVALID_CARD_EXPIRATION_DATE = [
    {
        problem: 'empty expiration date',
        expirationDate: '',
        toastErrorMessage: "Your card's expiration date is incomplete.",
    },
    {
        problem: 'incomplete expiration date',
        expirationDate: '01',
        toastErrorMessage: "Your card's expiration date is incomplete.",
    },
    {
        problem: 'expired expiration date',
        expirationDate: '01/18',
        toastErrorMessage: "Your card's expiration year is in the past.",
    },
];
export const INVALID_CVV = [
    {
        problem: 'empty CVV field',
        cvv: '',
        toastErrorMessage: "Your card's security code is incomplete.",
    },
    {
        problem: 'CVV that contanes only 1 digit',
        cvv: '5',
        toastErrorMessage: "Your card's security code is incomplete.",
    },
    {
        problem: 'CVV that contanes only 2 digits',
        cvv: '52',
        toastErrorMessage: "Your card's security code is incomplete.",
    },
];

const randomString = getRandomString(10);

export const DATA_FOR_UPDATE_USER = [
    {
        desc: 'Update name',
        value: {
            name: 'Name_' + randomString,
        },
    },
    {
        desc: 'Update billing Details',
        value: {
            billingDetails: 'Bill_' + randomString,
        },
    },

    {
        desc: 'Update taxID',
        value: {
            taxId: 'Tax_' + randomString,
        },
    },
    {
        desc: 'Update Payment Survey Answer',
        value: {
            paymentSurveyAnswer: 'Payment_' + randomString,
        },
    },
];

export const AVATAR_FOR_UPDATE = {
    desc: 'Update avatar',
    value: {
        avatarUrl: getRandomString(10),
    },
};

export const DATA_FOR_UPDATE_COMPANY = [
    {
        desc: 'Update companyName',
        value: {
            companyName: 'Company_' + randomString,
        },
    },
    {
        desc: 'Update tagline',
        value: {
            tagline: 'Tagline_' + randomString,
        },
    },
    {
        desc: 'Update industry',
        value: {
            industry: 'Industry_' + randomString,
        },
    },
    {
        desc: 'Update companyEmail',
        value: {
            companyEmail: 'email_' + randomString + '@email.com',
        },
    },
    {
        desc: 'Update emailTemplate',
        value: {
            emailTemplate: 'Template_' + randomString,
        },
    },
    {
        desc: 'Update redirectionPage',
        value: {
            redirectionPage: 'Page_' + randomString,
        },
    },
];
