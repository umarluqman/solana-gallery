import { animate, motion } from "framer-motion";
import Link from "next/link";
import React from "react";

interface IBreadcrumbs {
  isCurrentPage: boolean;
  href?: string;
  title: string;
}

interface IProps {
  breadcrumbs: IBreadcrumbs[];
  animate?: boolean;
}

const NavIcon = () => {
  return (
    <svg
      className="w-6 h-6 text-gray-400"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clip-rule="evenodd"
      ></path>
    </svg>
  );
};

export const Breadcrumbs = ({ breadcrumbs, animate }: IProps) => {
  return (
    <motion.nav
      initial={animate && { opacity: 0 }}
      animate={animate && { opacity: 1 }}
      transition={{ duration: 0.6, delay: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="flex mt-12 px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {breadcrumbs.map((breadcrumb, index) => {
          return breadcrumb.href && !breadcrumb.isCurrentPage ? (
            <li key={breadcrumb.title}>
              <div className="flex items-center">
                {index !== 0 && <NavIcon />}
                <Link href={breadcrumb.href}>
                  <a
                    href="#"
                    className={
                      "ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
                    }
                  >
                    {breadcrumb.title}
                  </a>
                </Link>
              </div>
            </li>
          ) : (
            <li key={breadcrumb.title} aria-current="page">
              <div className="flex items-center">
                {index !== 0 && <NavIcon />}
                <span
                  className={
                    "ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                  }
                >
                  {breadcrumb.title}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </motion.nav>
  );
};
