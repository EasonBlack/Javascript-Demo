let chai = require('chai'),
    path = require('path');

chai.should();

let appService = require(path.join(__dirname, 'app.service'));

describe('app service test', () => {

    let model;

    beforeEach(() => {
        model = new appService('Hello');
    });

    it('Is init successful', () => {
        model.title.should.equal('Hello');
    });


});
