const { Rover, InputParser } = require('./index');

const gridInput = "5 4";
const roverStartInput = "1 2 N"
const commandInput = "LFLFLFLFF"
const inputParser = new InputParser();

const startingX = 1
const startingY = 2
const startingOrientation = 'N'
const globalRover = new Rover(startingX, startingY, startingOrientation);
globalRover.setGrid(inputParser.parseGridInput(gridInput))

test('given the second line of input, create a rover', () => {
  expect(globalRover.x).toEqual(startingX)
  expect(globalRover.y).toEqual(startingY)
  expect(globalRover.orientation).toEqual(startingOrientation)
})

test('should move rover forward', () => {
  globalRover.parseCommand('F')
  expect(globalRover.x).toEqual(startingX)
  expect(globalRover.y).toEqual(startingY + 1)
  expect(globalRover.orientation).toEqual(startingOrientation)
})

test('should rotate the rover right', () => {
  globalRover.parseCommand('R')
  expect(globalRover.orientation).toEqual('E')

  globalRover.parseCommand('R')
  expect(globalRover.orientation).toEqual('S')

  globalRover.parseCommand('R')
  expect(globalRover.orientation).toEqual('W')

  globalRover.parseCommand('R')
  expect(globalRover.orientation).toEqual('N')
})

test('should rotate the rover left', () => {
  const rover = new Rover(startingX, startingY, startingOrientation)

  rover.parseCommand('L')
  // expect(rover.orientation).toEqual('W')

  rover.parseCommand('L')
  expect(rover.orientation).toEqual('S')

  rover.parseCommand('L')
  expect(rover.orientation).toEqual('E')

  rover.parseCommand('L')
  expect(rover.orientation).toEqual('N')
})

test('should parse an F command', () => {
  const rover = new Rover(startingX, startingY, startingOrientation)
  rover.setGrid(inputParser.parseGridInput(gridInput))
  const spy = jest.spyOn(rover.state, 'moveForward')

  rover.parseCommand('F')
  expect(spy).toHaveBeenCalledTimes(1)
  expect(rover.y).toEqual(3)
})

test('should rotate when given rotate command', () => {
  const rover = new Rover(startingX, startingY, startingOrientation)
  const rotateLeftSpy = jest.spyOn(rover.state, 'moveLeft')
  
  rover.parseCommand('L')
  expect(rotateLeftSpy).toHaveBeenCalledTimes(1);
  expect(rover.orientation).toEqual('W')

  const rotateRightSpy = jest.spyOn(rover.state, 'moveRight')
  rover.parseCommand('R')
  expect(rotateRightSpy).toHaveBeenCalledTimes(1);
  expect(rover.orientation).toEqual('N')
})

it('rover should print its location', () => {
  const rover = new Rover(startingX, startingY, startingOrientation);
  const locationText = `${startingX} ${startingY} ${startingOrientation}`
  console.log = jest.fn();
  
  rover.printCurrentLocation();
  expect(console.log).toHaveBeenCalledWith(locationText);
})

it('given the first line of input, input parser should create grid', () => {
  const returnedGrid = inputParser.parseGridInput(gridInput)
  expect(returnedGrid.sizeX).toEqual(5)
  expect(returnedGrid.sizeY).toEqual(4)
})

it('given the second line of input, input parse should create a new rover', () => {
  const returnedRover = inputParser.parseRoverCreateInput(roverStartInput)
  expect(returnedRover.x).toEqual(startingX)
  expect(returnedRover.y).toEqual(startingY)
  expect(returnedRover.orientation).toEqual(startingOrientation)
})

it('given the third and last line of input, input parser should send commands to the rover', () => {
  const rover = inputParser.parseRoverCreateInput(roverStartInput)
  rover.setGrid(inputParser.parseGridInput(gridInput))
  const endingX = 1;
  const endingY = 3;
  const endingOrientation = 'N'

  inputParser.sendCommandToRover(commandInput, rover)
  
  expect(rover.x).toEqual(endingX)
  expect(rover.y).toEqual(endingY)
  expect(rover.orientation).toEqual(endingOrientation)
})

it('rover should wrap at the end of the grid', () => {
  const rover = inputParser.parseRoverCreateInput(roverStartInput)
  rover.setGrid(inputParser.parseGridInput(gridInput))
  
  const endingX = 3;
  const endingY = 2;
  const endingOrientation = 'W'

  inputParser.sendCommandToRover('LFFF', rover)

  expect(rover.x).toEqual(endingX)
  expect(rover.y).toEqual(endingY)
  expect(rover.orientation).toEqual(endingOrientation)
})