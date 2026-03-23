import { BaseQuestion } from './questionBank'

export const chapter6: BaseQuestion[] = [
  {
    prompt:
      'You are driving in the middle lane on a three lane expressway. A car begins to pass you on the right. The actions of that driver are:',
    correct: 'OK if no signs forbid passing on the right',
    wrong: [
      'Wrong because "pass on the left" is a firm rule',
      'Wrong because he\'s passing you in your "blind spot"',
      'OK as long as he does it on a limited access highway'
    ],
    explanation:
      'Passing on the right is allowed in some situations if not prohibited.'
  },
  {
    prompt:
      'After you have passed a car you should return to the right lane when you:',
    correct: 'See the front bumper of the other car in your mirror',
    wrong: [
      'Have put your turn signal on',
      'Have turned your headlights on',
      "See the other car's headlights come on"
    ],
    explanation: 'Return only when you are safely ahead of the vehicle.'
  },
  {
    prompt:
      'In general, you should pass vehicles going in the same direction you are going:',
    correct: 'On the left',
    wrong: [
      'On the right',
      'Only if the other driver signals it is safe',
      'Whenever you have the opportunity to do so'
    ],
    explanation: 'Passing on the left is the standard rule.'
  },
  {
    prompt: 'You may pass another vehicle on the right if it is waiting to:',
    correct: 'Turn left',
    wrong: [
      'Turn right',
      'Park at the curb',
      'Turn into a driveway on the right'
    ],
    explanation:
      'Passing on the right is allowed when a vehicle is turning left.'
  },
  {
    prompt: 'The car behind you begins to pass you. You should:',
    correct: 'Slow down slightly and stay in your lane',
    wrong: [
      'Maintain your speed so traffic will flow smoothly',
      'Pull to the right and stop so he can pass',
      'Blow your horn to allow him to pass'
    ],
    explanation: 'Do not interfere; allow safe passing.'
  },
  {
    prompt: 'When you want to overtake and pass another vehicle you should:',
    correct: 'Signal and pass when safe to do so',
    wrong: [
      'Wait for a signal from the other driver',
      'Change lanes quickly so the other driver will see you',
      'Stay close behind so you need less time to pass'
    ],
    explanation: 'Always signal and ensure it is safe before passing.'
  },
  {
    prompt: 'In which of the following situations is passing always forbidden?',
    correct: 'The vehicle ahead is stopped for a pedestrian in a crosswalk',
    wrong: [
      'The vehicle ahead is making a left turn',
      'You are on a one-way street which has two lanes',
      'The vehicle ahead is going to park parallel to the curb'
    ],
    explanation: 'You must not pass a vehicle stopped for pedestrians.'
  },
  {
    prompt:
      'What does it mean when a school bus is stopped and its red lights are flashing?',
    correct: 'You may not pass while the red lights are flashing',
    wrong: [
      'You may pass if no children are on the road',
      'You may pass if you are facing the front of the bus',
      'You may pass if it is on the other side of a divided highway'
    ],
    explanation: 'You must stop for a school bus with flashing red lights.'
  }
]
