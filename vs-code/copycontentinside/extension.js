
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
   

    let copycontent = vscode.commands.registerCommand('extension.copycontentinside', function () {        

        var editor = vscode.window.activeTextEditor;
        let selection  = editor.selection;
        let activeLine = selection.active.line;
        let endLine = editor.document.lineCount;

        let tag = 'content';
        let tagStartRegex = new RegExp("<\\s*("+ tag +")[\\s\\w]*>", "i");
        let tagEndRegex = new RegExp("<\\/\\s*("+ tag +")\\s*>", "i");

      
        let lines = [];
        let linesTxt = '';
        let beforeNum = 0;
        let cursor = activeLine
        while(cursor >= 0) {

            let _txtLine = editor.document.lineAt(cursor);
            let _startMa = tagStartRegex.exec(_txtLine.text);
            let _endMa = tagEndRegex.exec(_txtLine.text);

            if(_startMa) break;

            lines.push(_txtLine.text);
            cursor--;
        }
        
        linesTxt=  lines.reverse().join("\r\n");
        let insertPosition = new vscode.Position(endLine + 1, 0);

        editor.insertSnippet(new vscode.SnippetString("\r\n"), insertPosition);
        editor.insertSnippet(new vscode.SnippetString(linesTxt), insertPosition);
       
    });
    context.subscriptions.push(copycontent);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;