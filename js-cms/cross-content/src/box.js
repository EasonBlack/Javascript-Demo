class Box {
    constructor(object) {
        this.box = {
            content : object.content,
            leadTo: object.leadTo,
            relateTo: object.relateTo
        }
    }

    getInfo() {
        return this.box;
    }

    getLeadToBoxed() {

    }

    getRelateToBoxed() {

    }
}
export default Box;