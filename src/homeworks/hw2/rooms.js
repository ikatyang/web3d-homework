import Door from './Door';
import Wall from './Wall';

const roomHeight = 100;
const doorHeight = 60;
const balconyHeight = 30;

const balconyDepth = 60;

const doorWidthLarge = 40;
const doorWidthSmall = 30;

const bedRoomWest = {
  width: 120,
  depth: 144,
  door: new Door(doorWidthLarge, doorHeight, 'right', -1),
};

const balconyWest = {
  width: 66,
  depth: balconyDepth,
  door: new Door(doorWidthSmall, doorHeight, 'left', 1),
};

const drawingRoom = {
  width: 120,
  depth: bedRoomWest.depth,
  door: new Door(doorWidthLarge, doorHeight, 'right', -1),
};

const kitchen = {
  width: 84,
  depth: 108,
};

const diningRoom = {
  width: (bedRoomWest.width + drawingRoom.width) - (balconyWest.width + kitchen.width),
  depth: kitchen.depth,
};

const balconyNorthWest = {
  width: kitchen.width + diningRoom.width,
  depth: balconyDepth,
  door: new Door(doorWidthSmall, doorHeight, 'right', -1),
};

const shaft = {
  width: 120,
  depth: 60,
};

const toiletSouthEast = {
  width: 84,
  depth: shaft.depth,
  door: new Door(doorWidthSmall, doorHeight, 'left', 1),
};

const toiletSouth = {
  width: 60,
  depth: bedRoomWest.depth - shaft.depth,
  door: new Door(doorWidthSmall, doorHeight, 'right', -1),
};

const bedRoomEast = {
  width: (shaft.width + toiletSouthEast.width) - toiletSouth.width,
  depth: 130,
  door: new Door(doorWidthLarge, doorHeight, 'left', 1),
};

const aisle = {
  width: toiletSouth.width,
  depth: bedRoomEast.depth - toiletSouth.depth,
};

const bedRoomNorth = {
  width: 120,
  depth: (balconyNorthWest.depth + diningRoom.depth) - aisle.depth,
  door: new Door(doorWidthLarge, doorHeight, 'left', 1),
};

const balconyEast = {
  width: (toiletSouth.width + bedRoomEast.width) - bedRoomNorth.width,
  depth: balconyDepth,
  door: new Door(doorWidthSmall, doorHeight, 'left', 1),
};

const balconyNorthEast = {
  width: bedRoomNorth.width,
  depth: balconyDepth,
  door: new Door(doorWidthSmall, doorHeight, 'right', -1),
};

