const { ipcRenderer } = require('electron');
const crypto = require('crypto');
const fs = require('fs');

let dropArea;
let hashcodeTextField, editableTextField;
let infoText;

// Initialize it when the DOM is fully loaded
window.onload = function() {
    dropArea = document.getElementById('drop-area');
    editableTextField = document.getElementById('editable-textfield');
    hashcodeTextField = document.getElementById('hashcode-textfield'); 
    infoText = document.getElementById('info-text');
    infoText.textContent = 'Drop a file here or click to select a file';

    dropArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropArea.classList.add('drag-over');
    });
    
    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('drag-over');
    });
    
    dropArea.addEventListener('drop', (event) => {
        event.preventDefault();
        dropArea.classList.remove('drag-over');
    
        const files = event.dataTransfer.files;
    
        if (files.length > 0) {
            const file = files[0];
            infoText.textContent = file.name;
            calculateHashcode(file.path);
        }
    });
};

function openFileSelector() {
    const fileSelector = document.createElement('input');
    fileSelector.type = 'file';
    fileSelector.addEventListener('change', (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            infoText.textContent = file.name;
            calculateHashcode(file.path);
        }
    });
    fileSelector.click();
}

function calculateHashcode(filePath) {
    const hash = crypto.createHash('sha256');
    const input = fs.createReadStream(filePath);

    input.on('data', (chunk) => {
        hash.update(chunk);
    });

    input.on('end', () => {
        const hashcode = hash.digest('hex');
        hashcodeTextField.value = hashcode;
    });
}

function compareTextFields() {
    const hashcodeValue = hashcodeTextField.value;
    const editableValue = editableTextField.value;

    if (hashcodeValue === editableValue) {
        alert('Text fields match!');
    } else {
        alert('Text fields do not match.');
    }
}

function copyToClipboard() {
    hashcodeTextField.select();
    document.execCommand('copy');
}

function clearTextField() {
    infoText.textContent = 'Drop a file here or click to select a file';
    hashcodeTextField.value = '';
    editableTextField.value = '';
}
