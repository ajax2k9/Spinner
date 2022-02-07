class WinScreen{
    constructor(_x,_y){
        this.content = createElement("content_box");
        this.content.addClass("content");

        this.box = createElement("results_box");
        this.box.parent(this.content);
        this.box.addClass("results");

        this.box.html("<h1> You win! </h1>");
        //this.label.parent(this.box);
        this.content.hide();
    }
}