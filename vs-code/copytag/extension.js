
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        var selection = editor.selection;
        console.log(selection);
        var text = editor.document.getText(selection);
        
        vscode.window.showInformationMessage('Selected characters: ' + text.length);

    });
    context.subscriptions.push(disposable);

    let wordtest = vscode.commands.registerCommand('extension.wordtest', function () {        
        // vscode.window.showInformationMessage('Hello');
        var editor = vscode.window.activeTextEditor;
        let selection  = editor.selection;
       
        let activeLine = selection.active.line;
        let txtLine = editor.document.lineAt(activeLine);
        /* */
        let lastLine = editor.document.lineCount;
        console.log(editor.document);
        console.log(lastLine)
        /* */
        let insertPosition = new vscode.Position(activeLine + 1, 0);

        editor.insertSnippet(new vscode.SnippetString("\r\n"), insertPosition);
        editor.insertSnippet(new vscode.SnippetString(txtLine.text), insertPosition);
       
    });
    context.subscriptions.push(wordtest);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;