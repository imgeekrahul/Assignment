import React, { useState } from 'react'
import './MainContentBody.css'
import axios from 'axios'

const MainContent = () => {
    
    const [title, setTitle] = useState('')
    const [input, setInput] = useState('');
    const [tags, setTags] = useState([]);
    const [file, setFile] = useState();
    const [isKeyReleased, setIsKeyReleased] = useState(false);
    /* File Upload */


    const onChange = (e) => {
        const {value} = e.target;
        setInput(value)
    }
    
    const onKeyDown = (e) => {
        const {key} = e;
        const trimmedInput = input.trim();

        if(key === ',' && trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault();
            setTags(prevState => [...prevState, trimmedInput]);
            setInput('');
        }

        if(key === 'Backspace' && !input.length && tags.length) {
            e.preventDefault();
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();

            setTags(tagsCopy);
            setInput(poppedTag);
        }
        setIsKeyReleased(false);
    }

    const onKeyUp = () => {
        setIsKeyReleased(true);
    }

    const deleteTag = (index) => {
        setTags(prevState => prevState.filter((tag, i) => i !== index))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("document", file);
        formData.append("title", title);
        formData.append("tags", tags); 
        await axios.post("http://localhost:5050/api/add/moment", formData)
        .then(data => {
            alert("Your Moment has been saved with Title: "+data.data.title)
            setTitle('');
            setTags([]);
        })
        .catch(err => {
            console.log(err);
        })
    }
    
  return (
    <div>
        <div className='mainContentBody p-5'>
            <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
                <div className="form-box">
                    <div className='row'>
                        <label for="title" class="form-label">Title</label>
                        <br />
                        <input type='text' placeholder='Sample title' className='p-2 w-100' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='row mt-3'>
                        <label for="tags" class="form-label">Tags</label>
                        <div className='tagInput col'>
                            
                            <br />
                            {tags.map((tag, index) => (
                                <div className='tag'>
                                    {tag} 
                                    <button onClick={() => deleteTag(index)}>x</button>
                                    </div>
                                )
                            )}
                            <input value={input} placeholder='Enter Tag' onKeyDown={onKeyDown} onChange={onChange} onKeyUp={onKeyUp} />
                        </div>
                        <div className='col'>
                            <input type="file" name="document" onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                    </div>
                </div>
                <center className='mainContent'>
                    <button className='rounded-pill mt-4'>Submit</button>
                </center>
            </form>
        </div>
    </div>
  )
}

export default MainContent;