export default {
  bedRoomWest: {
    height: roomHeight,
    size: [bedRoomWest.width, bedRoomWest.depth],
    nextTo: [null, null],
    walls: [
      [new Wall(balconyWest.width, roomHeight, 'north', THREE.DoubleSide, balconyWest.door, balconyWest.door.width / 2, false), balconyWest.width / 2],
      [new Wall(bedRoomWest.width - balconyWest.width, roomHeight, 'north', THREE.FrontSide), (bedRoomWest.width - balconyWest.width) / -2],
      [new Wall(bedRoomWest.depth, roomHeight, 'west', THREE.DoubleSide), bedRoomWest.depth / 2],
      [new Wall(bedRoomWest.width, roomHeight, 'south', THREE.DoubleSide), bedRoomWest.width / 2],
      [new Wall(bedRoomWest.depth, roomHeight, 'east', THREE.FrontSide, bedRoomWest.door, bedRoomWest.door.width / 2, true), bedRoomWest.depth / 2],
    ],
  },
  balconyWest: {
    height: balconyHeight,
    size: [balconyWest.width, balconyWest.depth],
    nextTo: [null, 'bedRoomWest'],
    walls: [
      [new Wall(balconyWest.width, balconyHeight, 'north', THREE.DoubleSide), balconyWest.width / 2],
      [new Wall(balconyWest.depth, balconyHeight, 'west', THREE.DoubleSide), balconyWest.depth / 2],
      [new Wall(balconyWest.width, 0, 'south', THREE.FrontSide, balconyWest.door, balconyWest.door.width / -2, true), -balconyWest.width / 2],
    ],
  },
  drawingRoom: {
    height: roomHeight,
    size: [drawingRoom.width, drawingRoom.depth],
    nextTo: ['bedRoomWest', null],
    walls: [
      [new Wall(drawingRoom.depth, roomHeight, 'west', THREE.FrontSide, bedRoomWest.door, bedRoomWest.door.width / -2, false), drawingRoom.depth / 2],
      [new Wall(drawingRoom.width, roomHeight, 'south', THREE.DoubleSide, drawingRoom.door, drawingRoom.door.width / 2, true), drawingRoom.width / 2],
      [new Wall(drawingRoom.depth, roomHeight, 'east', THREE.FrontSide), drawingRoom.depth / 2],
    ],
  },
  kitchen: {
    height: roomHeight,
    size: [kitchen.width, kitchen.depth],
    nextTo: ['balconyWest', 'drawingRoom'],
    walls: [
      [new Wall(kitchen.width, roomHeight, 'north', THREE.DoubleSide), kitchen.width / 2],
      [new Wall(kitchen.depth, roomHeight, 'west', THREE.DoubleSide), kitchen.depth / 2],
      [new Wall(bedRoomWest.width - balconyWest.width, roomHeight, 'south', THREE.FrontSide), (bedRoomWest.width - balconyWest.width) / -2],
    ],
  },
  balconyNorthWest: {
    height: balconyHeight,
    size: [balconyNorthWest.width, balconyNorthWest.depth],
    nextTo: ['balconyWest', 'kitchen'],
    walls: [
      [new Wall(balconyNorthWest.width, balconyHeight, 'north', THREE.DoubleSide), balconyNorthWest.width / 2],
      [new Wall(balconyNorthWest.depth, balconyHeight, 'west', THREE.DoubleSide), balconyNorthWest.depth / 2],
      [new Wall(balconyNorthWest.width, 0, 'south', THREE.FrontSide, balconyNorthWest.door, balconyNorthWest.door.width / 2, true), balconyNorthWest.width / 2],
    ],
  },
  diningRoom: {
    height: roomHeight,
    size: [diningRoom.width, diningRoom.depth],
    nextTo: ['kitchen', 'drawingRoom'],
    walls: [
      [new Wall(diningRoom.width, roomHeight, 'north', THREE.DoubleSide, balconyNorthWest.door, balconyNorthWest.door.width / -2, false), diningRoom.width / 2],
      [new Wall(diningRoom.depth - aisle.depth, roomHeight, 'east', THREE.FrontSide), (diningRoom.depth - aisle.depth) / 2],
    ],
  },
  shaft: {
    height: roomHeight,
    size: [shaft.width, shaft.depth],
    nextTo: ['drawingRoom', null],
    walls: [
      [new Wall(shaft.width, roomHeight, 'north', THREE.FrontSide), shaft.width / 2],
      [new Wall(shaft.depth, roomHeight, 'west', THREE.FrontSide), shaft.depth / 2],
      [new Wall(shaft.width, roomHeight, 'south', THREE.DoubleSide), shaft.width / 2],
      [new Wall(shaft.depth, roomHeight, 'east', THREE.FrontSide), shaft.depth / 2],
    ],
  },
  toiletSouthEast: {
    height: roomHeight,
    size: [toiletSouthEast.width, toiletSouthEast.depth],
    nextTo: ['shaft', null],
    walls: [
      [new Wall(toiletSouthEast.width, roomHeight, 'north', THREE.FrontSide, toiletSouthEast.door, toiletSouthEast.door.width / -2, true), toiletSouthEast.width / 2],
      [new Wall(toiletSouthEast.depth, roomHeight, 'west', THREE.FrontSide), toiletSouthEast.depth / 2],
      [new Wall(toiletSouthEast.width, roomHeight, 'south', THREE.DoubleSide), toiletSouthEast.width / 2],
      [new Wall(toiletSouthEast.depth, roomHeight, 'east', THREE.DoubleSide), toiletSouthEast.depth / 2],
    ],
  },
  toiletSouth: {
    height: roomHeight,
    size: [toiletSouth.width, toiletSouth.depth],
    nextTo: ['drawingRoom', 'shaft'],
    walls: [
      [new Wall(toiletSouth.width, roomHeight, 'north', THREE.DoubleSide, toiletSouth.door, toiletSouth.door.width / 2, true), toiletSouth.width / 2],
      [new Wall(toiletSouth.depth, roomHeight, 'west', THREE.FrontSide), toiletSouth.depth / 2],
      [new Wall(toiletSouth.width, roomHeight, 'south', THREE.FrontSide), toiletSouth.width / 2],
      [new Wall(toiletSouth.depth, roomHeight, 'east', THREE.FrontSide), toiletSouth.depth / 2],
    ],
  },
  bedRoomEast: {
    height: roomHeight,
    size: [bedRoomEast.width, bedRoomEast.depth],
    nextTo: ['toiletSouth', 'shaft'],
    walls: [
      [new Wall(bedRoomEast.width - balconyEast.width, roomHeight, 'north', THREE.FrontSide), (bedRoomEast.width - balconyEast.width) / 2],
      [new Wall(balconyEast.width, roomHeight, 'north', THREE.DoubleSide, balconyEast.door, balconyEast.door.width / 2, false), balconyEast.width / -2],
      [new Wall(aisle.depth, roomHeight, 'west', THREE.DoubleSide, bedRoomEast.door, bedRoomEast.door.width / -2, true), aisle.depth / -2],
      [new Wall(bedRoomEast.depth - aisle.depth, roomHeight, 'west', THREE.FrontSide), (bedRoomEast.depth - aisle.depth) / 2],
      [new Wall(bedRoomEast.width, roomHeight, 'south', THREE.FrontSide, toiletSouthEast.door, toiletSouthEast.door.width / 2, false), bedRoomEast.width / 2],
      [new Wall(bedRoomEast.depth, roomHeight, 'east', THREE.DoubleSide), bedRoomEast.depth / 2],
    ],
  },
  aisle: {
    height: roomHeight,
    size: [aisle.width, aisle.depth],
    nextTo: ['drawingRoom', 'toiletSouth'],
    walls: [
      [new Wall(aisle.width, roomHeight, 'north', THREE.FrontSide, bedRoomNorth.door, bedRoomNorth.door.width / 2, false), aisle.width / 2],
    ],
  },
  bedRoomNorth: {
    height: roomHeight,
    size: [bedRoomNorth.width, bedRoomNorth.depth],
    nextTo: ['drawingRoom', 'bedRoomEast'],
    walls: [
      [new Wall(bedRoomNorth.width, roomHeight, 'north', THREE.DoubleSide, balconyNorthEast.door, balconyNorthEast.door.width / -2, false), bedRoomNorth.width / 2],
      [new Wall(balconyNorthWest.depth, roomHeight, 'west', THREE.DoubleSide), balconyNorthWest.depth / -2],
      [new Wall(bedRoomNorth.depth - balconyNorthWest.depth, roomHeight, 'west', THREE.FrontSide), (bedRoomNorth.depth - balconyNorthWest.depth) / 2],
      [new Wall(bedRoomNorth.width, roomHeight, 'south', THREE.FrontSide, bedRoomNorth.door, bedRoomNorth.door.width / -2, true), bedRoomNorth.width / 2],
      [new Wall(bedRoomNorth.depth, roomHeight, 'east', THREE.DoubleSide), bedRoomNorth.depth / 2],
    ],
  },
  balconyEast: {
    height: balconyHeight,
    size: [balconyEast.width, balconyEast.depth],
    nextTo: ['bedRoomNorth', 'bedRoomEast'],
    walls: [
      [new Wall(balconyEast.width, balconyHeight, 'north', THREE.DoubleSide), balconyEast.width / 2],
      [new Wall(balconyEast.depth, balconyHeight, 'east', THREE.DoubleSide), balconyEast.depth / 2],
      [new Wall(balconyEast.width, 0, 'south', THREE.FrontSide, balconyEast.door, balconyEast.door.width / -2, true), balconyEast.width / 2],
    ],
  },
  balconyNorthEast: {
    height: balconyHeight,
    size: [balconyNorthEast.width, balconyNorthEast.depth],
    nextTo: ['drawingRoom', 'bedRoomNorth'],
    walls: [
      [new Wall(balconyNorthEast.width, balconyHeight, 'north', THREE.DoubleSide), balconyNorthEast.width / 2],
      [new Wall(balconyNorthEast.depth, balconyHeight, 'west', THREE.DoubleSide), balconyNorthEast.depth / 2],
      [new Wall(balconyNorthEast.width, 0, 'south', THREE.FrontSide, balconyNorthEast.door, balconyNorthEast.door.width / 2, true), balconyNorthEast.width / 2],
      [new Wall(balconyNorthEast.depth, balconyHeight, 'east', THREE.DoubleSide), balconyNorthEast.depth / 2],
    ],
  },
};
