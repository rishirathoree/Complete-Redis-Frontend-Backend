import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './configs/route.config';
const Login = lazy(() => import('./components/pages/login/Login'))
const Signup = lazy(() => import('./components/pages/signup/Signup'))
import Home from './components/pages/home/Home';
import SuspenseLoader from './components/common/Loaders/Suspense'
import CreatePatientModal from './components/common/Modals/CreatePatientModal';
import CreateCategories from './components/common/Modals/CreateCategories';
import CreateSubCategories from './components/common/Modals/CreateSubCategories';
import Management from './components/pages/managements/Management';
import CreateManagements from './components/common/Modals/CreateManagements';
const Pets = lazy(() => import("./components/pages/pets/Pets"))
const Breeds = lazy(() => import("./components/pages/breeds/Breeds"))
const Brands = lazy(() => import("./components/pages/brands/Brands"))
const Categories = lazy(() => import("./components/pages/categories/Categories"))
const Subcategories = lazy(() => import("./components/pages/subcategories/Subcategories"))
const AddProducts = lazy(() => import("./components/pages/createproduct/CreateProducts"))
const Products = lazy(() => import("./components/pages/products/Products"))

const App = () => {
  
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <CreatePatientModal />
      <CreateCategories />
      <CreateManagements />
      <CreateSubCategories />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<PrivateRoutes />}>
          <Route path='/' element={<Home />} />
          <Route path='/pets' element={<Pets />} />
          <Route path='/addproducts' element={<AddProducts />} />
          <Route path='/breeds' element={<Breeds />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/subcategories' element={<Subcategories />} />
          <Route path='/products' element={<Products />} />
          <Route path='/brands' element={<Brands />} />
          <Route path='/management' element={<Management />} />
          <Route path='*' element={<Breeds />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
