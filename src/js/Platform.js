import * as ex from 'excalibur';

export class Platform extends ex.Actor{

    constructor(pos,width,height){
        super({
            pos: pos,
            width: width,
            height: height,
            collisionType: ex.CollisionType.Fixed,
            name:'platform',
        })
    }
}