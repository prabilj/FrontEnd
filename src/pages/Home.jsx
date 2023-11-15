import React from 'react'
import Indian from "../components/Indian";
import Popular from "../components/Popular";
import { motion } from 'framer-motion';
import Category from '../components/Category';
import Chinees from '../components/Chinees';

function Home() {
    return (
        <motion.div
         animate={{opacity: 1}}
          initial={{opacity: 0}}
          exit={{opacity: 0}}
          transition={{duration: 0.5}}
        >
            <Category />
            <Indian />
            <Chinees/>
            {/* <Popular /> */}
        
        </motion.div>
    );
};

export default Home;