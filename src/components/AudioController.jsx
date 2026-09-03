import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
export default function AudioController({ active }) {
  const audio = useRef(null); const [muted,setMuted]=useState(()=>localStorage.getItem('birthday-muted') === 'true');
  useEffect(()=>{ if (!audio.current) return; audio.current.volume=.18; audio.current.muted=muted; if(active && !muted) audio.current.play().catch(()=>{}); else audio.current.pause(); },[active,muted]);
  const toggle=()=>{setMuted(x=>{localStorage.setItem('birthday-muted',String(!x));return !x})};
  return <><audio autoPlay>
  <source
    src={`${import.meta.env.BASE_URL}audio/audio.mp3`}
    type="audio/mpeg"
  />
</audio><button className="sound" onClick={toggle} aria-label="Toggle sound">{muted?<VolumeX size={17}/>:<Volume2 size={17}/>}</button></>;
}
