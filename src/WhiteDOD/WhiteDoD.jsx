export default class WhiteDoD {
  constructor(args) {
    this.doc = args;
    this.mark = this.doc.getContext("2d");
    this.DoDs = [];
    this.DoDs.push(new DoD([2, 2], [0, 0], [0, 0], 1000));
    this.doc.addEventListener("mousemove", (value) => {
      console.log(value.x);
      this.DoDs[0].margin[0] = value.x;
      this.DoDs[0].margin[1] = value.y;
    });
    this.stp = null;
    for (let b = 0; b < 100; b += 1) {
      this.DoDs.push(new DoD([args.width, args.height], [1, 1], [1, 1], 1000));
    }
    /*
    setInterval(() => {
      //this.mark.beginPath();
      this.mark.clearRect(0, 0, this.doc.width, this.doc.height);
      this.lines();
      //this.mark.stroke();
    }, 50);
    */
    //this.start();
  }

  start() {
    if (!this.stp) {
      clearInterval(this.stp);
    }
    this.stp = setInterval(() => {
      this.frame();
      //requestAnimationFrame(this.frame);
    }, 25);
  }

  stop() {
    if (this.stp) {
      clearInterval(this.stp);
    }
  }

  frame() {
    this.mark.beginPath();
    this.mark.clearRect(0, 0, this.doc.width, this.doc.height);
    this.mark.stroke();
    this.lines();
    //requestAnimationFrame(this.frame);
  }

  lines() {
    this.DoDs.map((value, key) => {
      if (value.turn == false) {
        this.DoDs[key] = new DoD(
          [this.doc.width, this.doc.height],
          [1, 1],
          [1, 1],
          1000
        );
      }

      this.mark.beginPath();
      this.mark.strokeStyle = "rgb(111, 111, 2)";
      this.mark.arc(
        this.DoDs[key].margin[0],
        this.DoDs[key].margin[1],
        this.DoDs[key].size,
        0,
        2 * Math.PI
      );
      this.mark.fill();
      this.mark.stroke();
      this.DoDs.map((val, k) => {
        if (key < k) {
          this.compare(this.DoDs[key], val);
        }
      });
      //this.mark.stroke();
    });
  }

  compare(data1, data2) {
    let cors = data2.margin[0] - data1.margin[0];
    let cors1 = data2.margin[1] - data1.margin[1];
    cors = Math.sqrt(Math.pow(cors, 2) + Math.pow(cors1, 2));

    if (cors < 100) {
      this.mark.beginPath();
      this.mark.strokeStyle = `rgba(111, 111, 2, ${1.0 - cors / 100.0})`;
      this.mark.moveTo(data2.margin[0], data2.margin[1]);
      this.mark.lineTo(data1.margin[0], data1.margin[1]);
      this.mark.stroke();
    }
  }
}

class DoD {
  constructor(location, sizes, speeds, dens) {
    this.turn = true;
    this.den = dens;
    this.dens = Math.floor(Math.random() * dens);
    this.location = location;
    this.margin = [];
    this.margin[0] = Math.floor(location[0] * Math.random());
    this.margin[1] = Math.floor(location[1] * Math.random());
    this.size = Math.floor(sizes[0] + (sizes[1] - sizes[0]) * Math.random());
    this.speed = Math.floor(
      speeds[0] + (speeds[1] - speeds[0]) * Math.random()
    );
    this.direction = Math.floor(2.0 * Math.PI * Math.random());
    this.loop = setInterval(() => {
      this.move();
    }, 25);
  }

  move() {
    this.margin[0] = Math.floor(
      this.margin[0] + Math.cos(this.direction) * this.speed
    );
    this.margin[1] = Math.floor(
      this.margin[1] + Math.sin(this.direction) * this.speed
    );
    this.dens -= 10;
    if (
      this.margin[0] > this.location[0] ||
      this.margin[0] < 0 ||
      this.margin[1] > this.location[1] ||
      this.margin[1] < 0
    ) {
      this.turn = false;
      clearInterval(this.loop);
    }
  }
}
