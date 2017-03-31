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
      [new Wall(balconyWest.width, roomHeight, 'north', { all: 'fb', right: 'r' }, 0, 2, -1, balconyWest.door, balconyWest.door.width / 2, false), balconyWest.width / 2],
      [new Wall(bedRoomWest.width - balconyWest.width, roomHeight, 'north', 'fb', 0, 1, -3), (bedRoomWest.width - balconyWest.width) / -2],
      [new Wall(bedRoomWest.depth, roomHeight, 'west', 'fb', 0, 2, -1), bedRoomWest.depth / 2],
      [new Wall(bedRoomWest.width, roomHeight, 'south', 'fb', 0, 2, -1), bedRoomWest.width / 2],
      [new Wall(bedRoomWest.depth, roomHeight, 'east', { all: 'fb', right: 'r' }, 0, 1, -3, bedRoomWest.door, bedRoomWest.door.width / 2, true), bedRoomWest.depth / 2],
    ],
  },
  balconyWest: {
    height: balconyHeight,
    size: [balconyWest.width, balconyWest.depth],
    nextTo: [null, 'bedRoomWest'],
    walls: [
      [new Wall(balconyWest.width, balconyHeight, 'north', 'fb', 0, 2, -1), balconyWest.width / 2],
      [new Wall(balconyWest.depth, balconyHeight, 'west', 'fb', 0, 2, -1), balconyWest.depth / 2],
      [new Wall(balconyWest.width, 0, 'south', 'fb', 0, 1, -1, balconyWest.door, balconyWest.door.width / -2, true), -balconyWest.width / 2],
    ],
  },
  drawingRoom: {
    height: roomHeight,
    size: [drawingRoom.width, drawingRoom.depth],
    nextTo: ['bedRoomWest', null],
    walls: [
      [new Wall(drawingRoom.depth, roomHeight, 'west', { all: 'fb', left: 'l' }, 0, 1, 1, bedRoomWest.door, bedRoomWest.door.width / -2, false), drawingRoom.depth / 2],
      [new Wall(drawingRoom.width, roomHeight, 'south', { all: 'fb', left: 'l', right: 'r' }, 0, 2, -1, drawingRoom.door, drawingRoom.door.width / 2, true), drawingRoom.width / 2],
      [new Wall(drawingRoom.depth, roomHeight, 'east', 'fb', 0, 1, 1), drawingRoom.depth / 2],
    ],
  },
  kitchen: {
    height: roomHeight,
    size: [kitchen.width, kitchen.depth],
    nextTo: ['balconyWest', 'drawingRoom'],
    walls: [
      [new Wall(kitchen.width, roomHeight, 'north', 'fb', 0, 2, -1), kitchen.width / 2],
      [new Wall(kitchen.depth, roomHeight, 'west', 'fb', 0, 2, -1), kitchen.depth / 2],
      [new Wall(bedRoomWest.width - balconyWest.width, roomHeight, 'south', 'fb', 0, 1, 1), (bedRoomWest.width - balconyWest.width) / -2],
    ],
  },
  balconyNorthWest: {
    height: balconyHeight,
    size: [balconyNorthWest.width, balconyNorthWest.depth],
    nextTo: ['balconyWest', 'kitchen'],
    walls: [
      [new Wall(balconyNorthWest.width, balconyHeight, 'north', 'fb', 0, 2, -1), balconyNorthWest.width / 2],
      [new Wall(balconyNorthWest.depth, balconyHeight, 'west', 'fb', 0, 2, -1), balconyNorthWest.depth / 2],
      [new Wall(balconyNorthWest.width, 0, 'south', 'fb', 0, 1, -1, balconyNorthWest.door, balconyNorthWest.door.width / 2, true), balconyNorthWest.width / 2],
    ],
  },
  diningRoom: {
    height: roomHeight,
    size: [diningRoom.width, diningRoom.depth],
    nextTo: ['kitchen', 'drawingRoom'],
    walls: [
      [new Wall(diningRoom.width, roomHeight, 'north', { all: 'fb', left: 'l', right: 'r' }, 0, 2, -1, balconyNorthWest.door, balconyNorthWest.door.width / -2, false), diningRoom.width / 2],
      [new Wall(diningRoom.depth - aisle.depth, roomHeight, 'east', 'fb', 0, 1, 1), (diningRoom.depth - aisle.depth) / 2],
    ],
  },
  shaft: {
    height: roomHeight,
    size: [shaft.width, shaft.depth],
    nextTo: ['drawingRoom', null],
    walls: [
      [new Wall(shaft.width, roomHeight, 'north', 'fb', 0, 1, -1), shaft.width / 2],
      [new Wall(shaft.depth, roomHeight, 'west', 'fb', 0, 1, -3), shaft.depth / 2],
      [new Wall(shaft.width, roomHeight, 'south', 'fb', 0, 2, -1), shaft.width / 2],
      [new Wall(shaft.depth, roomHeight, 'east', 'fb', 0, 1, -1), shaft.depth / 2],
    ],
  },
  toiletSouthEast: {
    height: roomHeight,
    size: [toiletSouthEast.width, toiletSouthEast.depth],
    nextTo: ['shaft', null],
    walls: [
      [new Wall(toiletSouthEast.width, roomHeight, 'north', { all: 'fb', left: 'l' }, 0, 1, -1, toiletSouthEast.door, toiletSouthEast.door.width / -2, true), toiletSouthEast.width / 2],
      [new Wall(toiletSouthEast.depth, roomHeight, 'west', 'fb', 0, 1, -1), toiletSouthEast.depth / 2],
      [new Wall(toiletSouthEast.width, roomHeight, 'south', 'fb', 0, 2, -1), toiletSouthEast.width / 2],
      [new Wall(toiletSouthEast.depth, roomHeight, 'east', 'fb', 0, 2, -1), toiletSouthEast.depth / 2],
    ],
  },
  toiletSouth: {
    height: roomHeight,
    size: [toiletSouth.width, toiletSouth.depth],
    nextTo: ['drawingRoom', 'shaft'],
    walls: [
      [new Wall(toiletSouth.width, roomHeight, 'north', { all: 'fb', right: 'r' }, 0, 2, -1, toiletSouth.door, toiletSouth.door.width / 2, true), toiletSouth.width / 2],
      [new Wall(toiletSouth.depth, roomHeight, 'west', 'fb', 0, 1, -3), toiletSouth.depth / 2],
      [new Wall(toiletSouth.width, roomHeight, 'south', 'fb', 0, 1, -1), toiletSouth.width / 2],
      [new Wall(toiletSouth.depth, roomHeight, 'east', 'fb', 0, 1, -1), toiletSouth.depth / 2],
    ],
  },
  bedRoomEast: {
    height: roomHeight,
    size: [bedRoomEast.width, bedRoomEast.depth],
    nextTo: ['toiletSouth', 'shaft'],
    walls: [
      [new Wall(bedRoomEast.width - balconyEast.width, roomHeight, 'north', 'fb', 0, 1, 1), (bedRoomEast.width - balconyEast.width) / 2],
      [new Wall(balconyEast.width, roomHeight, 'north', { all: 'fb', left: 'l', right: 'r' }, 0, 2, 1, balconyEast.door, balconyEast.door.width / 2, false), balconyEast.width / -2],
      [new Wall(aisle.depth, roomHeight, 'west', { all: 'fb', right: 'r' }, 0, 2, 0, bedRoomEast.door, bedRoomEast.door.width / -2, true), aisle.depth / -2],
      [new Wall(bedRoomEast.depth - aisle.depth, roomHeight, 'west', 'fbl', 0, 1, -1), (bedRoomEast.depth - aisle.depth) / 2],
      [new Wall(bedRoomEast.width, roomHeight, 'south', { all: 'fb', right: 'r' }, 0, 1, -1, toiletSouthEast.door, toiletSouthEast.door.width / 2, false), bedRoomEast.width / 2],
      [new Wall(bedRoomEast.depth, roomHeight, 'east', 'fb', 0, 2, -1), bedRoomEast.depth / 2],
      [new Wall(Wall.singleDepth * 2, roomHeight - balconyHeight, 'east', 'fb', balconyHeight, 2, -1), `-${Wall.singleDepth}`],
    ],
  },
  aisle: {
    height: roomHeight,
    size: [aisle.width, aisle.depth],
    nextTo: ['drawingRoom', 'toiletSouth'],
    walls: [
      [new Wall(aisle.width, roomHeight, 'north', { all: 'fb', right: 'r' }, 0, 1, 1, bedRoomNorth.door, bedRoomNorth.door.width / 2, false), aisle.width / 2],
    ],
  },
  bedRoomNorth: {
    height: roomHeight,
    size: [bedRoomNorth.width, bedRoomNorth.depth],
    nextTo: ['drawingRoom', 'bedRoomEast'],
    walls: [
      [new Wall(bedRoomNorth.width, roomHeight, 'north', { all: 'fb', left: 'l' }, 0, 2, -1, balconyNorthEast.door, balconyNorthEast.door.width / -2, false), bedRoomNorth.width / 2],
      [new Wall(balconyNorthWest.depth, roomHeight, 'west', 'fb', 0, 2, -1), balconyNorthWest.depth / -2],
      [new Wall(bedRoomNorth.depth - balconyNorthWest.depth, roomHeight, 'west', 'fb', 0, 1, -3), (bedRoomNorth.depth - balconyNorthWest.depth) / 2],
      [new Wall(bedRoomNorth.width, roomHeight, 'south', { all: 'fb', left: 'l' }, 0, 1, -3, bedRoomNorth.door, bedRoomNorth.door.width / -2, true), bedRoomNorth.width / 2],
      [new Wall(bedRoomNorth.depth, roomHeight, 'east', 'fb', 0, 2, -1), bedRoomNorth.depth / 2],
    ],
  },
  balconyEast: {
    height: balconyHeight,
    size: [balconyEast.width, balconyEast.depth],
    nextTo: ['bedRoomNorth', 'bedRoomEast'],
    walls: [
      [new Wall(balconyEast.width, balconyHeight, 'north', 'fb', 0, 2, -1), balconyEast.width / 2],
      [new Wall(balconyEast.depth, balconyHeight, 'east', 'fb', 0, 2, -1), balconyEast.depth / 2],
      [new Wall(balconyEast.width, 0, 'south', 'fb', 0, 1, -1, balconyEast.door, balconyEast.door.width / -2, true), balconyEast.width / 2],
    ],
  },
  balconyNorthEast: {
    height: balconyHeight,
    size: [balconyNorthEast.width, balconyNorthEast.depth],
    nextTo: ['drawingRoom', 'bedRoomNorth'],
    walls: [
      [new Wall(balconyNorthEast.width, balconyHeight, 'north', 'fb', 0, 2, -1), balconyNorthEast.width / 2],
      [new Wall(balconyNorthEast.depth, balconyHeight, 'west', 'fb', 0, 2, -1), balconyNorthEast.depth / 2],
      [new Wall(balconyNorthEast.width, 0, 'south', 'fb', 0, 1, -1, balconyNorthEast.door, balconyNorthEast.door.width / 2, true), balconyNorthEast.width / 2],
      [new Wall(balconyNorthEast.depth, balconyHeight, 'east', 'fb', 0, 2, -1), balconyNorthEast.depth / 2],
    ],
  },
};
