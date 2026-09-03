import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, CalendarHeart, PartyPopper, Sparkles } from 'lucide-react';
import { birthdayData as data } from './data/birthdayData';
import HeartProgress from './components/HeartProgress';
import PhotoReveal from './components/PhotoReveal';
import Envelope from './components/Envelope';
import AudioController from './components/AudioController';
import './verify.css';
import './childhood.css';
import './happy-memory.css';

const chapters = [
  { key: 'childhood', number: 'I', title: 'The Little Boy', pre: ['We did not know it then...', '...but these little moments would become memories we would carry forever.'], theme: 'childhood' },
  { key: 'growingUp', number: 'II', title: 'Growing Up', pre: ['Somewhere along the way...', '...you became the person everyone could be proud of.'], theme: 'growing' },
  { key: 'teenage', number: 'III', title: 'The Chaos Years', pre: ['Okay... enough bullying.', 'Because somewhere in all those silly pictures...', '...he was growing up.'], theme: 'teenage' },
  { key: 'marriage', number: 'IV', title: 'A New Chapter', pre: ['And then...', 'A new chapter began.', 'The little boy from the beginning had become this person.'], theme: 'marriage' },
  { key: 'emotional', number: 'V', title: 'Memories of Brother & Sister', pre: ['Everyone sees the person you have become.', 'The brother. The son. The husband.', 'But I still remember the boy I grew up with.'], theme: 'emotional' },
  { key: 'hisMemories', number: 'VI', title: 'His Memories', pre: ['Ten more little moments.', 'Ten more reminders of the life you have lived and the joy you brought with you.'], theme: 'his-memories' }
];

function Intro({ onEnter }) {
  const slides = [
    { kicker: 'HELLO, YOU', title: 'Are you ready for a little surprise?', text: 'There is a birthday story waiting just for you.' },
    { kicker: 'SPOILER ALERT', title: 'Yes, you are the birthday boy.', text: 'And someone has collected a few memories to prove it.' },
    { kicker: 'ONE MORE THING', title: 'A small quiz first...', text: 'Only the real brother of Monu can unlock the next page.' }
  ];
  const [slide, setSlide] = useState(0);
  useEffect(() => { const timer = setTimeout(() => slide < slides.length - 1 ? setSlide(slide + 1) : onEnter(), 3200); return () => clearTimeout(timer); }, [slide, onEnter]);
  return <main className="welcome screen">
    <div className="birthday-confetti" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i}/>)}</div>
    <div className="welcome-orbit orbit-one"/><div className="welcome-orbit orbit-two"/>
    <div className="slide-counter">{slides.map((item, index) => <span key={item.kicker} className={index === slide ? 'active' : ''}/>)}</div>
    <AnimatePresence mode="wait"><motion.section className="welcome-slide" key={slide} initial={{ opacity: 0, x: 90, rotate: 3 }} animate={{ opacity: 1, x: 0, rotate: 0 }} exit={{ opacity: 0, x: -90, rotate: -3 }} transition={{ type: 'spring', stiffness: 115, damping: 17 }}>
      <Sparkles className="slide-sparkle" size={28}/><span className="eyebrow">{slides[slide].kicker}</span><h1>{slides[slide].title}</h1><p>{slides[slide].text}</p>
      <button className="skip-intro" onClick={onEnter}>SKIP <ArrowRight size={14}/></button>
    </motion.section></AnimatePresence>
  </main>;
}

function Verify({ onVerified }) {
  const [form, setForm] = useState({ dob: '', age: '', secret: '' });
  const [state, setState] = useState('ready');
  const quotes = ['You are not just the birthday boy.', 'You are Monu\'s brother - the one who has been there through every silly memory.', 'Now come on... your birthday story is ready.'];
  const check = event => { event.preventDefault(); const brother = data.brother; const valid = form.dob === brother.dob && form.age === brother.age && form.secret.trim().toLowerCase() === data.verification.secretAnswer.toLowerCase(); if (valid) setState('success'); else { setState('error'); setTimeout(() => setState('ready'), 1000); } };
  return <main className="verify screen">{state === 'success' && <Fireworks/>}<div className="birthday-confetti" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i}/>)}</div>
    <motion.div className={`verify-card ${state === 'error' ? 'shake' : ''}`} initial={{ opacity: 0, y: 28, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 150, damping: 18 }}>
      {state !== 'success' ? <><div className="date-icon"><CalendarHeart size={26}/></div><span className="eyebrow">THE BROTHER CHECK</span><h1>Prove it is really you.</h1><p>Three tiny answers, then the surprise is all yours.</p>
        <form onSubmit={check}><label>DATE OF BIRTH<input autoFocus required type="date" value={form.dob} onChange={event => { setForm({ ...form, dob: event.target.value }); setState('ready'); }}/></label><label>YOUR AGE<input required type="number" min="1" value={form.age} onChange={event => setForm({ ...form, age: event.target.value })}/></label><label>{data.verification.secretQuestion}<input required type="text" value={form.secret} onChange={event => setForm({ ...form, secret: event.target.value })}/></label><button><Sparkles size={15}/> UNLOCK THE SURPRISE</button></form>
        {state === 'error' && <p className="error">Close, but only the real brother of Monu knows all three! Try again.</p>}<small>Take your time - Monu is watching. :)</small>
      </> : <motion.div className="quote-reveal" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }}><PartyPopper className="party-icon" size={34}/><span className="eyebrow">ACCESS GRANTED</span><h1>It is you!</h1><div className="quotes">{quotes.map((quote, i) => <motion.p key={quote} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .2 + i * .25 }}>{quote}</motion.p>)}</div><button onClick={onVerified}>BEGIN THE STORY <ArrowRight size={16}/></button></motion.div>}
    </motion.div></main>;
}

