import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, fetchCategories } from '../../redux/slices/postSlice';
import { AiOutlineCamera } from 'react-icons/ai';

const CreatePostForm = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.posts.categories);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category_id: '',
        image: null,
    });
    const [imageFileName, setImageFileName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [imageError, setImageError] = useState('');

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleChange = ({ target }) => {
        const { name, type, files, value } = target;
        if (type === 'file' && files[0]) {
            setFormData({ ...formData, [name]: files[0] });
            setImageFileName(files[0].name);
            setImageError('');
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const initialFormState = {
        title: '',
        content: '',
        category_id: '',
        image: null,
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setImageFileName('');
        setImageError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.image) {
            setImageError('Afbeelding is vereist.');
            return;
        }
        try {
            await dispatch(createPost(formData));
            setSuccessMessage('Post created successfully!');
            setTimeout(() => {
                resetForm();
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error creating post:', error.message);
            setSuccessMessage('');
        }
    };

    return (
        <>
            <h4 className='text-start fw-bold mt-1'>Plaats een blog bericht</h4>
            <form onSubmit={handleSubmit} className='d-flex flex-column text-start create-post-form'>
                <label>Berichtnaam</label>
                <input placeholder='Geen titel' type="text" name="title" value={formData.title} onChange={handleChange} required />
                <label>Category</label>
                <select name="category_id" value={formData.category_id} onChange={handleChange} required>
                    <option value="" disabled selected>
                        Geen categorie
                    </option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id} className={formData.category_id === category.id ? 'selected-option' : ''}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <label>Image</label>
                <div className='upload-image-input'>
                    <AiOutlineCamera  className='camera-icon'/>
                    <button className='button button-secondary' type="button" onClick={() => document.getElementById('image-upload').click()}>
                        Kies bestand
                    </button>
                    {imageFileName && <span className='mt-2 ms-2'>{imageFileName}</span>}
                </div>
                <span className='error-image-message'>{imageError}</span>
                <input id="image-upload" type="file" name="image" onChange={handleChange} accept="image/*" style={{ display: 'none' }} />
                <label>Bericht</label>
                <textarea name="content" value={formData.content} onChange={handleChange} required />
                {successMessage && <div className="success-message mt-4 text-center">{successMessage}</div>}
                <div className='text-center mt-4'>
                    <button className='button button-primary big' type="submit">Bericht aanmaken</button>
                </div>
            </form>
        </>
    );
};

export default CreatePostForm;
