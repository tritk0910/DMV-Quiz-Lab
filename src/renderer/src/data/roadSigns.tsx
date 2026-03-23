import { BaseQuestion } from './questionBank'

export const roadSigns: BaseQuestion[] = [
  {
    prompt: (
      <div>
        <img src="/signs/slippery.png" className="mb-2 h-20" />
        <p>This sign means:</p>
      </div>
    ),
    correct: 'Slippery when wet',
    wrong: [
      "Don't drink if you are going to drive",
      'Road curves ahead',
      'You are approaching a hill'
    ],
    explanation: 'Road may be slippery.'
  },
  {
    prompt: (
      <div>
        <img src="/signs/noleftturn.png" className="mb-2 h-20" />
        <p>This sign means:</p>
      </div>
    ),
    correct: 'No left turn',
    wrong: ['All traffic turn left', 'No U-turn', 'Truck route to the left'],
    explanation: 'Left turns are prohibited.'
  },
  {
    prompt: (
      <div>
        <img src="/signs/railroad.png" className="mb-2 h-20" />
        <p>This sign is a warning that you are approaching:</p>
      </div>
    ),
    correct: 'A railroad crossing',
    wrong: ['An intersection', 'A crosswalk', 'A blasting zone'],
    explanation: 'Railroad crossing ahead.'
  },
  {
    prompt: (
      <div>
        <img src="/signs/mergingtrafficfromright.png" className="mb-2 h-20" />
        <p>This sign means:</p>
      </div>
    ),
    correct: 'Merging traffic from the right',
    wrong: ['One-way traffic', 'Intersection ahead', 'Highway curves ahead'],
    explanation: 'Traffic merges from right.'
  },
  {
    prompt: (
      <div>
        <img src="/signs/hospital.png" className="mb-2 h-20" />
        <p>This sign means:</p>
      </div>
    ),
    correct: 'Hospital ahead to the right',
    wrong: [
      'Highway changes ahead to the right',
      'Hiking trails ahead to the right',
      'Hotel ahead to the right'
    ],
    explanation: 'Hospital nearby.'
  },
  {
    prompt: (
      <div>
        <img src="/signs/nouturn.png" className="mb-2 h-20" />
        <p>This sign means:</p>
      </div>
    ),
    correct: 'No U-turn',
    wrong: ['No left turn', 'No stopping', 'Detour ahead'],
    explanation: 'U-turns not allowed.'
  },
  {
    prompt: (
      <div>
        <img src="/signs/stop.png" className="mb-2 h-20" />
        <p>This sign means:</p>
      </div>
    ),
    correct: 'Come to a full stop, then go when it is safe to do so',
    wrong: [
      'Slow down and prepare to stop only if cars are approaching you',
      'Proceed carefully through the intersection, not always stopping',
      'Stop only for traffic on an intersecting road'
    ],
    explanation: 'Full stop required.'
  },
  {
    prompt: (
      <div>
        <img src="/signs/twowaytraffic.png" className="mb-2 h-20" />
        <p>This sign means:</p>
      </div>
    ),
    correct: 'Two-way traffic ahead',
    wrong: [
      'Four-lane traffic ahead',
      'Divided highway ahead',
      'Intersection ahead'
    ],
    explanation: 'Opposing traffic ahead.'
  },
  {
    prompt: (
      <div>
        <img src="/signs/school.png" className="mb-2 h-20" />
        <p>This sign means:</p>
      </div>
    ),
    correct: 'School crossing ahead',
    wrong: ['Pedestrians only', 'Intersection ahead', 'Hiking trails ahead'],
    explanation: 'Watch for children.'
  },
  {
    prompt: (
      <div>
        <img src="/signs/keepright.png" className="mb-2 h-20" />
        <p>This sign means:</p>
      </div>
    ),
    correct: 'Keep to the right',
    wrong: [
      'One-way traffic ahead',
      'Two-way traffic ahead',
      'Divided highway ends'
    ],
    explanation: 'Divider ends ahead.'
  },
  {
    prompt: (
      <div>
        <img src="/signs/trafficlightahead.png" className="mb-2 h-20" />
        <p>This sign means:</p>
      </div>
    ),
    correct: 'There is a traffic signal ahead',
    wrong: [
      'Continue at your current speed',
      'You must stop ahead',
      'Speeding is not allowed'
    ],
    explanation: 'Prepare for signal.'
  },
  {
    prompt: (
      <div>
        <img src="/signs/dividedhighwayends.png" className="mb-2 h-20" />
        <p>This sign means:</p>
      </div>
    ),
    correct: 'Divided highway ends',
    wrong: [
      'Divided highway ahead',
      'One-way traffic ahead',
      'Four-lane highway ahead'
    ],
    explanation: 'Median begins.'
  },
  {
    prompt: (
      <div>
        <img src="/signs/donotenter.png" className="mb-2 h-20" />
        <p>This sign is used to prevent:</p>
      </div>
    ),
    correct: 'Wrong-way entrance on one-way streets and expressway ramps',
    wrong: [
      'Entrance to full parking lots',
      'Entrance to road construction areas',
      'Entrance to dead-end streets'
    ],
    explanation: 'Wrong direction entry.'
  },
  {
    prompt: (
      <div>
        <img src="/signs/rightlaneendskeepleft.png" className="mb-2 h-20" />
        <p>This sign means:</p>
      </div>
    ),
    correct: 'Right lane ends, stay to the left',
    wrong: [
      'Merging traffic is approaching from the right',
      'Winding road ahead',
      'Divided highway ahead'
    ],
    explanation: 'Curves ahead.'
  },
  {
    prompt: (
      <div>
        <img src="/signs/yield.png" className="mb-2 h-20" />
        <p>This sign means:</p>
      </div>
    ),
    correct: 'Slow down and be prepared to stop if necessary',
    wrong: [
      'Slow down if an emergency vehicle is approaching',
      'Look both ways as you cross the intersection',
      'Always come to a full stop at the intersection'
    ],
    explanation: 'Yield right-of-way.'
  },
  {
    prompt: (
      <div>
        <img src="/signs/hillahead.png" className="mb-2 h-20" />
        <p>This sign means:</p>
      </div>
    ),
    correct: 'Hill ahead',
    wrong: [
      'Trucks under 18,000 lbs. allowed',
      'No trucks allowed',
      'Truck stop ahead'
    ],
    explanation: 'Trucks prohibited.'
  }
]
