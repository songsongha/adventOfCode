// Part 1: What is the fewest button presses required to
// correctly configure the indicator lights on all the machines

// parse the string to the get light diagram, button configs
// need to find the smallest combinations that make the light diagram

// get the positions of the lights that we want to be on, compared to what is currently on (none in first scenario)
// search for buttons that contain the positions that are on
// increment the button press count
// if all positions are in one button, answer is done
// else for all the button options, get the list of lights we want to be on compared to existing scenario after button is pressed
// run this loop until one of them is done.
// then check the next machine