function ChildhoodUnlock({ onUnlock }) {
  const [answer, setAnswer] = useState(''); const [state, setState] = useState('ready');
  const unlock = event => { event.preventDefault(); if (answer.trim().toLowerCase() === data.childhoodUnlock.answer.toLowerCase()) setState('success'); else { setState('error'); setTimeout(() => setState('ready'), 1000); } };
  return <main className="childhood-unlock screen">{state === 'success' && <Fireworks/>}<motion.section className={`unlock-card ${state === 'error' ? 'shake' : ''}`} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>{state === 'success' ? <motion.div className="gate-success" initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }}><PartyPopper className="party-icon" size={38}/><span className="eyebrow">CORRECT! THE ALBUM IS OPEN</span><h1>A beautiful memory begins.</h1><div className="quotes"><motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>“Your partner in crime remembered you.”</motion.p><motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>“Every great birthday story needs a little mischief.”</motion.p></div><button onClick={onUnlock}>REVEAL CHILDHOOD MEMORIES <ArrowRight size={16}/></button></motion.div> : <><span className="eyebrow">CHAPTER I IS LOCKED</span><h1>Childhood memories are hiding inside.</h1><p>Answer one last question to open the album.</p><form onSubmit={unlock}><label>{data.childhoodUnlock.question}<input autoFocus required value={answer} onChange={event => { setAnswer(event.target.value); setState('ready'); }}/></label><button><Sparkles size={15}/> OPEN THE ALBUM</button></form>{state === 'error' && <p className="error">That is not quite right. Think of your thangachi!</p>}</>}</motion.section></main>;
}

function Fireworks() {
  return <div className="fireworks" aria-hidden="true">{Array.from({ length: 22 }, (_, index) => <i key={index} style={{ '--i': index, '--x': `${(index * 37) % 94 + 3}%`, '--y': `${(index * 29) % 72 + 12}%` }}/>)}</div>;
}

function ChapterUnlock({ chapter, onUnlock }) {
  const [answer, setAnswer] = useState('');
  const [state, setState] = useState('ready');
  const lock = data.chapterUnlocks[chapter.key];
  const submit = event => {
    event.preventDefault();
    if (answer.trim().toLowerCase() === lock.answer.trim().toLowerCase()) setState('success');
    else { setState('error'); setTimeout(() => setState('ready'), 1000); }
  };
  return <main className={`chapter-unlock screen unlock-${chapter.theme}`}>
    {state === 'success' && <Fireworks/>}
    <motion.section className={`chapter-unlock-card ${state === 'error' ? 'shake' : ''}`} initial={{ opacity: 0, y: 28, scale: .94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 130, damping: 16 }}>
      {state === 'success' ? <motion.div initial={{ opacity: 0, scale: .75 }} animate={{ opacity: 1, scale: 1 }}><PartyPopper className="party-icon" size={38}/><span className="eyebrow">CORRECT! CHAPTER UNLOCKED</span><h1>{lock.successTitle}</h1><p className="funny-quote">“{lock.quote}”</p><button onClick={onUnlock}>REVEAL {chapter.title.toUpperCase()} <ArrowRight size={16}/></button></motion.div> : <><Sparkles className="unlock-sparkle" size={27}/><span className="eyebrow">CHAPTER {chapter.number} IS WAITING</span><h1>One little question first.</h1><p>{lock.intro}</p><form onSubmit={submit}><label>{lock.question}<input autoFocus required type={lock.type || 'text'} value={answer} onChange={event => { setAnswer(event.target.value); setState('ready'); }}/></label><button><Sparkles size={15}/> UNLOCK THE MEMORY</button></form>{state === 'error' && <p className="error">Not quite! The birthday boy should know this one. Try again.</p>}</>}
    </motion.section>
  </main>;
}

