/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Log from './pages/Log';
import Post from './pages/Post';
import Work from './pages/Work';
import About from './pages/About';
import Spec from './pages/Spec';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="log" element={<Log />} />
          <Route path="log/:slug" element={<Post />} />
          <Route path="work" element={<Work />} />
          <Route path="about" element={<About />} />
          <Route path="spec" element={<Spec />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
