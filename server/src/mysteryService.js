import { GoogleGenerativeAI } from '@google/generative-ai';

const buildMockMystery = ({ title, scenario, category, difficulty }) => {
  const normalizedTitle = title?.trim() || 'The Vanishing Ledger';
  const normalizedCategory = category || 'Theft';
  const normalizedDifficulty = difficulty || 'Medium';

  const suspects = [
    {
      id: 'suspect_01',
      name: 'Mara Quinn',
      age: 34,
      occupation: 'Archivist',
      relationship: 'Handled the records room',
      bio: 'A meticulous record keeper with a habit of noticing every detail in a room.',
      statement: 'I saw no one leave the office after midnight.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
      motive: 'She feared the missing ledger would expose financial fraud in the archive.',
    },
    {
      id: 'suspect_02',
      name: 'Dorian Vale',
      age: 41,
      occupation: 'Security Consultant',
      relationship: 'Responsible for site security',
      bio: 'Former investigator turned consultant who knows how to bypass cameras and alarms.',
      statement: 'The property was under my supervision, and I did not notice the breach.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      motive: 'He planned to sell confidential intel from the stolen ledger to a rival company.',
    },
    {
      id: 'suspect_03',
      name: 'Priya Shah',
      age: 27,
      occupation: 'Event Coordinator',
      relationship: 'Organized the gala that night',
      bio: 'Energetic, well-liked, and always moving between guests during large events.',
      statement: 'I was focused on the fundraiser all night and never left the ballroom.',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80',
      motive: 'She wanted to hide an affair with a donor and feared the ledger would reveal it.',
    },
  ];

  const evidence = [
    {
      id: 'ev_01',
      type: 'whatsapp',
      title: 'Security chat transcript',
      sender: 'Dorian Vale',
      recipient: 'Operations Desk',
      content: 'System is still active. Do not change guard rotation until 2:00 AM. I will check the archive first.',
      timestamp: '2026-10-14T00:32:00',
      metadata: { status: 'Read' },
    },
    {
      id: 'ev_02',
      type: 'photo',
      title: 'Archive corridor image',
      description: 'A close-up photo of a muddy shoe print leading directly toward the archive door.',
      timestamp: '2026-10-14T00:44:00',
      imageUrl: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'ev_03',
      type: 'cctv',
      title: 'CCTV log',
      camera: 'North Archive Hall',
      timestamp: '2026-10-14T00:41:15',
      observation: 'A figure in dark clothing is seen entering the archive wing. The figure leaves carrying a rolled case and disappears into the service corridor.',
    },
    {
      id: 'ev_04',
      type: 'timeline',
      title: 'Timeline of events',
      events: [
        { time: '23:55', description: 'The gala ends and attendees begin to leave.', person: 'Priya Shah', location: 'Grand Ballroom' },
        { time: '00:12', description: 'Archive lights flicker on for 90 seconds.', person: 'Mara Quinn', location: 'Archive Room' },
        { time: '00:19', description: 'The alarm system is disabled from the security terminal.', person: 'Dorian Vale', location: 'Control Room' },
        { time: '00:22', description: 'A rolled case is seen leaving the archive wing.', person: 'Unknown', location: 'Service Corridor' },
      ],
    },
    {
      id: 'ev_05',
      type: 'statement',
      title: 'Witness statement',
      witness: 'Sonia Grey',
      statement: 'I saw Dorian in the service corridor before the alarm was reset. He was carrying a smooth, cylindrical object.',
      timestamp: '2026-10-14T01:10:00',
    },
  ];

  return {
    id: `mystery_${Date.now()}`,
    title: normalizedTitle,
    background: `A valuable ledger vanished from the Chronos Museum during a charity gala. The item held sensitive donor records and internal contracts, and the theft could ruin several careers if exposed.`,
    incident: `The ledger vanished from the archive room during the final hours of the gala. The room was locked, but the evidence suggests someone was inside before the official lock-up. ${scenario}`,
    location: 'Chronos Museum, East Wing Archive',
    dateTime: 'October 14, 2026 · 11:45 PM',
    category: normalizedCategory,
    difficulty: normalizedDifficulty,
    suspects,
    evidence,
    timeline: [
      { time: '23:50', description: 'Security team performed a final sweep of the east wing.', person: 'Dorian Vale', location: 'Control Room' },
      { time: '00:04', description: 'Mara Quinn was seen reviewing donor logs.', person: 'Mara Quinn', location: 'Archive Room' },
      { time: '00:18', description: 'CCTV shows a dark figure entering the archive wing.', person: 'Unknown', location: 'North Archive Hall' },
      { time: '00:21', description: 'A rolled case exits the service corridor.', person: 'Unknown', location: 'Service Corridor' },
      { time: '00:39', description: 'The alarm is restored and the area is sealed.', person: 'Security Team', location: 'Museum' },
    ],
    redHerrings: [
      'Priya Shah appears nervous and has a motive to hide personal scandal.',
      'Mara Quinn admitted to being in the archive in the hour before the theft.',
      'The gala event was chaotic enough to create confusion about who came and went.'
    ],
    solution: {
      culpritId: 'suspect_02',
      motive: 'Dorian wanted to sell confidential information contained in the ledger to a rival firm.',
      explanation: 'The security logs, witness statement, and CCTV timeline all point to Dorian. He had both access and a clear motive to exploit the stolen ledger. The muddy trail and the rolled case match his route through the service corridor, while his knowledge of the security system explains how the alarm was bypassed without detection.',
      supportingEvidenceIds: ['ev_01', 'ev_03', 'ev_05'],
    },
    reveal: {
      summary: 'The culprit was Dorian Vale, the security consultant who manipulated the system and staged a plausible story around the archive room.',
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