function ChildhoodPhotoShowcase({ items }) {
  const [active, setActive] = useState(0); const [revealed, setRevealed] = useState(false);
  useEffect(() => { const timer = setInterval(() => { setActive(current => (current + 1) % items.length); setRevealed(false); }, 5500); return () => clearInterval(timer); }, [items.length]);
  const item = items[active];
  const choose = index => { setActive(index); setRevealed(false); };
  return <section className="happy-memory-showcase"><div className="memory-count">MEMORY {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</div><AnimatePresence mode="wait"><motion.figure key={item.image} className={`happy-memory-card ${revealed ? 'revealed' : ''}`} initial={{ opacity: 0, scale: .72, rotate: active % 2 ? 7 : -7, y: 50 }} animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }} exit={{ opacity: 0, scale: 1.12, rotate: active % 2 ? -8 : 8, y: -40 }} transition={{ type: 'spring', stiffness: 100, damping: 14 }} onClick={() => setRevealed(true)} tabIndex="0" role="button" onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') setRevealed(true); }}><img src={item.image} alt={item.caption}/><div className="happy-photo-cover"><span>{revealed ? item.caption : 'TAP TO REVEAL THIS MEMORY'}</span></div></motion.figure></AnimatePresence><div className="memory-switcher">{items.map((memory, index) => <button key={memory.image} className={index === active ? 'active' : ''} onClick={() => choose(index)} aria-label={`Show memory ${index + 1}`}>{index + 1}</button>)}</div></section>;
}

function Chapter({ chapter, index, onNext }) { const isLast = index === chapters.length - 1; return <main className={`chapter ${chapter.theme}`}><header className="chapter-head"><span>{chapter.number} / {chapters.length}</span><h1>{chapter.title}</h1><HeartProgress unlocked={index} total={chapters.length}/></header>{index === 4 && <div className="silence">take a breath.</div>}{index === 0 ? <ChildhoodPhotoShowcase items={data.levels[chapter.key]}/> : <section className={`photos ${chapter.key === 'hisMemories' ? 'memory-gallery' : ''}`}>{data.levels[chapter.key].map((item, i) => <PhotoReveal key={i} item={item} index={i} theme={chapter.theme}/>)}</section>}<section className="chapter-closing">{chapter.pre.map((text, i) => <motion.p key={text} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .18 }}>{text}</motion.p>)}<button className="next" onClick={onNext}>{isLast ? 'A LETTER FOR YOU' : 'OPEN NEXT CHAPTER'} <ArrowRight size={17}/></button></section></main> }
function Finale({ onRestart }) { const [reveal, setReveal] = useState(false); return <main className="finale"><div className="finale-lights" aria-hidden="true"/><div className="finale-balloons" aria-hidden="true"><i/><i/><i/><i/><i/></div><div className="finale-confetti" aria-hidden="true">{Array.from({ length: 28 }, (_, index) => <i key={index} style={{ '--n': index }}/>)}</div><HeartProgress unlocked={chapters.length} total={chapters.length} final/><motion.div className="final-heart" onClick={() => setReveal(true)} animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 1.7 }}>♥</motion.div>{reveal && <motion.div className="birthday-reveal" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}><div className="cake"><i/><i/><i/><span>🎂</span></div><h1>Happy Birthday, {data.brother.name} ♥</h1>{data.finalMessages.map(message => <p key={message}>{message}</p>)}<h2>OUR STORY CONTINUES... ♥</h2><button className="quiet-button" onClick={onRestart}>RELIVE THE STORY</button></motion.div>}</main> }
export default function App() { const [stage, setStage] = useState('intro'); const [level, setLevel] = useState(0); const proceed = () => { if (level < chapters.length - 1) setStage('chapter-unlock'); else setStage('letter'); }; const revealChapter = () => { setLevel(level + 1); setStage('story'); window.scrollTo({ top: 0, behavior: 'smooth' }); }; return <><AudioController active={stage === 'letter' || stage === 'final'}/><AnimatePresence mode="wait">{stage === 'intro' && <motion.div key="intro" exit={{ opacity: 0 }}><Intro onEnter={() => setStage('verify')}/></motion.div>}{stage === 'verify' && <motion.div key="verify" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Verify onVerified={() => setStage('childhood-unlock')}/></motion.div>}{stage === 'childhood-unlock' && <motion.div key="childhood-unlock" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><ChildhoodUnlock onUnlock={() => setStage('story')}/></motion.div>}{stage === 'chapter-unlock' && <motion.div key={`unlock${level + 1}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}><ChapterUnlock chapter={chapters[level + 1]} onUnlock={revealChapter}/></motion.div>}{stage === 'story' && <motion.div key={`chapter${level}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Chapter chapter={chapters[level]} index={level} onNext={proceed}/></motion.div>}{stage === 'letter' && <motion.main className="letter-chapter" key="letter" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><HeartProgress unlocked={chapters.length} total={chapters.length}/><h1>The things that stay with us.</h1><Envelope letter={data.finalLetter} onComplete={() => setStage('final')}/></motion.main>}{stage === 'final' && <motion.div key="final" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Finale onRestart={() => { setLevel(0); setStage('intro'); }}/></motion.div>}</AnimatePresence></>; }
