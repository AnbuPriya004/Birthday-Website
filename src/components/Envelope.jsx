import { motion } from 'framer-motion';
import { useState } from 'react';
export default function Envelope({ letter, onComplete }) {
 const [open,setOpen]=useState(false);
 return <div className={'letter-area '+(open?'opened':'')}>
   <motion.div className="envelope" onClick={()=>setOpen(true)} whileTap={{scale:.98}}><div className="flap"/><div className="seal">♥</div><p>{open?'':'There is something I don’t say very often.'}</p></motion.div>
   {!open && <button className="quiet-button" onClick={()=>setOpen(true)}>OPEN LETTER</button>}
   {open && <motion.article className="letter" initial={{opacity:0,y:70,rotateX:-30}} animate={{opacity:1,y:0,rotateX:0}} transition={{duration:.9}}><div>{letter.split('\n').map((line,i)=><p key={i}>{line || '\u00a0'}</p>)}</div><button className="quiet-button" onClick={onComplete}>ONE LAST THING</button></motion.article>}
 </div>
}
