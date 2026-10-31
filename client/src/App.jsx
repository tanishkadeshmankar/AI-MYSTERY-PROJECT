import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  Eye,
  FileText,
  MapPin,
  Search,
  ShieldAlert,
  Sparkles,
  UserRound,
} from 'lucide-react';

const DEFAULT_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_PORTS = [5000, 5001, 5002, 5003, 5004, 5005, 5006, 5007, 5008, 5009, 5010, 5011, 5012];

const resolveApiBaseUrl = async () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    return envUrl.replace(/\/$/, '');
  }

  const browserHost = window.location.hostname;
  const isLocalHost = ['localhost', '127.0.0.1', '0.0.0.0', '::1'].includes(browserHost)
    || /^((192\.168\.)|(10\.)|(172\.(1[6-9]|2[0-9]|3[0-1])\.)|.+\.local$)/.test(browserHost);

  if (!isLocalHost) {
    throw new Error('API is not configured. Set VITE_API_URL to your deployed backend API URL and redeploy the frontend.');
  }

  const candidateHosts = Array.from(new Set([
    browserHost,
    'localhost',
    '127.0.0.1',
    '192.168.1.9',
  ]));

  for (const host of candidateHosts) {
    for (const port of API_PORTS) {
      try {
        const response = await axios.get(`http://${host}:${port}/api/health`, { timeout: 700 });
        if (response.data?.ok) {
          return `http://${host}:${port}/api`;
        }
      } catch {
        // keep checking the next port until one responds
      }
    }
  }

  return DEFAULT_API_URL;
};

const categories = [
  'Murder mystery',
  'Theft',
  'Missing object',
  'Cybercrime',
  'Suspicious incident',
  'Corporate mystery',
  'Custom mystery',
];

const demoScenarios = [
  'A priceless painting disappears from a gallery during a quiet evening fundraiser.',
  'A key witness disappears just before they can testify in a blackmail case.',
  'A startup founder claims their prototype was stolen before the investor meeting.',
];

