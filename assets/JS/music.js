class Music {
    constructor(title, singer, img, file){
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;    
    }
    getName(){
        return this.title +" - "+ this.singer;
    }
}
const musicList = [
    new Music("Chain","Fleetwood","1.jpeg","1.mp3"),
    new Music("Dance Me To The End Of Love","Leonard Cohen","2.jpeg","2.mp3"),
    new Music("We Own It","Wiz Khalifa","3.jpeg","3.mp3")

];
