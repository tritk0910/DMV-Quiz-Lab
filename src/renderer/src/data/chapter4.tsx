import { BaseQuestion } from './questionBank'

export const chapter4: BaseQuestion[] = [
  {
    prompt: 'A rectangular-shaped sign is:',
    correct: 'Speed limit sign',
    wrong: ['Stop sign', 'School crossing sign', 'Railroad crossing sign'],
    explanation: 'Rectangular signs are regulatory signs such as speed limits.'
  },
  {
    prompt:
      'An intersection has a stop sign and a crosswalk, but no stop line. You must stop:',
    correct: 'Before the crosswalk',
    wrong: [
      '50 feet before the intersection',
      'Where you think the stop line would be',
      'With your front wheels in the crosswalk'
    ],
    explanation:
      'You must stop before the crosswalk if no stop line is present.'
  },
  {
    prompt:
      'When the road is marked with a solid yellow line and a broken yellow line on your side you may pass:',
    correct: 'If traffic is clear',
    wrong: [
      'Only in an emergency',
      'If you are on an expressway',
      'Only at an intersection'
    ],
    explanation: 'A broken yellow line on your side allows passing when safe.'
  },
  {
    prompt: 'You may cross a single solid white line in the highway:',
    correct: 'If traffic conditions require',
    wrong: [
      'Whenever you want to',
      'Only to turn into a driveway',
      'Only to make a u-turn'
    ],
    explanation:
      'Solid white lines discourage lane changes but allow them if necessary.'
  },
  {
    prompt: (
      <div>
        <img src="/signs/stop.png" alt="STOP sign" className="mb-2 h-20" />
        <p>What does this road sign mean?</p>
      </div>
    ),
    correct: 'Come to a full stop, then go when it is safe to do so',
    wrong: [
      'Slow down and prepare to stop only if cars are approaching you',
      'Proceed carefully through the intersection, not always stopping',
      'Stop only for traffic on an intersecting road'
    ],
    explanation: 'A STOP sign requires a full stop.'
  },
  {
    prompt: 'You may not cross a single broken white (or yellow) line:',
    correct: 'When to do so would interfere with traffic',
    wrong: [
      'When turning left into a driveway',
      'When the car in front is disabled',
      'When passing to the right on a one-way street'
    ],
    explanation: 'Lane changes must not interfere with traffic.'
  },
  {
    prompt: 'What does a flashing yellow light mean?',
    correct: 'Proceed with caution',
    wrong: ['Merging traffic', 'Pedestrian crossing', 'Come to a full stop'],
    explanation: 'Flashing yellow means slow down and proceed carefully.'
  },
  {
    prompt: 'You may cross a double solid yellow line:',
    correct: 'To turn into a driveway',
    wrong: [
      'To pass a slow moving truck',
      'To pass a car if traffic permits',
      'Under no conditions'
    ],
    explanation: 'Only allowed for left turns into driveways.'
  },
  {
    prompt:
      'What are the colors of warning signs that indicate hazards ahead, such as curves in the road or narrow bridges?',
    correct: 'Black letters or symbols on a yellow background',
    wrong: [
      'Black letters or symbols on a white background',
      'White letters or symbols on a blue background',
      'White letters or symbols on a green background'
    ],
    explanation: 'Yellow signs warn of hazards.'
  },
  {
    prompt:
      'What are the colors of a sign which tells you the distance to the next exit of a highway?',
    correct: 'Green with white letters',
    wrong: [
      'Yellow with black letters',
      'Black with white letters',
      'Red with white letters'
    ],
    explanation: 'Green signs provide direction and distance info.'
  },
  {
    prompt:
      'A solid white line on the right edge of the highway slants in toward your left. This shows that:',
    correct: 'You will be required to turn left just ahead',
    wrong: [
      'There is an intersection just ahead',
      'You are approaching a construction area',
      'The road will get narrower'
    ],
    explanation: 'This marking indicates a required lane movement.'
  },
  {
    prompt: 'A diamond-shaped sign is a:',
    correct: 'Road hazard sign',
    wrong: [
      'Interstate route sign',
      'School crossing sign',
      'Speed limit sign'
    ],
    explanation: 'Diamond-shaped signs warn of hazards.'
  },
  {
    prompt:
      'You come to an intersection which has a flashing red light. You should:',
    correct: 'Come to a full stop, then go when safe to do so',
    wrong: [
      'Stop only if cars are approaching the intersection',
      'Stop only if cars are already in the intersection',
      'Slow down and be prepared to stop if necessary'
    ],
    explanation: 'Flashing red = same as STOP sign.'
  },
  {
    prompt: 'A red and white triangular sign at an intersection means:',
    correct: 'Slow down and be prepared to stop if necessary',
    wrong: [
      'Always come to a full stop at the intersection',
      'Look both ways as you cross the intersection',
      'Slow down if an emergency vehicle is approaching'
    ],
    explanation: 'This is a YIELD sign.'
  },
  {
    prompt:
      'Which of the following is used on some highways to direct drivers into the proper lanes for turning?',
    correct: 'White arrows in the middle of the lanes',
    wrong: [
      'Flashing red lights',
      'Flashing yellow lights',
      'White lines on the side of the road'
    ],
    explanation: 'Lane arrows indicate direction.'
  },
  {
    prompt:
      'A traffic light which has a green arrow and a red light means that:',
    correct: 'You may drive only in the direction of the green arrow',
    wrong: [
      'You may only drive straight ahead',
      'You must wait for a green light',
      'Vehicles moving in any direction must stop'
    ],
    explanation: 'Arrow controls movement direction.'
  },
  {
    prompt: 'Which of the following must you obey over the other three?',
    correct: 'A police officer',
    wrong: ['A steady red light', 'A stop sign', 'A flashing red light'],
    explanation: 'Police override all signals.'
  },
  {
    prompt:
      'As you near an intersection, the traffic light changes from green to yellow. Your best action would be to:',
    correct: 'Be prepared to stop before the intersection',
    wrong: [
      'Speed up to beat the red light',
      'Apply the brakes sharply to stop',
      'Be prepared to stop in the center of the intersection'
    ],
    explanation: 'Yellow means prepare to stop safely.'
  }
]
