import { expect } from '@playwright/test';
import { test } from '../fixtures/base';

import {epic, step} from 'allure-js-commons'

test.describe('Negative Trial user regisctration', ()=> {
    test('SP11/SP1_N01 | Fill "Full Name on Card" input field only and click on Start button', async ({
        page,
        createFreeUserAndLogin,
        signUpTrialPage
        
    }) => {
        await epic('Negative registration');
        
        await step('Navigate to Trial user registration page', async () => {

        })

    })
})