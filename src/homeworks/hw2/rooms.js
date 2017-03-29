const roomHeight = 100;
const doorHeight = 60;
const balconyHeight = 40;

export default {
  bedRoom1: {
    height: roomHeight,
    size: [120, 144],
    nextTo: [[], []],
    spaces: [
      ['east', [0, 47, doorHeight]],
      ['north', [0, 30, doorHeight]],
    ],
  },
  balcony1: {
    height: balconyHeight,
    size: [66, 60],
    nextTo: [[], ['bedRoom1']],
    spaces: [['south', [36, 30, doorHeight]]],
  },
  drawingRoom: {
    height: roomHeight,
    size: [120, 170],
    nextTo: [['bedRoom1'], []],
    spaces: [
      ['south', [0, 47, doorHeight]],
      ['west', [97, 47, doorHeight]],
      ['north', [0, 120, roomHeight]],
      ['east', [0, 26, roomHeight]],
    ],
  },
  kitchen: {
    height: roomHeight,
    size: [84, 108],
    nextTo: [['balcony1'], ['drawingRoom']],
    spaces: [
      ['south', [0, 30, roomHeight]],
      ['east', [0, 108, roomHeight]],
    ],
  },
  diningRoom: {
    height: roomHeight,
    size: [90, 108],
    nextTo: [['balcony1', 'kitchen'], ['drawingRoom']],
    spaces: [
      ['south', [0, 90, roomHeight]],
      ['west', [0, 108, roomHeight]],
      ['north', [60, 30, doorHeight]],
      ['east', [88, 20, roomHeight]],
    ],
  },
  balcony2: {
    height: balconyHeight,
    size: [174, 60],
    nextTo: [['balcony1'], ['drawingRoom', 'diningRoom']],
    spaces: [['south', [0, 30, doorHeight]]],
  },
  shaft1: {
    height: roomHeight,
    size: [120, 60],
    nextTo: [['bedRoom1', 'drawingRoom'], []],
  },
  toilet2: {
    height: roomHeight,
    size: [84, 60],
    nextTo: [['bedRoom1', 'drawingRoom', 'shaft1'], []],
    spaces: [['north', [54, 30, doorHeight]]],
  },
  toilet1: {
    height: roomHeight,
    size: [60, 84],
    nextTo: [['bedRoom1', 'drawingRoom'], ['shaft1']],
    spaces: [['north', [0, 30, doorHeight]]],
  },
  bedRoom3: {
    height: roomHeight,
    size: [144, 131],
    nextTo: [['bedRoom1', 'drawingRoom', 'toilet1'], ['shaft1']],
    spaces: [
      ['west', [84, 47, doorHeight]],
      ['south', [0, 30, doorHeight]],
      ['north', [60, 30, doorHeight]],
    ],
  },
  bedRoom2: {
    height: roomHeight,
    size: [120, 120],
    nextTo: [['bedRoom1', 'drawingRoom'], ['shaft1', 'bedRoom3']],
    spaces: [
      ['south', [73, 47, doorHeight]],
      ['north', [90, 30, doorHeight]],
    ],
  },
  balcony3: {
    height: balconyHeight,
    size: [120, 60],
    nextTo: [['bedRoom1', 'drawingRoom'], ['shaft1', 'bedRoom3', 'bedRoom2']],
    spaces: [['south', [0, 30, doorHeight]]],
  },
  balcony4: {
    height: balconyHeight,
    size: [84, 60],
    nextTo: [['bedRoom1', 'drawingRoom', 'bedRoom2'], ['shaft1', 'bedRoom3']],
    spaces: [['south', [54, 30, doorHeight]]],
  },
  shaft2: {
    height: roomHeight,
    size: [54, 26],
    nextTo: [['balcony1'], ['bedRoom1']],
    spaces: [],
  },
};
