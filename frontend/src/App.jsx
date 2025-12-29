import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout';


// 导入你的页面组件 (确保路径正确)
import Dashboard from './pages/Dashboard';
import LibraryCreatePage from './pages/LibraryCreatePage';
import LibraryDetailPage from './pages/LibraryDetailPage';


export default function App() { 
  return (
    <Routes>
      {/* 使用 Layout 作为父级路由 */}
      <Route element={<Layout />}> 
        {/* 2. 定义子路由：访问 /home 时渲染 Dashboard */}
        <Route path="home" element={<Dashboard />} />
        <Route path='library/create' element={<LibraryCreatePage/>} />
        <Route path='library/detail' element={<LibraryDetailPage/>} />

      </Route>
    </Routes>
  );
}