export class AirlineImg {
  name: string;
  imgName: string;
  natHeight: number;
  natWidth: number;

  constructor(nm:string, img:string, height:number, width:number){
    this.name = nm;
    this.imgName = img;
    this.natHeight = height;
    this.natWidth = width;
  }
}
