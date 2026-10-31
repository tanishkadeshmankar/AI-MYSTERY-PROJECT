import { GoogleGenerativeAI } from '@google/generative-ai';

const buildMockMystery = ({ title, scenario, category, difficulty }) => {
  const normalizedTitle = (title || scenario || 'The Vanishing Ledger').trim() || 'The Vanishing Ledger';
  const normalizedCategory = category || 'Theft';
  const normalizedDifficulty = difficulty || 'Medium';
  const safeScenario = (scenario || 'A valuable object disappears under suspicious circumstances.').trim();

  const categoryProfiles = {
    'murder mystery': {
      location: 'Blackstone Manor, East Wing',
      sceneImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      suspects: [
        { name: 'Elena Voss', occupation: 'Estate Manager' },
        { name: 'Marcus Hale', occupation: 'Private Investigator' },
        { name: 'Nina Sol', occupation: 'Family Heir' },
      ],
      evidenceBase: 'A letter, a cut phone line, and a muddy footprint all point to the same hidden route.'
    },
    theft: {
      location: 'Chronos Museum, East Wing Archive',
      sceneImage: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80',
      suspects: [
        { name: 'Mara Quinn', occupation: 'Archivist' },
        { name: 'Dorian Vale', occupation: 'Security Consultant' },
        { name: 'Priya Shah', occupation: 'Event Coordinator' },
      ],
      evidenceBase: 'Someone used the service corridor after the crowd thinned out.'
    },
    'missing object': {
      location: 'Silverline Lab, Locked Vault',
      sceneImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
      suspects: [
        { name: 'Sloane Pierce', occupation: 'Research Lead' },
        { name: 'Julian Cross', occupation: 'Maintenance Supervisor' },
        { name: 'Amara Bell', occupation: 'Logistics Manager' },
      ],
      evidenceBase: 'A missing prototype trail leads from the vault to a delivery cart.'
    },
    cybercrime: {
      location: 'North Harbor Data Center, Secure Server Floor',
      sceneImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
      suspects: [
        { name: 'Iris Flint', occupation: 'Systems Engineer' },
        { name: 'Kian Moss', occupation: 'Threat Analyst' },
        { name: 'Rhea Cole', occupation: 'Operations Director' },
      ],
      evidenceBase: 'A fake login, a deleted log, and a copied backup all tell the same story.'
    },
    'suspicious incident': {
      location: 'Hawthorne Hotel, Service Corridor',
      sceneImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      suspects: [
        { name: 'Theo Grant', occupation: 'Night Manager' },
        { name: 'Leah Ortiz', occupation: 'Concierge' },
        { name: 'Owen Price', occupation: 'Event Host' },
      ],
      evidenceBase: 'The guest list and staff logs do not match the room camera records.'
    },
    'corporate mystery': {
      location: 'Verdant Capital, Executive Tower',
      sceneImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
      suspects: [
        { name: 'Ava Mercer', occupation: 'Finance Director' },
        { name: 'Nathan Pike', occupation: 'Board Advisor' },
        { name: 'Selena Rowe', occupation: 'Communications Lead' },
      ],
      evidenceBase: 'A board memo, a deleted email, and a hidden transfer trail all match one person.'
    },
  };

  const profile = categoryProfiles[normalizedCategory.toLowerCase()] || categoryProfiles.theft;
  const suspects = profile.suspects.map((person, index) => ({
    id: `suspect_${String(index + 1).padStart(2, '0')}`,
    name: person.name,
    age: 26 + index * 8 + (normalizedDifficulty === 'Hard' ? 4 : normalizedDifficulty === 'Easy' ? 0 : 2),
    occupation: person.occupation,
    relationship: index === 0 ? 'Was close to the scene' : index === 1 ? 'Had access to the key route' : 'Had a reason to hide the truth',
    bio: index === 1
      ? `A careful planner who understands how to hide the truth in plain sight and control the route around it.`
      : index === 0
        ? `A calm person who noticed details, but may have used that knowledge to hide their own involvement.`
        : `A busy person with strong pressure and secrets, making them seem suspicious without proving guilt.`,
    statement: index === 1
      ? 'I did not expect the evidence to lead to me, but I can explain every move near the scene.'
      : index === 0
        ? 'I saw the problem, but I did not cause it.'
        : 'I was under pressure and scared, but I never touched the key item.',
    avatar: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80',
    ][index],
    motive: index === 1
      ? `${person.name} had the access, timing, and pressure to move the story in their favor and protect their own gain.`
      : index === 0
        ? `${person.name} feared the truth would ruin their reputation and expose a hidden link to the case.`
        : `${person.name} wanted to keep a secret safe and was willing to lie if the truth would damage their life.`
  }));

  const culprit = suspects[1];
  const caseTitle = normalizedTitle || 'Mystery Case';
  const shortTitle = caseTitle.length > 50 ? `${caseTitle.slice(0, 47)}...` : caseTitle;
  const sceneSentence = safeScenario.endsWith('.') ? safeScenario : `${safeScenario}.`;
  const background = `${sceneSentence} The case grew fast. Soon, the whole room was full of secrets, blame, and one question: who was hiding the truth?`;

  const evidence = [
    {
      id: 'ev_01',
      type: 'message',
      title: 'Secret message',
      sender: culprit.name,
      recipient: 'Operations Desk',
      content: `I will handle it before anyone checks the ${profile.location.split(',')[0].toLowerCase()} route. Keep everyone away from the key area until I say it is safe.`,
      timestamp: '2026-10-14T00:32:00',
    },
    {
      id: 'ev_02',
      type: 'photo',
      title: 'Scene photo',
      description: profile.evidenceBase,
      timestamp: '2026-10-14T00:44:00',
      imageUrl: profile.sceneImage,
    },
    {
      id: 'ev_03',
      type: 'cctv',
      title: 'Security log',
      camera: 'North Access Hall',
      timestamp: '2026-10-14T00:41:15',
      observation: `A person in dark clothes enters the area at the key moment and leaves with a wrapped item before the room is fully checked.`,
    },
    {
      id: 'ev_04',
      type: 'timeline',
      title: 'Timeline',
      events: [
        { time: '23:55', description: 'The room starts to empty. attention drops.', person: suspects[0].name, location: 'Main Hall' },
        { time: '00:12', description: 'A short power flicker opens a narrow path for a few minutes.', person: culprit.name, location: 'Service Corridor' },
        { time: '00:19', description: 'An access log is used from a hidden terminal.', person: culprit.name, location: 'Control Room' },
        { time: '00:22', description: 'A wrapped object leaves the area. It is gone before the check is finished.', person: 'Unknown', location: 'Loading Bay' },
      ],
    },
    {
      id: 'ev_05',
      type: 'statement',
      title: 'Witness note',
      witness: 'Sonia Grey',
      statement: `I saw ${culprit.name} near the restricted route before the issue was reported. They were carrying a wrapped item and looked ready to leave fast.`,
      timestamp: '2026-10-14T01:10:00',
    },
  ];

  const redHerrings = [
    `${suspects[0].name} looks nervous and has a reason to hide a secret.`,
    `${suspects[2].name} is under pressure and has a story that is hard to trust.`,
    `The timing is messy enough that several people could claim they were near the scene.`,
  ];

  return {
    id: `mystery_${Date.now()}`,
    title: shortTitle,
    background,
    incident: `${sceneSentence} The clues all point to a person who knew the route, the timing, and the weak spot in the plan.`,
    location: profile.location,
    dateTime: 'October 14, 2026 · 11:45 PM',
    category: normalizedCategory,
    difficulty: normalizedDifficulty,
    sceneImage: profile.sceneImage,
    soundMood: normalizedCategory.toLowerCase() === 'cybercrime' ? 'tech-hum' : 'low-hum',
    suspects,
    evidence,
    timeline: [
      { time: '23:50', description: 'The main access points are checked and the room looks calm.', person: 'Security Team', location: 'Main Hall' },
      { time: '00:04', description: 'The first strange movement is spotted near the restricted route.', person: suspects[0].name, location: 'Near the scene' },
      { time: '00:18', description: 'A dark figure moves through the narrow route and stays out of view.', person: 'Unknown', location: 'Service Corridor' },
      { time: '00:21', description: 'A wrapped item leaves the area and heads for a side exit.', person: 'Unknown', location: 'Loading Bay' },
      { time: '00:39', description: 'The alarm is restored, but the truth is already gone.', person: 'Security Team', location: 'Outside the building' },
    ],
    redHerrings,
    solution: {
      culpritId: 'suspect_02',
      motive: `${culprit.name} had the access, timing, and pressure to make the case look like a mistake, while protecting their own gain.`,
      explanation: `The message, the camera log, and the witness note all point to ${culprit.name}. The timing matches the hidden route, and the wrapped item fits the way the suspect moved around the room.`,
      supportingEvidenceIds: ['ev_01', 'ev_03', 'ev_05'],
    },
    reveal: {
      summary: `The culprit was ${culprit.name}. They knew the route, had the timing, and had a reason to hide the truth.`,
    },
  };
};

export const generateMystery = async ({ title, scenario, category, difficulty }) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return buildMockMystery({ title, scenario, category, difficulty });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Create a fictional, internally consistent mystery in valid JSON. Output only JSON with fields: title, background, incident, location, dateTime, category, difficulty, suspects as array with id, name, age, occupation, relationship, bio, statement, avatar, motive, evidence as array with id, type, title, sender, recipient, content, timestamp, description, imageUrl, camera, observation, witness, statement, timeline as array with time, description, person, location, redHerrings as array of strings, solution with culpritId, motive, explanation, supportingEvidenceIds. The scenario is: ${scenario}. Category: ${category}. Difficulty: ${difficulty}. Ensure exactly one culprit and logical clue consistency.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonString = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(jsonString);

    return {
      id: `mystery_${Date.now()}`,
      ...parsed,
    };
  } catch (error) {
    console.warn('Gemini generation failed, falling back to mock mystery.', error.message);
    return buildMockMystery({ title, scenario, category, difficulty });
  }
};
