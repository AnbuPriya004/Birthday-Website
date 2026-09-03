import { motion } from 'framer-motion';
import { useState } from 'react';
export default function PhotoReveal({ item, index, theme }) {
 const [missing,setMissing]=useState(false);
 const [revealed,setRevealed]=useState(false);
 return <motion.figure className={`memory-card ${theme || ''} ${revealed ? 'revealed' : 'locked-photo'}`} initial={{opacity:0,y:90,scale:.72,rotate:index%2?10:-10}} whileInView={{opacity:1,y:0,scale:1,rotate:index%2?2:-2}} viewport={{once:true,amount:.12}} transition={{type:'spring',stiffness:95,damping:14,delay:index*.2}} whileHover={{y:-10,rotate:index%2?3:-3,transition:{duration:.2}}} onClick={()=>setRevealed(true)} tabIndex="0" role="button" onKeyDown={event=>{if(event.key==='Enter'||event.key===' ')setRevealed(true)}} aria-label={revealed ? item.caption : 'Reveal this childhood memory'}>
   {!missing && <img src={item.image} alt={item.caption} onError={()=>setMissing(true)}/>}<div className={'photo-fallback '+(!missing?'hidden':'')}>Add your photo</div>{!revealed&&<div className="photo-lock">TAP TO REVEAL</div>}<figcaption>{revealed ? item.caption : 'A memory is waiting...'}</figcaption>
 </motion.figure>
}
