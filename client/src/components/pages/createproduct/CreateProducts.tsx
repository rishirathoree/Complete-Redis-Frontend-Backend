import React, { useEffect, useState } from 'react';
import { Input } from '../../common/TextInputs/TextInput';
import { Inbox, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../stores/store';
import { GetSubcategories } from '../../../stores/slices/subcategories.slice';
import { GetCategories } from '../../../stores/slices/categories.slice';
import { GetPets } from '../../../stores/slices/pet.slice';
import { GetBreeds } from '../../../stores/slices/breeds.slice';
import { GetBrands } from '../../../stores/slices/brands.slice';
import { CreateProductsHandler, GetProducts, resetCreate } from '../../../stores/slices/products.slice';
import { useNavigate } from 'react-router-dom';

const CreateProducts: React.FC = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(GetSubcategories())
        dispatch(GetCategories())
        dispatch(GetBreeds())
        dispatch(GetPets())
        dispatch(GetBrands())
    }, [dispatch])

    const GetCategoriesDatas = useSelector((state: RootState) => state.categories.categories)
    const GetSubCategories = useSelector((state: RootState) => state.subcategories.subcategories)
    const GetPetsData = useSelector((state: RootState) => state.pets.pets)
    const GetBreedsData = useSelector((state: RootState) => state.breeds.breeds)
    const GetBrandsData = useSelector((state: RootState) => state.brands.brands)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [options, setOptions] = useState([]);
    const [variantOptions, setVariantOptions] = useState([]);
    const [images, setImages] = useState<File[]>([]);
    const [categoriesIds, setCategoriesIds] = useState([])
    const [brandIds, setBrandIds] = useState<string[]>([])
    const [petIds, setPetIds] = useState([])
    const [subcategoriesIds, setSubcategoriesIds] = useState([])
    const [breedIds, setBreedIds] = useState([])

    const addMoreSpecificOptions = async () => {
        setOptions([...options, ''])
    }

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setImages((prevImages) => [...prevImages, ...files]);
        }
    };

    const CreateProductController = async () => {
        const productData = {
            title,
            description,
            images,
            categoryIds: categoriesIds,
            brandIds,
            petIds,
            subcategoryIds: subcategoriesIds,
            breedIds,
            options,
        }
        const formdata = new FormData();
        for (const [key, value] of Object.entries(productData)) {
            if (key === 'images') {
                value.forEach(image => {
                    formdata.append('images', image);
                });
            } else if (Array.isArray(value)) {
                value.forEach((id) => {
                    formdata.append(`${key}[]`, id);
                });
            } else {
                formdata.append(key, value);
            }
        }
        await dispatch(CreateProductsHandler(formdata))
    }
    const CreateProductsActions = useSelector((state: RootState) => state.products.create)

    useEffect(()=>{
        if(CreateProductsActions.success){
            navigate('/products')
            dispatch(resetCreate())
        }
    },[CreateProductsActions.success])
    

    return (
        <div className='flex items-center justify-center w-full'>
            <div className='grid grid-cols-3 gap w-full'>
                {/* left side back */}
                <div className='col-span-2 p-4 space-y-4'>
                    {/* first left */}
                    <div className='p-4 ring-[1px] ring-black/5 rounded-lg space-y-4'>
                        <label htmlFor="titleProducts" className='space-y-2 block'>
                            <p className='font-medium text-gray-700 text-xs'>Title</p>
                            <Input
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                                placeholder='Enter products title here...' />
                        </label>
                        <label htmlFor="titleProducts" className='space-y-2 block'>
                            <p className='font-medium text-gray-700 text-xs'>Description</p>
                            <Input
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                                placeholder='Enter products description here...' />
                        </label>
                        <label htmlFor="titleImages" className='space-y-2 block'>
                            <p className='font-medium text-gray-700 text-xs'>Media</p>
                            <span className='flex flex-col space-y-4 items-center justify-center border-dashed border p-12 rounded-lg'>
                                <Inbox strokeWidth={1} size={30} />
                                <p className='font-medium text-gray-700 text-xs'>Upload Products Images Here...</p>
                            </span>
                            <Input multiple onChange={handleImagesChange} id='titleImages' type='file' className='hidden' placeholder='Enter products title here...' />
                        </label>
                        <div className='flex flex-wrap gap-4 pt-2 items-center'>
                            {images.map((item, idx) => {
                                return (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 100 }}
                                        key={idx} className='h-20 w-20 oveflow-hidden relative rounded-lg bg-gray-100 group'>
                                        <span className='w-full h-full flex items-center justify-center text-white cursor-pointer bg-black/20 top-0 group-hover:visible invisible left-0 absolute'>
                                            <X onClick={() => {
                                                setImages((prevImages) => prevImages.filter((_, i) => i !== idx));
                                            }} />
                                        </span>
                                        <img src={URL.createObjectURL(item)} className='w-full h-full' alt="" />
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    {/* second left */}
                    <div className='p-4 ring-[1px] ring-black/5 rounded-lg space-y-4'>
                        <div className='flex flex-col gap-4'>
                            <span className='flex items-center justify-between w-full'>
                                <p className='p-0 m-0 font-medium text-gray-700 text-xs'>Specifications</p>
                                <motion.span onClick={addMoreSpecificOptions} whileTap={{ scale: 1.1 }} className='font-medium text-gray-700 text-xs cursor-pointer p-0 m-0'>Add Specification Options</motion.span>
                            </span>
                            <motion.div
                                animate={{ height: "auto" }}
                                className='space-y-3' layout>
                                {
                                    options.map((opt, idx) => {
                                        return (
                                            <motion.div className="grow flex items-center gap-2" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                                                <Input
                                                    onChange={(e) => {
                                                        setOptions((prevOptions) => {
                                                            const newOptions = [...prevOptions];
                                                            newOptions[idx] = e.target.value;
                                                            return newOptions;
                                                        });
                                                    }}
                                                    value={options[idx]}
                                                    placeholder='Enter option here...' />
                                                <X
                                                    onClick={() => {
                                                        setOptions((prevOptions) => prevOptions.filter((_, i) => i !== idx));
                                                    }}
                                                    size={30} strokeWidth={1} className=" h-full rounded" />
                                            </motion.div>
                                        )
                                    })
                                }
                            </motion.div>
                        </div>
                    </div>

                    {/* second left */}
                    <div className='p-4 ring-[1px] ring-black/5 rounded-lg space-y-4'>
                        <div className='grid grid-cols-2 gap-2'>
                            <label htmlFor="titleProducts" className='space-y-2 block'>
                                <p className='font-medium text-gray-700 text-xs'>Pricing</p>
                                <Input placeholder='Enter products title here...' />
                            </label>
                            <label htmlFor="titleProducts" className='space-y-2 block'>
                                <p className='font-medium text-gray-700 text-xs'>Compare at price</p>
                                <Input placeholder='Enter products description here...' />
                            </label>
                            <label htmlFor="titleProducts" className='space-y-2 block'>
                                <p className='font-medium text-gray-700 text-xs'>Price per items</p>
                                <Input placeholder='Enter products description here...' />
                            </label>
                        </div>
                    </div>

                    {/* variants */}
                    <div className='p-4 ring-[1px] ring-black/5 rounded-lg space-x-4'>
                        <p onClick={CreateProductController} className='text-xs ring-[1px] ring-black/5 px-2 py-2 cursor-pointer rounded-lg inline-block'>Create Your New Product</p>
                        <p onClick={CreateProductController} className='text-xs ring-[1px] ring-black/5 px-2 py-2 cursor-pointer rounded-lg bg-red-500 text-white inline-block'>Delete Products</p>
                    </div>

                </div>

                {/* right side row */}
                <div className='p-4 space-y-4'>
                    {/* first box right side */}

                    <div className='p-4 ring-[1px] flex flex-wrap ring-black/5 rounded-lg space-y-4'>
                        <p className='font-medium text-gray-700 text-xs'>Select Pets</p>
                        <div className='gap-3 flex flex-wrap'>
                            {GetPetsData.data.map((pets, idx) => {
                                return (
                                    <span
                                        onClick={() => {
                                            if (petIds.includes(pets.id)) {
                                                setPetIds(petIds.filter(id => id !== pets.id));
                                            }
                                            else {
                                                setPetIds([...petIds, pets.id]);
                                            }
                                        }}
                                        key={idx} className={`text-xs ring-[1px] ring-black/5 px-2 py-1 cursor-pointer rounded-lg ${petIds.includes(pets.id) ? 'bg-black/70 text-white' : ""}`}>
                                        {pets.name}
                                    </span>
                                )
                            })}
                        </div>
                    </div>

                    <div className='p-4 ring-[1px] flex flex-wrap ring-black/5 rounded-lg space-y-4'>
                        <p className='font-medium text-gray-700 text-xs'>Select Breeds</p>
                        <div className='gap-3 flex flex-wrap'>
                            {GetBreedsData.data.map((breed, idx) => {
                                return (
                                    <span
                                        onClick={() => {
                                            if (breedIds.includes(breed.id)) {
                                                setBreedIds(breedIds.filter(id => id !== breed.id));
                                            }
                                            else {
                                                setBreedIds([...breedIds, breed.id]);
                                            }
                                        }}
                                        key={idx} className={`text-xs ring-[1px] ring-black/5 px-2 py-1 cursor-pointer rounded-lg ${breedIds.includes(breed.id) ? 'bg-black/70 text-white' : ""}`}>
                                        {breed.name}
                                    </span>
                                )
                            })}
                        </div>
                    </div>

                    <div className='p-4 ring-[1px] flex flex-wrap ring-black/5 rounded-lg space-y-4'>
                        <p className='font-medium text-gray-700 text-xs'>Select Brands</p>
                        <div className='gap-3 flex flex-wrap'>
                            {GetBrandsData.data?.map((brands, idx) => {
                                return (
                                    <span
                                        onClick={() => {
                                            if (brandIds.includes(brands.id)) {
                                                setBrandIds(brandIds.filter(id => id !== brands.id));
                                            }
                                            else {
                                                setBrandIds([...brandIds, brands.id]);
                                            }
                                        }}
                                        key={idx} className={`text-xs ring-[1px] ring-black/5 px-2 py-1 cursor-pointer rounded-lg ${brandIds.includes(brands.id) ? 'bg-black/70 text-white' : ""}`}>
                                        {brands.name}
                                    </span>
                                )
                            })}
                        </div>
                    </div>

                    <div className='p-4 ring-[1px] flex flex-wrap ring-black/5 rounded-lg space-y-4'>
                        <p className='font-medium text-gray-700 text-xs'>Select Categories</p>
                        <div className='gap-3 flex flex-wrap'>
                            {GetCategoriesDatas.data.map((cat, idx) => {
                                return (
                                    <span
                                        onClick={() => {
                                            if (categoriesIds.includes(cat.id)) {
                                                setCategoriesIds(categoriesIds.filter(id => id !== cat.id));
                                            }
                                            else {
                                                setCategoriesIds([...categoriesIds, cat.id]);
                                            }
                                        }}
                                        key={idx} className={`text-xs ring-[1px] ring-black/5 px-2 py-1 cursor-pointer rounded-lg ${categoriesIds.includes(cat.id) ? 'bg-black/70 text-white' : ""}`}>
                                        {cat.name}
                                    </span>
                                )
                            })}
                        </div>
                    </div>

                    <div className='p-4 ring-[1px] flex flex-wrap ring-black/5 rounded-lg space-y-4'>
                        <p className='font-medium text-gray-700 text-xs'>Select Sub Categories</p>
                        <div className='gap-3 flex flex-wrap'>
                            {GetSubCategories.data.map((subcat, idx) => {
                                return (
                                    <span
                                        onClick={() => {
                                            if (subcategoriesIds.includes(subcat.id)) {
                                                setSubcategoriesIds(subcategoriesIds.filter(id => id !== subcat.id));
                                            }
                                            else {
                                                setSubcategoriesIds([...subcategoriesIds, subcat.id]);
                                            }
                                        }}
                                        key={idx} className={`text-xs ring-[1px] ring-black/5 px-2 py-1 cursor-pointer rounded-lg ${subcategoriesIds.includes(subcat.id) ? 'bg-black/70 text-white' : ""}`}>
                                        {subcat.name}
                                    </span>
                                )
                            })}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default CreateProducts;