import Vector from './Vector';
import {random} from '../functions/lib.js';

class Letter {
  constructor($canvas, letter) {
    this.$canvas = $canvas;
    this.ctx = this.$canvas.getContext('2d');
    this.letter = letter;
    this.x = random(1, this.$canvas.width);
    this.y = random(1, this.$canvas.height);
    this.location = new Vector(this.x, this.y);
  }

  draw() {
    this.ctx.fillText(this.letter, this.location.x, this.location.y);
  }
}

export default Letter;
