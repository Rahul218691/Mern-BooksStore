import React,{useState,useEffect} from 'react'
import {Modal,Button} from 'react-bootstrap';
import {useDropzone} from 'react-dropzone';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {useDispatch,useSelector} from 'react-redux';
import {fetchAuthorsNames} from '../../actions/authorActions';
import {uploadBlog} from '../../actions/blogActions';

const BlogModal = ({show,handleClose}) => {

	const dispatch = useDispatch();
	const {authorList} = useSelector(state=>state.authorNames);
	const [title, setTitle] = useState('');
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null)
	const [content, setContent] = useState('');
	const [author, setAuthor] = useState('')

	const {getInputProps,getRootProps,isDragActive} = useDropzone({
		accept: 'image/jpeg, image/png, image/jpg',
		maxFiles:1,
		maxSize:5242880,
		onDrop:(acceptedFiles) =>{
			setImage(acceptedFiles[0]);
			setPreview(URL.createObjectURL(acceptedFiles[0]))
		}
	});

	 const handleChange = (e,editor) =>{
 		const data = editor.getData();
 		setContent(data)
 	}


	const handleSubmit = () =>{
		let formdata = new FormData();
		formdata.append('title',title);
		formdata.append('description',content);
		formdata.append('blog',image);
		formdata.append('author',author)
		dispatch(uploadBlog(formdata));
 		setImage(null);
 		setContent('');
 		setPreview(null);
 		setAuthor('');
 		setTitle('');
 		handleClose();
	}

	useEffect(()=>{
		setImage(null);
 		setContent('');
 		setPreview(null);
 		setAuthor('');
 		setTitle('');
	},[show]);

	useEffect(() => {
		dispatch(fetchAuthorsNames())
	}, [dispatch]);

	return (
		<>
			<Modal show={show} onHide={handleClose}  
			     backdrop="static"
		        keyboard={false}>
			        <Modal.Header closeButton>
			          <Modal.Title>Upload Blog</Modal.Title>
			        </Modal.Header>
			        <Modal.Body>
		        		<div className="form-group">
            				<label htmlFor="blogtitle">Title</label>
            				<input id="blogtitle" className="form-control" type="text" placeholder="blog title"
            				value={title}
            				onChange={(e)=>setTitle(e.target.value)}/>
            			</div>
            			<div className="form-group">
            				<label htmlFor="author">Author</label>
            				<select
            				value={author}
            				onChange={(e)=>setAuthor(e.target.value)}
            				className="form-control"
            				id="author">
            				<option value="">Choose Author</option>
            				{
            					authorList && authorList.map((author,i) =>(
            							<option key={i} value={author._id}>{author.name}</option>
            						))
            				}
            				</select>
			            </div>
			            <label>Blog Image</label>
            			<div {...getRootProps({className: 'dropzone'})}>
            				<input {...getInputProps()} />
            				{
            					isDragActive ? <p>Drop Blog Image Here...</p> : <p>Drag and Drop image here || click to choose file</p>
            				}
            			</div>
            			{
            				preview && (
            					<>
            					<p className="text-muted mb-0">Preview Image:</p>
            					<img src={preview} width='300px' alt="" className="img-fluid"/>
            					</>
            				)
            			}
            			<div className="mt-2">
            				<label>Blog Description</label>
            				<CKEditor editor={ClassicEditor}
            				data={content}
            				onChange={handleChange}/>
			            </div>
			        </Modal.Body>
			        <Modal.Footer>
			          <Button variant="secondary" onClick={handleClose}>
			            Close
			          </Button>
			          <Button variant="primary" onClick={handleSubmit}>
			            Submit
			          </Button>
			        </Modal.Footer>
			</Modal>
		</>	
	)
}

export default BlogModal