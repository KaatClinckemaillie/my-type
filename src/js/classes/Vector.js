class Vector {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  add(otherVector) {
    this.x += otherVector.x;
    this.y += otherVector.y;
  }

  substract(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
  }

  multiply(n) {
    this.x *= n;
    this.y *= n;
  }

  divide(n) {
    this.x /= n;
    this.y /= n;
  }

  length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }
  normalize() {
    const l = this.length();
    if (l !== 0) {
      this.divide(l);
    }
  }

  limit(max) {
    if (this.length() > max) {
      this.normalize();
      this.multiply(max);
    }
  }
}

export default Vector;
