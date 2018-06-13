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

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        console.log('start!');
        var editor = vscode.window.activeTextEditor;
        console.log(editor);
        console.log(vscode.TextDocument);
        // let doc = vscode.TextDocument;
        //let working_dir = path.dirname(doc.fileName);
        // console.log(working_dir);
        //return new vscode.Location(vscode.Uri.file(found_fname), new vscode.Position(0, 1));
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;