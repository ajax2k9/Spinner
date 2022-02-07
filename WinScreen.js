class WinScreen{
    constructor(_x,_y){
        this.content = createElement("content_box");
        this.content.addClass("content");

        this.box = createElement("results_box");
        this.box.parent(this.content);
        this.box.addClass("results");

        this.title = createP("Title");
        this.title.parent(this.box);
        
        this.score = createP("Score : ");
        this.score.parent(this.box);
        
        this.minScore = createP("Record : ");
        this.minScore.parent(this.box);

        this.button1 = createElement("OkButt");
        this.button1.parent(this.box);
        this.button1.html("<h2>OK</h2>");
        this.button1.mousePressed(()=>{
            this.content.hide();
        });

        this.button1.class("okbutt");

        this.content.hide();

    }

    Show(_score,_minScore,_newRecord){
        this.content.show();
        this.content.style("display","flex");

        if(_newRecord){
            this.title.html("New Record!");
        } else {
            this.title.html("You Win!");
        }    

        this.score.html("Score : "+_score+"");
        this.minScore.html("Record : "+_minScore+"");
    }
}