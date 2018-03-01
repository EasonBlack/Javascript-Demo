
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

    let copytag = vscode.commands.registerCommand('extension.copytag', function () {        
        // vscode.window.showInformationMessage('Hello');
        var editor = vscode.window.activeTextEditor;
        let selection  = editor.selection;
       
        let activeLine = selection.active.line;
        let txtLine = editor.document.lineAt(activeLine);
        
        /* 
        let lastLine = editor.document.lineCount;
        console.log(editor.document);
        console.log(lastLine)
        */
        let tagRegex = /<\/\s*(\S*?)\s*>/i;
        let ma = tagRegex.exec(txtLine.text)
        let tag = ma ? ma[1] : 'notag';
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
            lines.push(_txtLine.text)
            
            if(tag == "notag") cursor = -1;
            if(_endMa && activeLine != cursor)  beforeNum++;  
            if(_startMa) beforeNum ? beforeNum--:cursor=-1;
            cursor--;
        
        }
        linesTxt=  lines.reverse().join("\r\n");
        let insertPosition = new vscode.Position(activeLine + 1, 0);

        editor.insertSnippet(new vscode.SnippetString("\r\n"), insertPosition);
        // editor.insertSnippet(new vscode.SnippetString(txtLine.text), insertPosition);
        editor.insertSnippet(new vscode.SnippetString(linesTxt), insertPosition);
       
    });
    context.subscriptions.push(copytag);
}
exports.activate = activate;

function deactivate() {
}
exports.deactivate = deactivate;