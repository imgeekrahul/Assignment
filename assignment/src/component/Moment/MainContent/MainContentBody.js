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
    const [progress, setProgress] = useState({started: false, pc:0})
    const [msg, setMsg] = useState(null);


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
        console.log(file);
        formData.append("document", file);
        formData.append("title", title);
        formData.append("tags", tags);

        setMsg("Uploading...")
        setProgress(prevState => {
            return {...prevState, started: true}
        })

        // 
        await axios.post("http://localhost:5050/api/add/moment", formData, {
            onUploadProgress: (progressEvent) => { setProgress(prevState => {
                return { ...prevState, pc: progressEvent.progress*100 }
            }) }
        })
        .then(data => {
            setMsg("Upload Successfull!!")
            alert("Your Moment has been saved with Title: "+data.data.title)
            setTitle('');
            setTags([]);
        })
        .catch(err => {
            setMsg("Upload Failed!!")
            console.log(err);
        })
    }

    const handlePrgressBar = () => {
        setProgress({started: false, pc: 0});
        setMsg(null);
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
                    <div className='row justify-content-between mt-3'>
                        <label for="tags" class="form-label">Tags</label>
                        <div className='col-4 tagInput'>
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
                        <div className='col-4 fileupload'>
                            <div className='fileupload-drag'>
                                <p>Drag & drop file</p>
                                <b>OR</b>
                                <input type="file" name="document" onChange={(e) => setFile(e.target.files[0])} />
                            </div>
                            
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col lh-1'>
                            {
                                progress.started && 
                                <div>
                                    <p className='mb-0'>{file.name}</p>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <progress max="100" value={progress.pc}></progress><i className="ri-close-line cursor-pointer" onClick={handlePrgressBar}></i>
                                    </div>
                                </div>
                            }
                            <br />
                            {
                                msg && <span>{msg}</span>
                            }
                        </div>
                        <div className='col'>

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