/* import Vector from './Vector';
import {random, cellAmountLetter} from '../functions/lib.js';

class Letter {
  constructor($canvas, letter, position) {
    this.$canvas = $canvas;
    this.ctx = this.$canvas.getContext('2d');
    this.letter = letter;
    this.position = position;
    this.locationX = this.position.x * ($canvas.width / cellAmountLetter);
    this.locationY = this.position.y * ($canvas.height / cellAmountLetter);
  }

  draw() {
    this.ctx.font = `${random(30, 60)}pt EB Garamond`;
    this.ctx.fillText(this.letter, this.locationX, this.locationY);
  }
}

export default Letter; */