const getStoredMystery = () => {
  try {
    const raw = localStorage.getItem('ai-mystery-room-current');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const saveMystery = (mystery) => {
  localStorage.setItem('ai-mystery-room-current', JSON.stringify(mystery));
};

const formatTime = (value) => {
  if (!value) return 'Unknown';

  try {
    return new Date(value).toLocaleString([], {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return value;
  }
};

function HomePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    scenario: demoScenarios[0],
    category: 'Theft',
    difficulty: 'Medium',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.scenario.trim()) {
      setError('Please describe the mystery scenario before generating a case.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const apiBaseUrl = await resolveApiBaseUrl();
      const response = await axios.post(`${apiBaseUrl}/mysteries/generate`, form);
      const mystery = response.data.mystery;
      saveMystery(mystery);
      navigate('/investigate');
    } catch (err) {
      const message = err?.response?.data?.message || err?.message || 'Mystery generation failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-100">
      <header className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between rounded-full border border-slate-700/80 bg-slate-900/60 px-5 py-3 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500/20 text-teal-300 shadow-glow">
              <ShieldAlert size={20} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Case File</p>
              <h1 className="text-lg font-semibold text-white">AI MYSTERY ROOM</h1>
            </div>
          </div>
          <Link
            to="/investigate"
            className="rounded-full border border-teal-400/60 bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-200 transition hover:border-teal-300 hover:bg-teal-500/20"
          >
            Open Active Case
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl space-y-16 px-4 pb-20 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-sm text-teal-200">
              <Sparkles size={16} />
              AI story generation
            </div>
            <div className="space-y-5">
              <h2 className="max-w-xl text-5xl font-black tracking-tight text-white sm:text-6xl">
                Every clue tells a story.
                <span className="block text-teal-300">Every story hides a secret.</span>
              </h2>
              <p className="max-w-xl text-lg text-slate-300">
                Build a fictional crime scene, investigate suspects, uncover misleading evidence,
                and decide who committed the crime before the reveal.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => document.getElementById('scenario-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-teal-300"
              >
                Start Investigating <ArrowRight size={16} />
              </button>
              <Link
                to="/investigate"
                className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-800/70 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
              >
                View Dashboard
              </Link>
            </div>

            <div className="grid max-w-lg gap-4 sm:grid-cols-3">
              {[
                { label: 'Mystery stories', value: 'AI generated' },
                { label: 'Evidence types', value: '5+' },
                { label: 'Reveal logic', value: 'Case-based' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-700 bg-slate-900/50 p-4">
                  <div className="text-sm text-slate-400">{item.label}</div>
                  <div className="mt-2 text-xl font-bold text-white">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div id="scenario-form" className="rounded-3xl border border-slate-700 bg-slate-900/60 p-6 shadow-glow backdrop-blur">
            <div className="mb-5 flex items-center gap-2 text-sm font-medium text-teal-200">
              <Search size={18} />
              Generate a New Mystery
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1 block text-sm text-slate-300">Case title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="The Vanishing Ledger"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition focus:border-teal-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-300">Scenario</label>
                <textarea
                  name="scenario"
                  value={form.scenario}
                  onChange={handleChange}
                  rows="5"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition focus:border-teal-400"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-slate-300">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition focus:border-teal-400"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm text-slate-300">Difficulty</label>
                  <select
                    name="difficulty"
                    value={form.difficulty}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-white outline-none transition focus:border-teal-400"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 px-4 py-3 text-base font-bold text-slate-950 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Generating mystery...' : 'Generate Mystery'}
              </button>
            </form>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">How it works</h3>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                icon: <BadgeCheck className="text-teal-300" size={18} />,
                title: 'Create a scenario',
                text: 'Add a mysterious event, location, or suspicious situation to spark the case.',
              },
              {
                icon: <Eye className="text-teal-300" size={18} />,
                title: 'Investigate the evidence',
                text: 'Review clues, suspects, messages, images, and timeline details to find the truth.',
              },
              {
                icon: <FileText className="text-teal-300" size={18} />,
                title: 'Make the accusation',
                text: 'Choose the culprit and uncover the reveal with full explanation and reasoning.',
              },
            ].map((step) => (
              <div key={step.title} className="rounded-2xl border border-slate-700 bg-slate-900/50 p-5">
                <div className="mb-4 inline-flex rounded-xl bg-slate-800 p-2">{step.icon}</div>
                <h4 className="mb-2 text-lg font-semibold text-white">{step.title}</h4>
                <p className="text-slate-300">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">Featured mystery examples</h3>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {demoScenarios.map((scenario) => (
              <button
                key={scenario}
                type="button"
                onClick={() => setForm((current) => ({ ...current, scenario }))}
                className="rounded-2xl border border-slate-700 bg-slate-900/50 p-5 text-left transition hover:border-teal-400/60 hover:bg-slate-800/80"
              >
                <p className="text-slate-200">{scenario}</p>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function InvestigationPage() {
  const navigate = useNavigate();
  const [mystery, setMystery] = useState(() => getStoredMystery());
  const [selectedSuspectId, setSelectedSuspectId] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [soundOn, setSoundOn] = useState(false);
  const audioContextRef = useRef(null);

  useEffect(() => {
    if (!mystery) {
      navigate('/');
    }
  }, [mystery, navigate]);

  useEffect(() => {
    if (!soundOn || !mystery) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const master = context.createGain();
    master.gain.value = 0.02;
    master.connect(context.destination);

    const oscA = context.createOscillator();
    const oscB = context.createOscillator();
    const lfo = context.createOscillator();
    const lfoGain = context.createGain();

    oscA.type = 'sine';
    oscA.frequency.value = mystery.soundMood === 'tech-hum' ? 170 : 120;
    oscB.type = 'triangle';
    oscB.frequency.value = mystery.soundMood === 'tech-hum' ? 220 : 180;

    lfo.type = 'sine';
    lfo.frequency.value = 0.15;
    lfoGain.gain.value = 18;

    oscA.connect(master);
    oscB.connect(master);
    lfo.connect(lfoGain);
    lfoGain.connect(oscA.frequency);
    lfoGain.connect(oscB.frequency);

    oscA.start();
    oscB.start();
    lfo.start();

    audioContextRef.current = { context, oscA, oscB, lfo, lfoGain, master };

    return () => {
      oscA.stop();
      oscB.stop();
      lfo.stop();
      master.disconnect();
      context.close();
      audioContextRef.current = null;
    };
  }, [soundOn, mystery]);

  if (!mystery) {
    return null;
  }

  const culprit = useMemo(
    () => mystery.suspects.find((suspect) => suspect.id === mystery.solution?.culpritId),
    [mystery]
  );

  const handleSubmitGuess = () => {
    if (!selectedSuspectId) {
      setError('Select a suspect before submitting your accusation.');
      return;
    }

    setResult({
      correct: selectedSuspectId === culprit.id,
      selected: mystery.suspects.find((suspect) => suspect.id === selectedSuspectId),
      culprit,
      explanation: mystery.solution?.explanation,
    });
    setError('');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-700 bg-slate-900/60 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-teal-300">Active investigation</p>
          <h2 className="mt-2 text-3xl font-black text-white">{mystery.title}</h2>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-slate-200">
          <span className="rounded-full border border-slate-600 bg-slate-800 px-3 py-1.5">{mystery.category}</span>
          <span className="rounded-full border border-slate-600 bg-slate-800 px-3 py-1.5">{mystery.difficulty}</span>
          <button
            type="button"
            onClick={() => setSoundOn((current) => !current)}
            className="rounded-full border border-slate-500 bg-slate-800 px-3 py-1.5 text-slate-100"
          >
            {soundOn ? 'Sound: On' : 'Sound: Off'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="rounded-full border border-teal-500/40 bg-teal-500/10 px-4 py-1.5 text-teal-200"
          >
            New Case
          </button>
        </div>
      </header>

      <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-8">
          <section className="rounded-3xl border border-slate-700 bg-slate-900/60 p-6">
            <div className="mb-4 flex items-center gap-3 text-teal-300">
              <FileText size={18} />
              <h3 className="text-xl font-semibold text-white">Case Overview</h3>
            </div>
            {mystery.sceneImage && (
              <img src={mystery.sceneImage} alt={mystery.title} className="mb-4 h-52 w-full rounded-2xl object-cover" />
            )}
            <p className="text-slate-200">{mystery.background}</p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-950/80 p-4">
                <div className="flex items-center gap-2 text-slate-400"><MapPin size={16} /> Location</div>
                <div className="mt-2 font-medium text-white">{mystery.location}</div>
              </div>
              <div className="rounded-2xl bg-slate-950/80 p-4">
                <div className="flex items-center gap-2 text-slate-400"><Clock3 size={16} /> Timeline</div>
                <div className="mt-2 font-medium text-white">{mystery.dateTime}</div>
              </div>
              <div className="rounded-2xl bg-slate-950/80 p-4">
                <div className="flex items-center gap-2 text-slate-400"><UserRound size={16} /> Suspects</div>
                <div className="mt-2 font-medium text-white">{mystery.suspects.length}</div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-700 bg-slate-900/60 p-6">
            <div className="mb-5 flex items-center gap-3 text-teal-300">
              <UserRound size={18} />
              <h3 className="text-xl font-semibold text-white">Suspects</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {mystery.suspects.map((suspect) => (
                <button
                  key={suspect.id}
                  type="button"
                  onClick={() => setSelectedSuspectId(suspect.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    selectedSuspectId === suspect.id
                      ? 'border-teal-400 bg-teal-500/10'
                      : 'border-slate-700 bg-slate-950/60 hover:border-slate-500'
                  }`}
                >
                  <img src={suspect.avatar} alt={suspect.name} className="h-28 w-full rounded-xl object-cover" />
                  <div className="mt-4">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-lg font-bold text-white">{suspect.name}</h4>
                      {selectedSuspectId === suspect.id && <BadgeCheck size={18} className="text-teal-300" />}
                    </div>
                    <p className="text-sm text-slate-300">{suspect.occupation}</p>
                    <p className="mt-2 text-sm text-slate-400">{suspect.relationship}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-700 bg-slate-900/60 p-6">
            <div className="mb-5 flex items-center gap-3 text-teal-300">
              <Eye size={18} />
              <h3 className="text-xl font-semibold text-white">Evidence Room</h3>
            </div>
            <div className="space-y-4">
              {mystery.evidence.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="rounded-full border border-slate-600 bg-slate-800 px-2.5 py-1 text-xs uppercase tracking-wider text-slate-300">
                      {item.type}
                    </span>
                    {item.timestamp && (
                      <span className="text-xs text-slate-400">{formatTime(item.timestamp)}</span>
                    )}
                  </div>

                  <h4 className="text-lg font-semibold text-white">{item.title || item.type}</h4>

                  {item.description && <p className="mt-2 text-slate-300">{item.description}</p>}
                  {item.content && <p className="mt-2 text-slate-300">{item.content}</p>}
                  {item.statement && <p className="mt-2 text-slate-300">{item.statement}</p>}
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.title} className="mt-3 h-52 w-full rounded-xl object-cover" />
                  )}
                  {item.observation && <p className="mt-2 text-slate-300">{item.observation}</p>}
                  {item.camera && <p className="mt-2 text-sm text-slate-400">Camera: {item.camera}</p>}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-700 bg-slate-900/60 p-6">
            <div className="mb-5 flex items-center gap-3 text-teal-300">
              <Clock3 size={18} />
              <h3 className="text-xl font-semibold text-white">Timeline</h3>
            </div>
            <div className="space-y-4">
              {mystery.timeline.map((event, index) => (
                <div key={`${event.time}-${index}`} className="flex gap-4 rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-sm font-bold text-teal-200">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">{event.time}</div>
                    <p className="mt-1 text-white">{event.description}</p>
                    <p className="text-sm text-slate-400">{event.person} · {event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-6">
            <h3 className="mb-4 text-xl font-semibold text-white">Final Accusation</h3>

            <div className="space-y-3">
              {mystery.suspects.map((suspect) => (
                <label
                  key={suspect.id}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3 ${
                    selectedSuspectId === suspect.id
                      ? 'border-teal-400 bg-teal-500/10'
                      : 'border-slate-700 bg-slate-950/60'
                  }`}
                >
                  <div>
                    <div className="font-medium text-white">{suspect.name}</div>
                    <div className="text-xs text-slate-400">{suspect.occupation}</div>
                  </div>
                  <input
                    type="radio"
                    name="suspect"
                    checked={selectedSuspectId === suspect.id}
                    onChange={() => setSelectedSuspectId(suspect.id)}
                    className="h-4 w-4 accent-teal-400"
                  />
                </label>
              ))}
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmitGuess}
              className="mt-5 w-full rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 px-4 py-3 font-bold text-slate-950 transition hover:opacity-95"
            >
              Submit Final Accusation
            </button>
          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-900/60 p-6">
            <h3 className="mb-4 text-xl font-semibold text-white">Investigation Notes</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {mystery.redHerrings?.map((item) => (
                <li key={item} className="rounded-xl border border-slate-700 bg-slate-950/60 p-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {result && (
            <div className={`rounded-3xl border p-6 ${result.correct ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-red-500/40 bg-red-500/10'}`}>
              <h3 className="mb-3 text-xl font-semibold text-white">
                {result.correct ? 'Case Solved' : 'The Reveal'}
              </h3>

              <p className="mb-2 text-slate-100">
                Your accusation: <span className="font-bold">{result.selected?.name || 'Unknown'}</span>
              </p>
              <p className="mb-2 text-slate-100">
                Actual culprit: <span className="font-bold">{result.culprit?.name}</span>
              </p>

              <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-950/60 p-4">
                <h4 className="font-semibold text-white">Reasoning</h4>
                <p className="mt-2 text-slate-200">{result.explanation}</p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/investigate" element={<InvestigationPage />} />
    </Routes>
  );
}

export default App;
