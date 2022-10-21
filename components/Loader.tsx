import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export const Loader = ({ animate }: { animate: boolean }) => {
  return (
    <motion.div
      initial={animate && { opacity: 0 }}
      animate={animate && { opacity: 1 }}
      transition={{ duration: 0.6, delay: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="flex flex-col justify-center items-center h-5/6"
    >
      <motion.div
        initial={{ x: -100, y: -5 }}
        animate={{ x: 100, y: -5 }}
        transition={{
          flip: Infinity,
          duration: 1,
        }}
        className="bg-slate-500"
        style={{
          height: 4,
          width: 120,
          marginBottom: 20,
        }}
      />
      <motion.div
        initial={{ x: -180, y: -5 }}
        animate={{ x: 180, y: -5 }}
        transition={{
          flip: Infinity,
          duration: 1.2,
        }}
        className="bg-slate-400"
        style={{
          height: 4,
          width: 140,
          marginBottom: 20,
        }}
      />
      <motion.div
        initial={{ x: -100, y: -5 }}
        animate={{ x: 100, y: -5 }}
        transition={{
          flip: Infinity,
          duration: 1.5,
        }}
        className="bg-slate-900"
        style={{
          height: 4,
          width: 160,
          marginBottom: 20,
        }}
      />
    </motion.div>
  );
};
