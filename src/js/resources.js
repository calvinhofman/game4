import { ImageSource, Loader } from 'excalibur';
import spaceShip from '../images/fish.png';
import playeranimations from '../images/adventurerSheet.png';

const Resources = {
  player: new ImageSource(spaceShip),
  playerAnimationSheet: new ImageSource(playeranimations),
};

const ResourceLoader = new Loader([Resources.player, Resources.playerAnimationSheet]);

export { Resources, ResourceLoader };