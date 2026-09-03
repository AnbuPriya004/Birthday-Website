import { motion } from 'framer-motion';

export default function HeartProgress({ unlocked, total = 5, final }) {
  return <div className={'heart-progress' + (final ? ' merged' : '')} aria-label={`${unlocked} of ${total} chapters complete`}>
    {Array.from({ length: total }, (_, index) => <motion.span key={index} animate={index < unlocked ? { scale: [1, 1.25, 1], color: '#e86b72' } : {}} transition={{ delay: index * .08 }}>{index < unlocked ? '♥' : '♡'}</motion.span>)}
  </div>;
}
