import { FC } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  letter: string;
};

export const LetterCard: FC<Props> = ({ letter }) => (
  <Link
    to={`/${letter}`}
    className="group relative bg-white rounded-2xl border-2 border-gray-200 p-6 text-center hover:border-blue-300 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
  >
    <div className="text-4xl md:text-5xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-2">
      {letter.toUpperCase()}
    </div>

    <div className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors duration-300">
      Huruf {letter.toUpperCase()}
    </div>

    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
  </Link>
);
