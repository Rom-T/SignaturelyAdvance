import ChooseTemplateComponent from '../../components/chooseTemplateComponent';
import FileUploaderComponent from '../../components/fileUploaderComponent';
import { step } from 'allure-js-commons';

export default class UploadFileOnSignPage {
    constructor(page) {
        this.page = page;

        this.fileUploader = new FileUploaderComponent(this.page);
        this.chooseTemplate = new ChooseTemplateComponent(this.page);

        this.prepareDocumentBtn = this.page.getByRole('button', { name: 'Prepare Document' });
    }

    async clickPrepareDocumentBtn() {
        await step('Click on "Prepare Document" button.', async () => {
            await this.prepareDocumentBtn.waitFor();
            await this.prepareDocumentBtn.click();
        });
    }
}
