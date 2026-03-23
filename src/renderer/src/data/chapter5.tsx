import { BaseQuestion } from './questionBank'

export const chapter5: BaseQuestion[] = [
  {
    prompt: 'When you want to make a right turn, your car must be:',
    correct: 'Close to the right side of the street',
    wrong: [
      'Near the center of the street',
      'Close to the left side of the street',
      'Past the center of the intersection when you begin to turn'
    ],
    explanation: 'Right turns must be made from the rightmost position.'
  },
  {
    prompt:
      'You want to turn left at an intersection. The light is green but oncoming traffic is heavy. You should:',
    correct: 'Wait in the center of the intersection for traffic to clear',
    wrong: [
      'Use the next intersection',
      'Wait at the crosswalk for traffic to clear',
      'Take the right-of-way since you have the light'
    ],
    explanation: 'Move into the intersection and wait safely.'
  },
  {
    prompt:
      'The law that requires every driver to exercise care to avoid colliding with an authorized emergency or hazard vehicle is called:',
    correct: 'Move Over Law',
    wrong: ['Brianna’s Law', 'The Green Light Law', 'Right of Way'],
    explanation: 'Move Over Law protects emergency vehicles.'
  },
  {
    prompt:
      'What should you do when you are going to enter a roadway from a private road?',
    correct: 'Yield the right-of-way to pedestrians and roadway traffic',
    wrong: [
      'Blow your horn to warn cars you are entering the roadway',
      'Stop with part of the car on the roadway to warn other drivers',
      'Drive out fast to merge smoothly with the traffic'
    ],
    explanation: 'Traffic already on the road has priority.'
  },
  {
    prompt:
      'You are making a left turn away from a two-way street into a one-way street. When you have completed the turn your car should be:',
    correct: 'In the left lane of the street',
    wrong: [
      'In the right lane of the street',
      'In the center of the street',
      'In the lane with the least traffic'
    ],
    explanation: 'Turn into the nearest appropriate lane.'
  },
  {
    prompt:
      'You drive along a street and hear a siren. You cannot immediately see the emergency vehicle. You should:',
    correct: 'Pull to the curb and look to see if it is on your street',
    wrong: [
      'Keep driving until you see the vehicle',
      'Slow down but don’t stop until you see it',
      'Speed up and turn at the next intersection'
    ],
    explanation: 'Safely pull over and locate the vehicle.'
  },
  {
    prompt:
      'You want to turn right at the next intersection. You should begin to use your turn signal:',
    correct: 'At least 100 feet before you turn',
    wrong: [
      'At least 50 feet before the turn',
      'When you reach the intersection',
      'As soon as you see cars behind you'
    ],
    explanation: 'Signal early to warn other drivers.'
  },
  {
    prompt: 'You must pull over and stop for:',
    correct: 'Authorized emergency vehicles responding to emergencies',
    wrong: [
      'Vehicles that display blue, green or amber lights',
      'A hazard vehicle that is parked, stopped or standing on any part of the highway',
      'Stopped or standing school buses'
    ],
    explanation: 'Emergency vehicles always have priority.'
  },
  {
    prompt:
      'When two vehicles enter an intersection from different highways at the same time, which vehicle must yield the right-of-way?',
    correct: 'Vehicle on the left',
    wrong: ['Either one', 'Vehicle on the right', 'Neither one'],
    explanation: 'Driver on the left yields to the right.'
  },
  {
    prompt:
      'You come to an intersection which is blocked by other traffic. You should:',
    correct: 'Stay out of the intersection until you can pass through',
    wrong: [
      'Go slowly until the traffic ahead moves',
      'Get as close as possible to the other car',
      'Sound your horn to make the cars move up'
    ],
    explanation: 'Never block intersections.'
  },
  {
    prompt:
      'You must yield the right-of-way to an approaching vehicle when you are:',
    correct: 'Turning left',
    wrong: [
      'Already in a traffic circle',
      'Already in an intersection',
      'Going straight ahead'
    ],
    explanation: 'Left turns must yield.'
  },
  {
    prompt: (
      <div>
        <img src="/signs/lefthandup.png" className="mb-2 h-20" />
        <p>
          The driver&apos;s left hand and arm are extended upward. This hand
          signal means that the driver plans to:
        </p>
      </div>
    ),
    correct: 'Turn right',
    wrong: ['Turn left', 'Come to a stop', 'Go straight ahead'],
    explanation: 'Upward arm signal = right turn.'
  },
  {
    prompt:
      'When you see an emergency vehicle parked, stopped, or standing with its emergency or hazard lights activated on a highway or parkway, you should:',
    correct:
      'Move out of the lane closest to the emergency vehicle, if possible to do so safely',
    wrong: [
      'Make a U-turn to avoid the vehicle',
      'Maintain your speed and lane position if possible',
      'Stop behind the vehicle and activate your hazard lights'
    ],
    explanation: 'Move Over Law requires lane change if possible.'
  },
  {
    prompt: 'You have the right of way when you are:',
    correct: 'Already in a traffic circle',
    wrong: [
      'Entering a traffic circle',
      'Backing out of a driveway',
      'Leaving a parking space'
    ],
    explanation: 'Traffic in circle has priority.'
  },
  {
    prompt:
      'You are waiting in the intersection to complete a left turn. You should:',
    correct: 'Signal and keep your wheels straight',
    wrong: [
      'Signal and keep your wheels turned to the left',
      'Flash your headlights so the driver will let you through',
      'Drive around the rear of a car if it blocks you'
    ],
    explanation: 'Keeps you safe if hit from behind.'
  },
  {
    prompt: (
      <div>
        <img src="/signs/lefthanddown.png" className="mb-2 h-20" />
        <p>
          The driver&apos;s left arm and hand are extended downward. This hand
          signal means that the driver plans to:
        </p>
      </div>
    ),
    correct: 'Stop',
    wrong: ['Turn left', 'Turn right', 'Start up'],
    explanation: 'Downward arm = stop.'
  }
]
