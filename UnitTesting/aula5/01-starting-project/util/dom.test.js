/*esse código serve para testar um Virtual DOM */
import { beforeEach, it, vi } from "vitest";
import fs from 'fs';
import path from 'path';
import {Window} from 'happy-dom';
import { showError } from "./dom";

/*isso serve para pegar o caminho e para fazer com que leia o DOM */
const htmlDocPath = path.join(process.cwd(),'index.html');
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString();
/*atalho que serve rapa rodar o arquivo doom para testes */
const window = new Window();
const document = window.document;
vi.stubGlobal('document',document);

beforeEach(()=>{
    document.body.innerHTML = '';
    document.write(htmlDocumentContent);
})

it('should add an error paragraph to the id="errors" element',() => {
    showError('Test');
    const errorsEl = document.getElementsById('errors');
    const errorParagraph = errorsEl.firstElementChild;
    expect(errorParagraph).not.toBeNull();
})

it('should not contain an error paragraph initially',()=>{
    const errorsEl = document.getElementsById('errors');
    const errorParagraph = errorsEl.firstElementChild;
    expect(errorParagraph).toBeNull();
})
it('should output the provided message in the error paragraph',()=>{
    const testErrorMessage = 'Test';
    
    showError(testErrorMessage);

    const errorsEl = document.getElementsById('errors');
    const errorParagraph = errorsEl.firstElementChild;
    
    expect(errorParagraph.textContent).toBe(testErrorMessage);
})