// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
//const fs = require('fs');
const  path=  require('path');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "easontest" is now active!');

    context.subscriptions.push(
        vscode.languages.registerDefinitionProvider(
            {
                language: 'javascript',
                scheme: 'file'
            },
            new PeekFileDefinitionProvider())
     );
}
exports.activate = activate;


class PeekFileDefinitionProvider extends vscode.DefinitionProvider {
    provideDefinition(document, position, token) {
        console.log('start in provideDefinition');
        console.log(arguments);
        return null;
    }
}



// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;